Ext.define('CImeetsExtJS.view.exautils.maincontent.CrmJtnPanel', {
    extend: 'Ext.panel.Panel',
	alias: 'widget.exautils-crmjtnpanel',
	border: false,
	layout: 'fit',
	defaults: {
		bodyStyle:'padding:5px',
		border: false
	},
	
	items: [{
        id: 'crmjtn-portal',
        xtype: 'tablepanel',
        items: [{
			id: 'portletcrmjtn-1',
			xtype: 'portlet',
			title: 'Compute Node vCPU Utilization',
			items: [{
				xtype: 'crmjtnvcpuutils',
				border: false
			}]
		},{
			id: 'portletcrmjtn-2',
			xtype: 'portlet',
			title: 'Compute Node MEM Utilization',
			items: [{
				xtype: 'crmjtnmemutils',
				border: false
			}]
		},{
			id: 'portletcrmjtn-3',
			xtype: 'portlet',
			title: 'Compute Node Utilization',
			items: [{
				xtype: 'crmjtnsrvpanel',
				border: false
			}]
		},{
			id: 'portletcrmjtn-5',
			xtype: 'portlet',
			title: 'Compute Node Utilization Data',
			colspan: 3,
			items: [{
				xtype: 'crmjtndata',
				border: false
			}]
	    }]
	}]
});