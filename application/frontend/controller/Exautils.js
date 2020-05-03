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
		'UtilsHistStore',
		'ReportStore'
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
		'UtilsModel',
		'UtilsHistModel',
		'ReportModel'
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
		'exautils.template.3PieChart',
		'exautils.ReportSelect',
		'exautils.ux.form.SearchField',
		'exautils.ExportToExcel',
		'exautils.ux.AjaxDownload'
	],

    refs: [{
		ref: 'exautilsTab',
		selector: 'exautils-tab'
	},{
		ref: 'exautilsSurface',
		selector: 'exautils-surface'
	},{
		ref: 'reportWin',
		selector: 'report-select'
	},{
		ref: 'exportWin',
		selector: 'export-excel'
	}],
	
    init: function() {
        this.control({
           	'exautils-surface > toolbar > button[action=loadreport]': {
                click: this.selectReportWin
            },
           	'exautils-surface > toolbar > button[action=exportToExcel]': {
                click: this.exportToExcel
            },
           	'report-select > gridpanel > toolbar > searchfield': {
                buttonSearchClick: this.searchButtonClick,
				buttonClearClick: this.clearButtonClick
            },
           	'exautils-tab': {
                tabchange: this.onTabChanged,
            },
           	'report-select > toolbar > button[action=cancelBtn]': {
                click: this.closeButtonClick,
            },
           	'report-select > toolbar > button[action=loadReport]': {
                click: this.loadReport,
            },
           	'export-excel > toolbar > button[action=cancelBtn]': {
                click: this.closeExportWinClick,
            },
        });
    },
	
	searchButtonClick: function(val) {
   		this.getReportStoreStore().load({ params: { query: val } });
	},
	
	clearButtonClick: function(e) {
   		this.getReportStoreStore().load();
	},
	
	closeButtonClick: function() {
		this.getReportWin().close();
	},
	
	closeExportWinClick: function() {
		this.getExportWin().close();
	},
	
	selectReportWin: function(button) {
		var win = Ext.create('CImeetsExtJS.view.exautils.ReportSelect');
		win.show();
	},
	
	exportToExcel: function(button) {
		CImeetsExtJS.view.exautils.ux.AjaxDownload.get({
			url: 'http://utils2.localhost:8888/exporttoexcel/export',
			params: {
		 		report_id: GlobalVars.report_data.getData().report_id
			}
		});
	},
	
	onTabChanged: function (tabPanel, newCard, oldCard, eOpts) {
		var tabIndex = tabPanel.items.indexOf(newCard);
		this.loadPerTab(tabIndex);
	},
	
	
	loadPerTab: function(tabIndex) {
		var record = GlobalVars.report_data.getData().report_id;
		
		switch(tabIndex) {
		  	case 0:
	  			this.getSdpUtilsStoreStore().load({ params: { report_id: record } });
	  			this.getCrmUtilsStoreStore().load({ params: { report_id: record } });
		    	break;
		  	case 1:
	  			this.getSdpJtnUtilStoreStore().load({ params: { report_id: record } });
	  			this.getSdpJtnDataStoreStore().load({ params: { report_id: record } });
				this.getSdpJtnDetailStoreStore().load({ params: { report_id: record } });
		    	break;
	  		case 2:
				this.getSdpStlUtilStoreStore().load({ params: { report_id: record } });
				this.getSdpStlDataStoreStore().load({ params: { report_id: record } });
				this.getSdpStlDetailStoreStore().load({ params: { report_id: record } });
	    		break;
	  		case 3:
				this.getSdpSbyUtilStoreStore().load({ params: { report_id: record } });
				this.getSdpSbyDataStoreStore().load({ params: { report_id: record } });
				this.getSdpSbyDetailStoreStore().load({ params: { report_id: record } });
	    		break;
	  		case 4:
				this.getCrmJtnUtilStoreStore().load({ params: { report_id: record } });
				this.getCrmJtnDataStoreStore().load({ params: { report_id: record } });
				this.getCrmJtnDetailStoreStore().load({ params: { report_id: record } });
	    		break;
	  		case 5:
				this.getCrmStlUtilStoreStore().load({ params: { report_id: record } });
				this.getCrmStlDataStoreStore().load({ params: { report_id: record } });
				this.getCrmStlDetailStoreStore().load({ params: { report_id: record } });
	    		break;
		  	default:
		    	return 0;
		}
	},
	
	loadReport: function(button) {
		var win = button.up('window'),
		grid = win.down('gridpanel');
		
		if (grid.getSelectionModel().hasSelection()) {
			record = grid.getSelectionModel().getSelection()[0].getId();
			rep_data = grid.getSelectionModel().getSelection()[0];
			GlobalVars.report_data = rep_data;
			this.getReportWin().close();
			this.getExautilsSurface().setTitle(GlobalVars.report_data.getData().report_name);
			var activeTabIndex = this.getExautilsTab().items.indexOf(this.getExautilsTab().getActiveTab());
			this.loadPerTab(activeTabIndex);
		}
	}
});
