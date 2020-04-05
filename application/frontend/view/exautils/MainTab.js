Ext.define('CImeetsExtJS.view.exautils.MainTab' ,{
    extend: 'Ext.tab.Panel',
	alias : 'widget.exautils-tab',
	border: false,
	id: 'exautilsTab',
	defaults: {
		autoScroll: true,
	},
	activeTab: 0,
	//title: 'Exalogic Utilization Report',
	report_id: 0,
	
	initComponent: function() {
		Ext.apply(this, {
			
			items: [{
				title: 'Overall Summary',
				border: false,
				items: [{
					xtype: 'exautils-overview',
					border: false
				}]
			}, {
				title: 'SDP JTN Utilization Summary',
				border: false,
				items: [{
					xtype: 'exautils-sdpjtnpanel',
					border: false
				}]
			}, {
				title: 'SDP STL Utilization Summary',
				border: false,
				items: [{
					xtype: 'exautils-sdpstlpanel',
					border: false
				}]
			}, {
				title: 'SDP SBY Utilization Summary',
				border: false,
				items: [{
					xtype: 'exautils-sdpsbypanel',
					border: false
				}]
			}, {
				title: 'CRM JTN Utilization Summary',
				border: false,
				items: [{
					xtype: 'exautils-crmjtnpanel',
					border: false
				}]
			}, {
				title: 'CRM STL Utilization Summary',
				border: false,
				items: [{
					xtype: 'exautils-crmstlpanel',
					border: false
				}]
			}]
        });
		
		this.callParent(arguments);
	}
});
