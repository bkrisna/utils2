Ext.define('CImeetsExtJS.view.exautils.maincontent.SdpJtnPanel', {
    extend: 'Ext.panel.Panel',
	alias: 'widget.exautils-sdpjtnpanel',
	border: false,
	layout: 'fit',
	defaults: {
		bodyStyle:'padding:5px',
		border: false
	},
	
	items: [{
        id: 'sdpjtn-portal',
        xtype: 'tablepanel',
        items: [{
			id: 'portletsdpjtn-1',
			xtype: 'portlet',
			title: 'Compute Node vCPU Utilization',
			items: [{
				xtype: 'sdpjtnvcpuutils',
				border: false
			}]
		},{
			id: 'portletsdpjtn-2',
			xtype: 'portlet',
			title: 'Compute Node MEM Utilization',
			items: [{
				xtype: 'sdpjtnmemutils',
				border: false
			}]
		},{
			id: 'portletsdpjtn-3',
			xtype: 'portlet',
			title: 'Compute Node Utilization',
			items: [{
				xtype: 'sdpjtnsrvpanel',
				border: false
			}]
		},{
			id: 'portletsdpjtn-5',
			xtype: 'portlet',
			title: 'Compute Node Utilization Data',
			colspan: 3,
			items: [{
				xtype: 'sdpjtndata',
				border: false
			}]
	    }]
	}]
});