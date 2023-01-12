// Р¤РёРєСЃ РІ СЂР°РјРєР°С… SR-0889360, РЅСѓР¶РЅРѕ СѓРґР°Р»РёС‚СЊ РїРѕСЃР»Рµ РѕР±РЅРѕРІР»РµРЅРёСЏ РґРѕ 7.16.3
define("CenterNotificationSchema", [], function() {
			return {
				methods: {
					updateTabItemsAndCounterValues: function(config) {
						var counterValue = config.counterValue;
						var channelConfig = config.channelConfig;
						var tabName = channelConfig.tabName;
						var typeId = channelConfig.typeId;
						var isTabActive = this.isTabActive(tabName);
						var isPanelActive = this._getIsPanelActive();
						var actualCounterValue = this.getActualTabCounterValue({
							isTabActive: isTabActive,
							isPanelActive: isPanelActive,
							readOnOpen: channelConfig.readOnOpen,
							counterValue: counterValue
						});
						if (this.Ext.isNumber(counterValue) && isTabActive) {
							this.sandbox.publish("UpdateNotifications", config.notificationResponse, [typeId]);
							if (this._getNeedMarkAsRead(config, actualCounterValue)) {
								this.sandbox.publish("MarkNewNotificationsAsRead", true, [typeId]);
							}
						}
						this.setTabCounter(tabName, actualCounterValue);
						this.addToAllNotificationsCount(actualCounterValue);
					},
					
					_getNeedMarkAsRead: function(config, actualCounterValue) {
						var counterValue = config.counterValue;
						var notificationResponse = config.notificationResponse || {"markAsRead": false};
						var isPanelActive = this._getIsPanelActive();
						var result = !actualCounterValue && isPanelActive && (counterValue > 0) && !notificationResponse.markAsRead;
						return result;
					},
				}
			};
		});
