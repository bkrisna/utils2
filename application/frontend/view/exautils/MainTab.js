Ext.define('CImeetsExtJS.view.exautils.MainTab' ,{
    extend: 'Ext.tab.Panel',
	alias : 'widget.exautils-tab',
	border: false,
	id: 'exautilsTab',
	defaults: {
		autoScroll: true,
	},
	activeTab: 0,
	
	initComponent: function() {
		Ext.apply(this, {
			
			items: [{
				title: 'Overall Summary',
				border: false,
				items: [{
					xtype: 'exautils-overview',
					border: false,
				}]
			}, {
				title: 'SDP JTN Utilization Summary',
				border: false,
				items: [{
					xtype: 'maincontentpanel',
					border: false,
					utilstore: 'SdpJtnUtilStore',
					datastore: 'SdpJtnDataStore',
					tmpl_id: 'sdpjtn',
					bar_chart_height: 655
				}]
			}, {
				title: 'SDP STL Utilization Summary',
				border: false,
				items: [{
					xtype: 'maincontentpanel',
					border: false,
					utilstore: 'SdpStlUtilStore',
					datastore: 'SdpStlDataStore',
					tmpl_id: 'sdpstl',
					bar_chart_height: 655
				}]
			}, {
				title: 'SDP SBY Utilization Summary',
				border: false,
				items: [{
					xtype: 'maincontentpanel',
					border: false,
					utilstore: 'SdpSbyUtilStore',
					datastore: 'SdpSbyDataStore',
					tmpl_id: 'sdpsby',
					bar_chart_height: 250
				}]
			}, {
				title: 'CRM JTN Utilization Summary',
				border: false,
				items: [{
					xtype: 'maincontentpanel',
					border: false,
					utilstore: 'CrmJtnUtilStore',
					datastore: 'CrmJtnDataStore',
					tmpl_id: 'crmjtn',
					bar_chart_height: 250
				}]
			}, {
				title: 'CRM STL Utilization Summary',
				border: false,
				items: [{
					xtype: 'maincontentpanel',
					border: false,
					utilstore: 'CrmStlUtilStore',
					datastore: 'CrmStlDataStore',
					tmpl_id: 'crmstl',
					bar_chart_height: 250
				}]
			}]
        });
		
		this.callParent(arguments);
	}
});
