Ext.define('CImeetsExtJS.view.exautils.maincontent.OverviewPanel', {
    extend: 'Ext.panel.Panel',
	alias: 'widget.exautils-overview',
	border: false,
	
	items: [{
        id: 'app-portal',
        xtype: 'portalpanel',
        region: 'center',
		border: false,
        items: [{
	        id: 'col-1',
	        items: [{
	            id: 'portlet-11',
				title: 'SDP vCPU Utilization',
				items: [{
					xtype: 'sdpvcpuutils',
					border: false
				}]
	        },{
	            id: 'portlet-13',
				title: 'CRM vCPU Utilization',
				items: [{
					xtype: 'crmvcpuutils',
					border: false
				}]
	        }]
        }, {
	    	id: 'col-2',
			items: [{
	            id: 'portlet-21',
				title: 'SDP MEM Utilization',
				items: [{
					xtype: 'sdpmemutils',
					border: false
				}]
			},{
	            id: 'portlet-22',
				title: 'CRM MEM Utilization',
				items: [{
					xtype: 'crmmemutils',
					border: false
				}]
			}]
        }, {
	    	id: 'col-3',
			items: [{
	            id: 'portlet-31',
				title: 'SDP ZFSSA Utilization',
				items: [{
					xtype: 'sdpzfssauutils',
					border: false
				}]
			},{
	            id: 'portlet-32',
				title: 'CRM ZFSSA Utilization',
				items: [{
					xtype: 'crmzfssauutils',
					border: false
				}]
			}]
        }]
	}]
});