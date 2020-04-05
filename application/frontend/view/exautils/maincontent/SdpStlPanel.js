Ext.define('CImeetsExtJS.view.exautils.maincontent.SdpStlPanel', {
    extend: 'Ext.panel.Panel',
	alias: 'widget.exautils-sdpstlpanel',
	border: false,
	layout: 'fit',
	defaults: {
		bodyStyle:'padding:5px',
		border: false
	},
	
	items: [{
        id: 'sdpstl-portal',
        xtype: 'tablepanel',
        items: [{
			id: 'portletsdpstl-1',
			xtype: 'portlet',
			title: 'Compute Node vCPU Utilization',
			items: [{
				xtype: 'sdpstlvcpuutils',
				border: false
			}]
		},{
			id: 'portletsdpstl-2',
			xtype: 'portlet',
			title: 'Compute Node MEM Utilization',
			items: [{
				xtype: 'sdpstlmemutils',
				border: false
			}]
		},{
			id: 'portletsdpstl-3',
			xtype: 'portlet',
			title: 'Compute Node Utilization',
			items: [{
				xtype: 'sdpstlsrvpanel',
				border: false
			}]
		},{
			id: 'portletsdpstl-5',
			xtype: 'portlet',
			title: 'Compute Node Utilization Data',
			colspan: 3,
			items: [{
				xtype: 'sdpstldata',
				border: false
			}]
	    }]
	}]
});