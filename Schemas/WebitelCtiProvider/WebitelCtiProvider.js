define("WebitelCtiProvider", ["ext-base", "terrasoft", "WebitelCtiProviderResources", "ServiceHelper",
		"WebitelModuleHelper"],
	function(Ext, Terrasoft, resources, ServiceHelper, WebitelModuleHelper) {
		Ext.ns("Terrasoft.integration");
		Ext.ns("Terrasoft.integration.telephony");
		Ext.ns("Terrasoft.integration.telephony.webitel");

		
		Ext.define("Terrasoft.integration.telephony.webitel.WebitelCtiProvider", {
			extend: "Terrasoft.BaseCtiProvider",
			alternateClassName: "Terrasoft.WebitelCtiProvider",
			singleton: true,

			

			
			deviceId: "",

			
			isConnected: false,

			
			connectionAttemptsCount: 5,

			
			activeCall: null,

			
			httpRegExp: new RegExp("^http(s{0,1})://"),

			
			isSipAutoAnswerHeaderSupported: true,

			
			useWebPhone: true,

			
			useNotificationSound: true,

			
			useVideo: false,

			
			debugMode: false,

			
			videoParams: {
				
				"minWidth": 320,
				
				"maxWidth": 1280,
				
				"minHeight": 180,
				
				"maxHeight": 720,
				
				"minFrameRate": 10,
				
				"maxFrameRate": 30
			},

			
			consultCallNumber: null,

			
			
			connectedCallFeaturesSet: Terrasoft.CallFeaturesSet.CAN_HOLD |
			Terrasoft.CallFeaturesSet.CAN_MAKE_CONSULT_CALL |
			Terrasoft.CallFeaturesSet.CAN_BLIND_TRANSFER | Terrasoft.CallFeaturesSet.CAN_DROP |
			Terrasoft.CallFeaturesSet.CAN_DTMF,
			

			
			webitel: {},
			

			
			licInfoKeys: ["WebitelCollaboration.Use"],

			
			notificationSoundUrl: "/terrasoft.axd?s=nui-binary-syssetting&r=IncomingCallRingtone",

			

			

			
			connect: function(config) {

                if (this.webitel && this.isConnected) {

                    return;

                }

				

                Terrasoft.SysSettings.querySysSettings(["webitelDomain", "webitelConnectionString",

                    "webitelWebrtcConnectionString", "webitelRingFile", "webitelVersion"], function(settings) {

                        config.url = settings.webitelConnectionString;

                        config.ringFileLink = settings.webitelRingFile;

                        config.domain = settings.webitelDomain || WebitelModuleHelper.getHostName();

                        config.webRtcServer = settings.webitelWebrtcConnectionString;

						

						var _moduleWebitel = "WebitelModule";

						var _moduleVerto = "WebitelVerto";

						if (settings.webitelVersion) {

							var _srv = config.url.replace(/ws/i, 'http') + '/public/js/v' + settings.webitelVersion + '/';

							_moduleWebitel = _srv + 'webitelLibrary.js';

							_moduleVerto = _srv + 'webitelVerto.js';

						};

                        var callback = function(responseObject) {

                            require([_moduleWebitel], function() {

                                var connection = responseObject.GetUserConnectionResult;

                                if (!connection.login) {

                                    this.logError(resources.localizableStrings.SettingsMissedMessage);

                                    return;

                                }

                                config.login = connection.login + "@" + config.domain;

                                config.password = connection.password;

                                if (config.useWebPhone !== false) {

                                    require([_moduleVerto], function() {

                                        this.onConnected(config);

                                    }.bind(this));

                                } else {

                                    this.onConnected(config);

                                }

                            }.bind(this));

                        }.bind(this);

                        var callConfig = {

                            serviceName: "WUserConnectionService",

                            methodName: "GetUserConnection",

                            data: {

                                userId: Terrasoft.SysValue.CURRENT_USER_CONTACT.value

                            },

                            callback: callback

                        };

                        ServiceHelper.callService(callConfig);

                    }, this

                );

            },
            
            onReady: function (sessionUser) {
                if (sessionUser.agent) {

                    if (this.isOperator) {
                        this.webitel.loginCallCenter();
                        if(sessionUser.wsCount == 1) {
                            this.webitel.busy(Ext.global.WebitelUserAwayCauseTypes.DoNotDisturb);
						}
                    }
                };

            },

			
			processDevicesNotFoundError: function() {
				var message = this.useVideo
					? resources.localizableStrings.VideoDeviceNotFoundMessage
					: resources.localizableStrings.AudioDeviceNotFoundMessage;
				Terrasoft.utils.showInformation(message);
			},

			
			processCallNumbersInformation: function(webitelCall, call) {
				var isCallInfoChanged = false;
				var calledId = webitelCall.calleeNumber;
				if (call.calledId !== calledId){
					call.calledId = calledId;
					isCallInfoChanged = true;
				}
				var callerId = webitelCall.callerNumber;
				if (call.callerId !== callerId){
					call.callerId = callerId;
					isCallInfoChanged = true;
				}
				if (isCallInfoChanged) {
					this.fireEvent("callInfoChanged", call);
				}
			},

			
			onConnect: function() {
				this.fireEvent("rawMessage", "Connected");
			},

			
			onUserLogin: Ext.emptyFn,

			
			onDisconnect: function() {
				this.isConnected = false;
				this.fireEvent("rawMessage", "Disconnected");
				this.fireEvent("disconnected", "Disconnected");
			},

			
			onError: function(args) {
				this.log("======================================= Error =====================================");
				this.fireEvent("error", args);
				if ((args.errorType === Ext.global.WebitelErrorTypes.Call) &&
						(args.message === "DevicesNotFoundError")) {
					this.processDevicesNotFoundError();
				}
			},

			
			onUserStatusChange: function(agent) {
				if (agent.id !== this.deviceId) {
					return;
				}
				var agentState;
				if (!agent.online) {
					agentState = Ext.global.WebitelAccountStatusTypes.Unregistered;
					this.isConnected = false;
					if (!this.activeCall) {
						this.fireEvent("disconnected", "Offline");
					}
				} else {
					agentState = agent.state;
					if (!this.isConnected && (agentState !== Ext.global.WebitelAccountStatusTypes.Unregistered)) {
						this.isConnected = true;
						this.fireEvent("initialized", this);
					}
					var away = agent.away;
					if ((!Ext.isEmpty(away) && (away !== Ext.global.WebitelUserAwayCauseTypes.None))) {
						agentState = away;
					}
				}
				this.fireEvent("agentStateChanged", {userState: agentState});
			},

			
			onNewCall: function(webitelCall) {
				var callId = webitelCall.uuid;
				var activeCall = this.activeCall;
				var isConsultCall = !Ext.isEmpty(activeCall);
				var isIncomingCall = (webitelCall.direction === Ext.global.WebitelCallDirectionTypes.Inbound);
				if (activeCall && (this.consultCall || isIncomingCall)) {
					if (this.debugMode) {
						this.log("Hangup on new call: {0}", Ext.encode(webitelCall));
					}
					this.webitel.hangup(webitelCall.uuid, "USER_BUSY");
					return;
				}
				var call = Ext.create("Terrasoft.integration.telephony.Call");
				try {
                    this.initLangAndMainMenuActionFromCall(webitelCall, call);
                }
                catch(ex){console.log("Can't read webitel data ivr");}
				call.id = callId;
				call.direction = this.getDirection(webitelCall);
				call.deviceId = this.deviceId;
				call.calledId =  webitelCall.calleeNumber;
				call.callerId = webitelCall.callerNumber;
				call.otherLegUUID = webitelCall["other-leg-unique-id"];
				call.transfer_comment = webitelCall["transfer_comment"];
				call.ctiProvider = this;
				call.timeStamp = new Date();
				call.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_NOTHING;
				call.state = Terrasoft.GeneralizedCallState.ALERTING;
				if (isConsultCall) {
					this.consultCall = call;
					activeCall.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_NOTHING;
					this.fireEvent("lineStateChanged", {
						callFeaturesSet: activeCall.callFeaturesSet,
						callId: activeCall.id
					});
				} else {
					
					call.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_DROP;
					if (call.direction === Terrasoft.CallDirection.IN &&
						(this.isSipAutoAnswerHeaderSupported || this.useWebPhone)) {
						call.callFeaturesSet |= Terrasoft.CallFeaturesSet.CAN_ANSWER;
					}
					
					this.activeCall = call;
				}
				this.updateDbCall(call, this.onUpdateDbCall);
				if(webitelCall.data!=undefined)
				{
					call.lang21= webitelCall.data;
					if(call.lang21!=undefined)
					{
						if(call.lang21.includes("rus"))
						{
							call.lang21 = "rus";
						}
						else
						{
							call.lang21 = "ukr";
						}
						//this.fireEvent("callStarted", call);
					}
				}
				this.fireEvent("callStarted", call);
				this.fireEvent("lineStateChanged", {
					callFeaturesSet: call.callFeaturesSet,
					callId: call.id
				});
				this.fireEvent("agentStateChanged", {userState: Ext.global.WebitelAccountStatusTypes.Busy});
			},

			initLangAndMainMenuActionFromCall: function(webitelCall, call) {
				var webitelData = {};
				if(!webitelCall) {
					return;
				}
				try {
                    webitelData = JSON.parse(webitelCall.data);
                    call.lang = webitelData.ivrLang;
                    call.mainMenuAction = webitelData.MainMenuAction;
				}
				catch(ex) {
					throw new Exception("Can not parse webitel data");
				}
			},

			
			onHangup: function(webitelCall) {
				var currentCall = this.findCallById(webitelCall.uuid);
				if (!currentCall) {
					return;
				}
				var callId = currentCall.id;
				if (this.consultCall && webitelCall.transferResult === "confirmed") {
					this.activeCall.redirectionId = this.consultCall.callerId;
					this.activeCall.redirectingId = this.consultCall.calledId;
				}
				var call;
				if (Ext.isEmpty(callId)) {
					call = this.activeCall;
					this.activeCall = null;
				} else {
					if (!Ext.isEmpty(this.activeCall) && this.activeCall.id === callId) {
						call = this.activeCall;
						this.activeCall = null;
					} else if (!Ext.isEmpty(this.consultCall) && this.consultCall.id === callId) {
						call = this.consultCall;
						this.consultCall = null;
						this.fireEvent("currentCallChanged", this.activeCall);
					}
				}
				if (Ext.isEmpty(call)) {
					this.fireEvent("lineStateChanged", {callFeaturesSet: Terrasoft.CallFeaturesSet.CAN_DIAL});
					return;
				}
				call.oldState = call.state;
				call.state = Terrasoft.GeneralizedCallState.NONE;
				call.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_DIAL;
				this.fireEvent("callFinished", call);
				if (!Ext.isEmpty(this.activeCall)) {
					var uuid = (this.activeCall.NewUUID) ? this.activeCall.NewUUID : this.activeCall.id;
					if (this.activeCall.state === Terrasoft.GeneralizedCallState.HOLDED) {
						this.webitel.unhold(uuid);
					}
				} else {
					if (!Ext.isEmpty(this.consultCall)) {
						this.activeCall = this.consultCall;
						this.consultCall = null;
						this.fireEvent("currentCallChanged", this.activeCall);
					} else {
						this.fireEvent("lineStateChanged", {callFeaturesSet: call.callFeaturesSet});
					}
				}
				this.updateDbCall(call, this.onUpdateDbCall);
				if (call.NewUUID) {
					this.updateCallId(call.id, call.NewUUID);
				}
				if (!this.isConnected && !this.activeCall) {
					this.fireEvent("disconnected", "Acitve call finished after disconnect");
				}
			},

			
			onAcceptCall: function(webitelCall) {
				var currentCall = this.findCallById(webitelCall.uuid);
				if (!currentCall) {
					return;
				}
				var callId = currentCall.id;
				var call;
				var activeCallExists = !Ext.isEmpty(this.activeCall);
				if (activeCallExists && this.activeCall.id === callId) {
					call = this.activeCall;
				} else if (!Ext.isEmpty(this.consultCall) && this.consultCall.id === callId) {
					call = this.consultCall;
				}
				if (Ext.isEmpty(call)) {
					return;
				}
				
				call.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_DROP |
					Terrasoft.CallFeaturesSet.CAN_HOLD |
					Terrasoft.CallFeaturesSet.CAN_DTMF;
				
				call.oldState = call.state;
				call.state = Terrasoft.GeneralizedCallState.CONNECTED;
				if (call.oldState === Terrasoft.GeneralizedCallState.ALERTING) {
					this.fireEvent("commutationStarted", call);
				}
				if (activeCallExists) {
					this.fireEvent("lineStateChanged", {callFeaturesSet: this.activeCall.callFeaturesSet});
				}
				this.updateDbCall(call, this.onUpdateDbCall);
			},

			
			onBridgeCall: function(webitelCall) {
				var activeCall = this.activeCall;
				if (!activeCall) {
					return;
				}
				var call = this.findCallById(webitelCall.uuid);
				if (!call) {
					return;
				}
				call.direction = this.getDirection(webitelCall);
				call.calledId =  webitelCall.calleeNumber;
				call.callerId = webitelCall.callerNumber;
				if(webitelCall.data!=undefined)
				{
					call.lang21= webitelCall.data;
					if(call.lang21!=undefined)
					{
						if(call.lang21.includes("rus"))
						{
							call.lang21 = "rus";
						}
						else
						{
							call.lang21 = "ukr";
						}
						this.fireEvent("callStarted", call);
					}
				}
				this.fireEvent("callInfoChanged", call);
				if (activeCall.id === call.id) {
					
					activeCall.callFeaturesSet |= Terrasoft.CallFeaturesSet.CAN_MAKE_CONSULT_CALL |
						Terrasoft.CallFeaturesSet.CAN_BLIND_TRANSFER;
					
					this.processCallNumbersInformation(webitelCall, activeCall);
				} else if (this.consultCall && this.consultCall.id === call.id) {
					activeCall.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_COMPLETE_TRANSFER;
				} else {
					return;
				}
				this.fireEvent("lineStateChanged", {callFeaturesSet: activeCall.callFeaturesSet});
			},

			
			onHold: function(webitelCall) {
				var currentCall = this.findCallById(webitelCall.uuid);
				if (!currentCall) {
					return;
				}
				this.fireEvent("rawMessage", "onHoldStateChange: " + Terrasoft.encode("hold"));
				var call = this.findCallById(webitelCall.uuid);
				if (Ext.isEmpty(call)) {
					var message = "Holded activeCall is empty";
					this.logError("onHoldStateChange: {0}", message);
					return;
				}
				call.state = Terrasoft.GeneralizedCallState.HOLDED;
				this.activeCall.state = Terrasoft.GeneralizedCallState.HOLDED;
				
				call.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_UNHOLD |
				Terrasoft.CallFeaturesSet.CAN_MAKE_CONSULT_CALL |
				Terrasoft.CallFeaturesSet.CAN_DTMF;
				
				this.fireEvent("hold", call);
				this.updateDbCall(call, this.onUpdateDbCall);
				this.fireEvent("lineStateChanged", {callFeaturesSet: call.callFeaturesSet});
			},

			
			onUnhold: function(webitelCall) {
				var currentCall = this.findCallById(webitelCall.uuid);
				if (!currentCall) {
					return;
				}
				this.fireEvent("rawMessage", "onHoldStateChange: " + Terrasoft.encode("hold"));
				var call = this.findCallById(webitelCall.uuid);
				if (Ext.isEmpty(call)) {
					var message = "Holded activeCall is empty";
					this.logError("onHoldStateChange: {0}", message);
					return;
				}
				call.state = Terrasoft.GeneralizedCallState.CONNECTED;
				call.callFeaturesSet = this.connectedCallFeaturesSet;
				this.fireEvent("unhold", call);
				this.updateDbCall(call, this.onUpdateDbCall);
				this.fireEvent("lineStateChanged", {callFeaturesSet: call.callFeaturesSet});
			},

			
			onUuidCall: function(config) {
				var call = this.findCallById(config.call.uuid);
				if (call) {
					this.updateCallId(call.id, config.newId);
				}
			},

			
			onWebitelWebRTCCall: function(session) {
				if (session.getDirection() === "incoming") {
					session.answer(this.useVideo);
				}
			},

			
			onDtmfCall: function(config) {
				this.log("---------------- ON DTMF CALL ------------------", true);
				this.log(config.digits, true);
				this.fireEvent("dtmfEntered", config.digits);
				this.log("-----------------------------------------------", true);
			},

			
			onStartRecordCall: function(webitelCall) {
				this.log("---------------- ON RECORD START CALL ------------------", true);
				this.log(webitelCall, true);
				this.log("-----------------------------------------------", true);
			},

			
			onStopRecordCall: function(webitelCall) {
				this.log("---------------- ON RECORD STOP CALL ------------------", true);
				this.log(webitelCall, true);
				this.log("-----------------------------------------------", true);
			},

			
			onNewWebRTCCall: function(session) {
				var config = {};
				this.fireEvent("webRtcStarted", session.callID, config);
				if (config.mediaElementId) {
					session.params.tag = config.mediaElementId;
				}
			},

			
			onVideoWebRTCCall: function(session) {
				if (!this.useVideo) {
					return;
				}
				this.fireEvent("webRtcVideoStarted", session.callID);
			},

			
			onDestroyWebRTCCall: function(session) {
				this.fireEvent("webRtcDestroyed", session.callID);
			},

			
			subscribeEvents: function() {
				var events = [
					{
						eventName: "onUserStatusChange",
						eventHandler: this.onUserStatusChange
					},
					{
						eventName: "onNewCall",
						eventHandler: this.onNewCall
					},
					{
						eventName: "onHangupCall",
						eventHandler: this.onHangup
					},
					{
						eventName: "onAcceptCall",
						eventHandler: this.onAcceptCall
					},
					{
						eventName: "onHoldCall",
						eventHandler: this.onHold
					},
					{
						eventName: "onUnholdCall",
						eventHandler: this.onUnhold
					},
					{
						eventName: "onBridgeCall",
						eventHandler: this.onBridgeCall
					},
					{
						eventName: "onUnBridgeCall",
						eventHandler: Terrasoft.emptyFn
					},
					{
						eventName: "onUuidCall",
						eventHandler: this.onUuidCall
					},
					{
						eventName: "onWebitelWebRTCCall",
						eventHandler: this.onWebitelWebRTCCall
					},
					{
						eventName: "onDtmfCall",
						eventHandler: this.onDtmfCall
					},
					{
						eventName: "onStartRecordCall",
						eventHandler: this.onStartRecordCall
					},
					{
						eventName: "onStopRecordCall",
						eventHandler: this.onStopRecordCall
					},
					{
						eventName: "onConnect",
						eventHandler: this.onConnect
					},
					{
						eventName: "onUserLogin",
						eventHandler: this.onUserLogin
					},
					{
						eventName: "onDisconnect",
						eventHandler: this.onDisconnect
					},
					{
						eventName: "onError",
						eventHandler: this.onError
					},
					{
						eventName: "onNewWebRTCCall",
						eventHandler: this.onNewWebRTCCall
					},
					{
						eventName: "onVideoWebRTCCall",
						eventHandler: this.onVideoWebRTCCall
					},
					{
						eventName: "onDestroyWebRTCCall",
						eventHandler: this.onDestroyWebRTCCall
					},

                    {

                        eventName: "onReady",

                        eventHandler: this.onReady

                    }
				];
				Terrasoft.each(events, function(event) {
					this.webitel[event.eventName](event.eventHandler.bind(this));
				}, this);
			},

			
			onConnected: function(config) {
				this.isSipAutoAnswerHeaderSupported = config.isSipAutoAnswerHeaderSupported;

                this.isOperator = config.isOperator;
				this.webitel = {};
				this.useWebPhone = Ext.isBoolean(config.useWebPhone) ? config.useWebPhone : true;
				this.useNotificationSound = Ext.isBoolean(config.useNotificationSound)
					? config.useNotificationSound
					: true;
				var webitelConfig = {
					server: config.url,
					account: config.login,
					secret: config.password,
					reconnect: this.connectionAttemptsCount,
					debug: config.debugMode || false,
					webrtc: false,

                    agent: config.isOperator,

                    availableOnDemand: config.availableOnDemand,

                    autoAnswerParam: config['autoAnswerParam'],

                    vertoRecordFile: config['ringFileLink']
				};
				this.useVideo = config.useVideo;
				if (this.useWebPhone) {
					webitelConfig.webrtc = {
						
						ws_servers: config.webRtcServer,
						
						login: config.login,
						webitelNumber: config.login.toString().split("@")[0],
						password: config.password,
						
						stun_servers: [],
						
						videoParams: this.videoParams
					};
					if (this.useNotificationSound) {
						webitelConfig.vertoRecordFile = Terrasoft.workspaceBaseUrl + this.notificationSoundUrl;
					}
				}
				this.webitel = new Ext.global.Webitel(webitelConfig);
				Ext.global.webitel = this.webitel;
				this.deviceId = config.login.toString().split("@")[0];
				this.isAutoLogin = config.isAutoLogin;
				this.debugMode = config.debugMode;
				this.webitel.ctiProvider = this;
				this.subscribeEvents();
				try {
					if (this.isAutoLogin) {
						this.webitel.connect();
					}
				} catch (e) {
					this.onConnectError({
						errorCode: e.message,
						errorMessage: e.message
					});
				}
			},

			
			onUpdateDbCall: function(request, success, response) {
				var callDatabaseUid = Terrasoft.decode(response.responseText);
				if (success && Terrasoft.isGUID(callDatabaseUid)) {
					var call = Terrasoft.decode(request.jsonData);
					if (!Ext.isEmpty(this.activeCall) && (this.activeCall.id === call.id ||
						this.activeCall.NewUUID === call.id)) {
						call = this.activeCall;
					} else if (!Ext.isEmpty(this.consultCall) && (this.consultCall.id === call.id ||
						this.consultCall.NewUUID === call.id)) {
						call = this.consultCall;
					}
					call.databaseUId = callDatabaseUid;
					this.fireEvent("callSaved", call);
				} else {
					this.fireEvent("rawMessage", "Update Call error");
					var errorInfo = {
						internalErrorCode: null,
						data: response.responseText,
						source: "App server",
						errorType: Terrasoft.MsgErrorType.COMMAND_ERROR
					};
					this.fireEvent("error", errorInfo);
				}
			},

			
			onConnectError: function(err) {
				this.fireEvent("rawMessage", "onConnectError: " + Terrasoft.encode(err));
			},

			
			findCallById: function(callId) {
				if (!Ext.isEmpty(this.consultCall) && (this.consultCall.id === callId ||
					this.consultCall.NewUUID === callId)) {
					return this.consultCall;
				} else if (!Ext.isEmpty(this.activeCall) && (this.activeCall.id === callId ||
					this.activeCall.NewUUID === callId)) {
					return this.activeCall;
				}
				return null;
			},

			
			getDirection: function(webitelCall) {
				return (webitelCall.direction === Ext.global.WebitelCallDirectionTypes.Inbound)
					? Terrasoft.CallDirection.IN
					: Terrasoft.CallDirection.OUT;
			},

			
			updateCallId: function(callId, newCallId) {
				var update = Ext.create("Terrasoft.UpdateQuery", {
					rootSchemaName: "Call"
				});
				update.setParameterValue("IntegrationId", newCallId, 1);
				update.filters.add("IntegrationId", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "IntegrationId", callId));
				update.execute();
			},

			
			getCanUseVideo: function(opponentNumber) {
				if (!this.useVideo) {
					return false;
				}
				return !(Ext.isString(opponentNumber) && Terrasoft.SysValue && Terrasoft.SysValue.CTI &&
					(opponentNumber.length > Terrasoft.SysValue.CTI.internalNumberLength));
			},

			

			

			
			reConnect: function() {
				if (this.webitel && !this.isConnected) {
					this.webitel.connect();
				}
			},

			

			

			
			init: function() {
				this.callParent(arguments);
				this.loginMsgService(this.msgUtilServiceUrl + this.loginMethodName, {
					"LicInfoKeys": this.licInfoKeys,
					"UserUId": Terrasoft.SysValue.CURRENT_USER.value
				}, this.connect.bind(this));
			},

			
			queryCallRecords: function(callId, callback) {
				this.webitel.getRecordFileFromUUID(callId, function(result) {
					var response = result.response;
					if (!this.httpRegExp.test(response)) {
						this.logError(response);
						return;
					}
					callback([response]);
				}.bind(this));
			},

			
			makeCall: function(number) {
				var useVideo = this.getCanUseVideo(number);
				try {
					this.webitel.call(number, useVideo);
				} catch (e) {
					this.logError(e.message);
				}
			},

			
			answerCall: function(call) {
				var useVideo = this.getCanUseVideo(call.getAbonentNumber());
				this.webitel.answer(call.id, useVideo);
			},

			
			dropCall: function(call) {
				this.webitel.hangup(call.id);
			},

			
			makeConsultCall: function(call, targetAddress) {
				if (call.state === Terrasoft.GeneralizedCallState.HOLDED) {
					this.webitel.attendedTransfer(call.id, targetAddress);
				} else {
					this.webitel.hold(call.id, function() {
						this.webitel.attendedTransfer(call.id, targetAddress);
					}.bind(this));
				}
			},

			
			cancelTransfer: function(currentCall, consultCall) {
				this.webitel.cancelTransfer(currentCall.id, consultCall.id);
			},

			
			transferCall: function(currentCall, consultCall) {
				this.webitel.bridgeTransfer(currentCall.id, consultCall.id);
			},

			
			holdCall: function(call) {
				this.webitel.toggleHold(call.id);
			},

			
			//blindTransferCall: function(call, targetAddress) {
			blindTransferCall: function(call, args) {
				let ob = JSON.parse(args)
				var activeCall = this.activeCall;
				activeCall.redirectingId = activeCall.deviceId;
				activeCall.redirectionId = ob.targetAddress;
			//	activeCall.redirectionId = targetAddress;
				this.updateDbCall(activeCall, this.onUpdateDbCall);
			//	this.webitel.transfer(call.id, targetAddress);
				
				this.webitel.transfer(call.id, ob.targetAddress, () => {}, ob.comment);
			},

			
			queryLineState: Terrasoft.emptyFn,

			
			queryActiveCallSnapshot: Terrasoft.emptyFn,

			
			setUserState: function(code, reason, callback, disableReconnect) {
				code = code ? code.toUpperCase() : "";
				if (!this.isConnected && (code !== Ext.global.WebitelAccountStatusTypes.Unregistered)) {
					if (disableReconnect) {
						if (callback) {
							callback();
							return;
						}
					}
					this.webitel.login(function() {
						this.setUserState(code, reason, callback, true);
					}.bind(this));
					return;
				}
				switch (code) {
					case Ext.global.WebitelAccountStatusTypes.Unregistered:
						if (!this.activeCall) {
							this.webitel.logout();
						}
						if (callback) {
							callback();
						}
						break;
					case Ext.global.WebitelAccountStatusTypes.Ready:
						this.webitel.ready(callback);
						break;
					default:
						this.webitel.busy(code, reason, callback);
						break;
				}
			},

			
			queryUserState: Terrasoft.emptyFn,

			
			changeCallCentreState: Terrasoft.emptyFn,

			
			getCapabilities: function() {
				
				var callCapabilities = Terrasoft.CallFeaturesSet.CAN_RECALL | Terrasoft.CallFeaturesSet.CAN_DIAL |
					Terrasoft.CallFeaturesSet.CAN_DROP |
					Terrasoft.CallFeaturesSet.CAN_HOLD | Terrasoft.CallFeaturesSet.CAN_UNHOLD |
					Terrasoft.CallFeaturesSet.CAN_COMPLETE_TRANSFER |
					Terrasoft.CallFeaturesSet.CAN_BLIND_TRANSFER | Terrasoft.CallFeaturesSet.CAN_MAKE_CONSULT_CALL |
					Terrasoft.CallFeaturesSet.CAN_DTMF;
				if (this.isSipAutoAnswerHeaderSupported) {
					callCapabilities |= Terrasoft.CallFeaturesSet.CAN_ANSWER;
				}
				if (this.useVideo) {
					callCapabilities |= Terrasoft.CallFeaturesSet.CAN_VIDEO;
				}
				
				return {
					callCapabilities: callCapabilities,
					agentCapabilities: Terrasoft.AgentFeaturesSet.CAN_GET_CALL_RECORDS
				};
			},

			
			sendDtmf: function(call, digit) {
				this.webitel.dtmf(call.id, digit);
			},

			
			setVideoState: function(call, isVideoActive, callback) {
				var videoAction = isVideoActive ? "on" : "off";
				this.webitel.setMuteVideo(call.id, videoAction);
				callback(isVideoActive);
			},

			
			closeConnection: function() {
				this.webitel.disconnect();
			}

			

		});
	}
);
