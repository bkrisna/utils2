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
					detailstore: 'SdpJtnDetailStore',
					tmpl_id: 'sdpjtn',
					bar_chart_height: 900,
					gauge_chart_height: 220
				}]
			}, {
				title: 'SDP STL Utilization Summary',
				border: false,
				items: [{
					xtype: 'maincontentpanel',
					border: false,
					utilstore: 'SdpStlUtilStore',
					datastore: 'SdpStlDataStore',
					detailstore: 'SdpStlDetailStore',
					tmpl_id: 'sdpstl',
					bar_chart_height: 900,
					gauge_chart_height: 220
				}]
			}, {
				title: 'SDP SBY Utilization Summary',
				border: false,
				items: [{
					xtype: 'maincontentpanel',
					border: false,
					utilstore: 'SdpSbyUtilStore',
					datastore: 'SdpSbyDataStore',
					detailstore: 'SdpSbyDetailStore',
					tmpl_id: 'sdpsby',
					bar_chart_height: 435,
					gauge_chart_height: 220
				}]
			}, {
				title: 'CRM JTN Utilization Summary',
				border: false,
				items: [{
					xtype: 'maincontentpanel',
					border: false,
					utilstore: 'CrmJtnUtilStore',
					datastore: 'CrmJtnDataStore',
					detailstore: 'CrmJtnDetailStore',
					tmpl_id: 'crmjtn',
					bar_chart_height: 435,
					gauge_chart_height: 220
				}]
			}, {
				title: 'CRM STL Utilization Summary',
				border: false,
				items: [{
					xtype: 'maincontentpanel',
					border: false,
					utilstore: 'CrmStlUtilStore',
					datastore: 'CrmStlDataStore',
					detailstore: 'CrmStlDetailStore',
					tmpl_id: 'crmstl',
					bar_chart_height: 435,
					gauge_chart_height: 220
				}]
			}]
        });
		
		this.callParent(arguments);
	}
});
