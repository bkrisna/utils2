Ext.define('CImeetsExtJS.controller.Exautils', {
    extend:	'Ext.app.Controller',
    stores:	[
		'SdpJtnUtilStore',
		'SdpStlUtilStore',
		'SdpSbyUtilStore',
		'CrmJtnUtilStore',
		'CrmStlUtilStore',	
		'SdpJtnDataStore',
		'SdpStlDataStore',
		'SdpSbyDataStore',
		'CrmJtnDataStore',
		'CrmStlDataStore',
		'SdpSbyDetailStore',
		'SdpJtnDetailStore',
		'SdpStlDetailStore',
		'CrmJtnDetailStore',
		'CrmStlDetailStore',
		'SdpUtilsStore',
		'CrmUtilsStore',
		'UtilsHistStore'
	],
	
    models:	[
		'SdpJtnUtilModel',
		'SdpStlUtilModel',
		'SdpSbyUtilModel',
		'CrmJtnUtilModel',
		'CrmStlUtilModel',
		'SdpJtnDataModel',
		'SdpStlDataModel',
		'SdpSbyDataModel',
		'CrmJtnDataModel',
		'CrmStlDataModel',
		'SdpSbyDetailModel',
		'SdpJtnDetailModel',
		'SdpStlDetailModel',
		'CrmJtnDetailModel',
		'CrmStlDetailModel',
		'SdpUtilsModel',
		'CrmUtilsModel',
		'UtilsHistModel'
	],
	
    views: 	[
		'exautils.MainTab', 
		'exautils.Surface', 
		'exautils.portlet.Portlet',
		'exautils.portlet.ChartPortlet',
		'exautils.portlet.GridPortlet',
		'exautils.layout.PortalColumn',
		'exautils.layout.PortalPanel',
		'exautils.layout.PortalDropZone',
		'exautils.layout.TablePanel',
		'exautils.layout.TableColumn',
		'exautils.maincontent.OverviewPanel',
		'exautils.template.LineChart3Field',
		'exautils.template.LineChart2Field',
		'exautils.template.StackedBarChart',
		'exautils.template.ServerUtilsGrid',
		'exautils.template.ServerDataGrid',
		'exautils.template.MainContentPanel',
		'exautils.template.3PieChart'
	],

    refs: [{
		ref: 'exautilsTab',
		selector: 'exautils-tab'
	},{
		ref: 'exautilsSurface',
		selector: 'exautils-surface'
	}],
	
    init: function() {
        this.control({
           	'exautils-surface > toolbar > button[action=loadreport]': {
                click: this.loadReport
            }
        });
    },
	
	loadReport: function(button) {
		
		var tbar = button.up('toolbar'),
		    cbox = tbar.down('combo'),
			record = cbox.getValue();
		
		this.getSdpUtilsStoreStore().load({ params: { report_id: record } });
		this.getCrmUtilsStoreStore().load({ params: { report_id: record } });
		this.getSdpJtnUtilStoreStore().load({ params: { report_id: record } });
		this.getSdpJtnDataStoreStore().load({ params: { report_id: record } });
		this.getSdpStlUtilStoreStore().load({ params: { report_id: record } });
		this.getSdpStlDataStoreStore().load({ params: { report_id: record } });
		this.getSdpSbyUtilStoreStore().load({ params: { report_id: record } });
		this.getSdpSbyDataStoreStore().load({ params: { report_id: record } });
		this.getCrmJtnUtilStoreStore().load({ params: { report_id: record } });
		this.getCrmJtnDataStoreStore().load({ params: { report_id: record } });
		this.getCrmStlUtilStoreStore().load({ params: { report_id: record } });
		this.getCrmStlDataStoreStore().load({ params: { report_id: record } });
		this.getSdpJtnDetailStoreStore().load({ params: { report_id: record } });
		this.getSdpStlDetailStoreStore().load({ params: { report_id: record } });
		this.getSdpSbyDetailStoreStore().load({ params: { report_id: record } });
		this.getCrmJtnDetailStoreStore().load({ params: { report_id: record } });
		this.getCrmStlDetailStoreStore().load({ params: { report_id: record } });
		
	}
});
