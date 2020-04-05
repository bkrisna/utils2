Ext.define('CImeetsExtJS.view.exautils.maincontent.CrmStlPanel', {
    extend: 'Ext.panel.Panel',
	alias: 'widget.exautils-crmstlpanel',
	border: false,
	layout: 'fit',
	defaults: {
		bodyStyle:'padding:5px',
		border: false
	},
	
	items: [{
        id: 'crmstl-portal',
        xtype: 'tablepanel',
        items: [{
			id: 'portletcrmstl-1',
			xtype: 'portlet',
			title: 'Compute Node vCPU Utilization',
			items: [{
				xtype: 'crmstlvcpuutils',
				border: false
			}]
		},{
			id: 'portletcrmstl-2',
			xtype: 'portlet',
			title: 'Compute Node MEM Utilization',
			items: [{
				xtype: 'crmstlmemutils',
				border: false
			}]
		},{
			id: 'portletcrmstl-3',
			xtype: 'portlet',
			title: 'Compute Node Utilization',
			items: [{
				xtype: 'crmstlsrvpanel',
				border: false
			}]
		},{
			id: 'portletcrmstl-5',
			xtype: 'portlet',
			title: 'Compute Node Utilization Data',
			colspan: 3,
			items: [{
				xtype: 'crmstldata',
				border: false
			}]
	    }]
	}]
});