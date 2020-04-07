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
	            id: 'portlet-12',
				title: 'SDP vCPU Hist',
				items: [{
					xtype: 'utils3fieldhist',
					border: false,
					store: 'UtilsHistStore',
					axes_field: ['SDP-SB_used_vcpu', 'SDP-JTN_used_vcpu', 'SDP-STL_used_vcpu'],
					cat_fields: ['report_alias'],
					s1_tile: 'SDP-SB',
					s1_xfield: 'report_id',
					s1_yfield: 'SDP-SB_used_vcpu',
					s2_tile: 'SDP-JTN',
					s2_xfield: 'report_id',
					s2_yfield: 'SDP-JTN_used_vcpu',
					s3_tile: 'SDP-STL',
					s3_xfield: 'report_id',
					s3_yfield: 'SDP-STL_used_vcpu'
				}]
	        },{
	            id: 'portlet-13',
				title: 'CRM vCPU Utilization',
				items: [{
					xtype: 'crmvcpuutils',
					border: false
				}]
	        },{
	            id: 'portlet-14',
				title: 'CRM vCPU Hist',
				items: [{
					xtype: 'crmvcpuutilshist',
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