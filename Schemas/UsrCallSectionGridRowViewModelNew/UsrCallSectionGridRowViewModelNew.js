define("UsrCallSectionGridRowViewModelNew", ["CallSectionGridRowViewModel", "RightUtilities", "UsrCallSectionGridRowViewModelNewResources", 
"CtiConstants", ],
	function(resources, RightUtilities, ctiConstants) {
	    /**
	     * @class Terrasoft.configuration.CallSectionGridRowViewModel
	     * Класс модели представления строки раздела "Звонки".
	     */
	    Ext.define("Terrasoft.configuration.UsrCallSectionGridRowViewModelNew", {
	        extend: "Terrasoft.CallSectionGridRowViewModel",
	        alternateClassName: "Terrasoft.UsrCallSectionGridRowViewModelNew",
			Ext: null,
			Terrasoft: null,
			sandbox: null,
	        
	        mixins: {
				RightUtilitiesMixin: "Terrasoft.RightUtilitiesMixin",
	        },
	        columns: {
				/**
				 * ####### ########### ########### ###### ######.
				 * @type {Boolean}
				 */
				"CanEvalCall": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},
			},
			
			constructor: function(){
				this.callParent(arguments);
				this.getCanEval();
			},
	        getCanEval:function(){
	        	this.set("CanEvalCall", true);
				RightUtilities.checkCanExecuteOperation({
	     			operation: "CanEvalCall"
	     		}, function(result) {
				 	this.set("CanEvalCall", result);
				 }, this);
	    	},
	    });
	    return Terrasoft.UsrCallSectionGridRowViewModelNew;
	});