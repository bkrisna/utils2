Ext.define('CImeetsExtJS.view.exautils.maincontent.SdpSbyPanel', {
    extend: 'Ext.panel.Panel',
	alias: 'widget.exautils-sdpsbypanel',
	border: false,
	layout: 'fit',
	defaults: {
		bodyStyle:'padding:5px',
		border: false
	},
	
	items: [{
        id: 'sdpsby-portal',
        xtype: 'tablepanel',
        items: [{
			id: 'portletsdpsby-1',
			xtype: 'portlet',
			title: 'Compute Node vCPU Utilization',
			items: [{
				xtype: 'sdpsbyvcpuutils',
				border: false
			}]
		},{
			id: 'portletsdpsby-2',
			xtype: 'portlet',
			title: 'Compute Node MEM Utilization',
			items: [{
				xtype: 'sdpsbymemutils',
				border: false
			}]
		},{
			id: 'portletsdpsby-3',
			xtype: 'portlet',
			title: 'Compute Node Utilization',
			items: [{
				xtype: 'sdpsbysrvpanel',
				border: false
			}]
		},{
			id: 'portletsdpsby-5',
			xtype: 'portlet',
			title: 'Compute Node Utilization Data',
			colspan: 3,
			items: [{
				xtype: 'sdpsbydata',
				border: false
			}]
	    }]
	}]
});