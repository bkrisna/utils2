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
		'SdpUtilsStore',
		'CrmUtilsStore',
		'UtilsHistStore',
		'CrmUtilsHistStore'
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
		'SdpUtilsModel',
		'CrmUtilsModel',
		'UtilsHistModel',
		'CrmUtilsHistModel'
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
		'exautils.maincontent.SdpJtnPanel',
		'exautils.maincontent.SdpStlPanel',
		'exautils.maincontent.SdpSbyPanel',
		'exautils.maincontent.CrmJtnPanel',
		'exautils.maincontent.CrmStlPanel',
		'exautils.overview.SdpVcpuUtils',
		'exautils.overview.SdpMemUtils',
		'exautils.overview.SdpZfssaUtils',
		'exautils.overview.SdpVcpuUtilsHist',
		'exautils.overview.CrmVcpuUtils',
		'exautils.overview.CrmMemUtils',
		'exautils.overview.CrmZfssaUtils',
		'exautils.overview.CrmVcpuUtilsHist',
		'exautils.sdpjtn.SdpJtnVcpuPanel',
		'exautils.sdpjtn.SdpJtnMemPanel',
		'exautils.sdpjtn.SdpJtnDataPanel',
		'exautils.sdpjtn.SdpJtnSrvPanel',
		'exautils.sdpstl.SdpStlVcpuPanel',
		'exautils.sdpstl.SdpStlMemPanel',
		'exautils.sdpstl.SdpStlDataPanel',
		'exautils.sdpstl.SdpStlSrvPanel',
		'exautils.sdpsby.SdpSbyVcpuPanel',
		'exautils.sdpsby.SdpSbyMemPanel',
		'exautils.sdpsby.SdpSbyDataPanel',
		'exautils.sdpsby.SdpSbySrvPanel',
		'exautils.crmjtn.CrmJtnVcpuPanel',
		'exautils.crmjtn.CrmJtnMemPanel',
		'exautils.crmjtn.CrmJtnDataPanel',
		'exautils.crmjtn.CrmJtnSrvPanel',
		'exautils.crmstl.CrmStlVcpuPanel',
		'exautils.crmstl.CrmStlMemPanel',
		'exautils.crmstl.CrmStlDataPanel',
		'exautils.crmstl.CrmStlSrvPanel'
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
		
	}
});
