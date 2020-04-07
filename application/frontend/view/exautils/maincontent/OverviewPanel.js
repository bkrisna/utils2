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
				title: 'SDP vCPU History',
				items: [{
					xtype: 'linechart3field',
					border: false,
					store: 'UtilsHistStore',
					axes_field: ['SDP-SB_used_vcpu', 'SDP-JTN_used_vcpu', 'SDP-STL_used_vcpu'],
					cat_fields: ['report_alias'],
					s1_title: 'SDP-SB',
					s1_xfield: 'report_id',
					s1_yfield: 'SDP-SB_used_vcpu',
					s2_title: 'SDP-JTN',
					s2_xfield: 'report_id',
					s2_yfield: 'SDP-JTN_used_vcpu',
					s3_title: 'SDP-STL',
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
				title: 'CRM vCPU History',
				items: [{
					xtype: 'linechart2field',
					border: false,
					height: 200,
					store: 'UtilsHistStore',
					axes_field: ['CRM-JTN_used_vcpu', 'CRM-STL_used_vcpu'],
					cat_fields: ['report_alias'],
					s1_title: 'CRM-JTN',
					s1_xfield: 'report_id',
					s1_yfield: 'CRM-JTN_used_vcpu',
					s2_title: 'CRM-STL',
					s2_xfield: 'report_id',
					s2_yfield: 'CRM-STL_used_vcpu'
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
	            id: 'portlet-23',
				title: 'SDP MEM History',
				items: [{
					xtype: 'linechart3field',
					border: false,
					store: 'UtilsHistStore',
					axes_field: ['SDP-SB_used_mem', 'SDP-JTN_used_mem', 'SDP-STL_used_mem'],
					cat_fields: ['report_alias'],
					s1_title: 'SDP-SB',
					s1_xfield: 'report_id',
					s1_yfield: 'SDP-SB_used_mem',
					s2_title: 'SDP-JTN',
					s2_xfield: 'report_id',
					s2_yfield: 'SDP-JTN_used_mem',
					s3_title: 'SDP-STL',
					s3_xfield: 'report_id',
					s3_yfield: 'SDP-STL_used_mem'
				}]
	        },{
	            id: 'portlet-22',
				title: 'CRM MEM Utilization',
				items: [{
					xtype: 'crmmemutils',
					border: false
				}]
			},{
	            id: 'portlet-24',
				title: 'CRM MEM History',
				items: [{
					xtype: 'linechart2field',
					border: false,
					height: 200,
					store: 'UtilsHistStore',
					axes_field: ['CRM-JTN_used_mem', 'CRM-STL_used_mem'],
					cat_fields: ['report_alias'],
					s1_title: 'CRM-JTN',
					s1_xfield: 'report_id',
					s1_yfield: 'CRM-JTN_used_mem',
					s2_title: 'CRM-STL',
					s2_xfield: 'report_id',
					s2_yfield: 'CRM-STL_used_mem'
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
	            id: 'portlet-33',
				title: 'SDP ZFSSA History',
				items: [{
					xtype: 'linechart3field',
					border: false,
					store: 'UtilsHistStore',
					axes_field: ['SDP-SB_used_zfssa', 'SDP-JTN_used_zfssa', 'SDP-STL_used_zfssa'],
					cat_fields: ['report_alias'],
					s1_title: 'SDP-SB',
					s1_xfield: 'report_id',
					s1_yfield: 'SDP-SB_used_zfssa',
					s2_title: 'SDP-JTN',
					s2_xfield: 'report_id',
					s2_yfield: 'SDP-JTN_used_zfssa',
					s3_title: 'SDP-STL',
					s3_xfield: 'report_id',
					s3_yfield: 'SDP-STL_used_zfssa'
				}]
	        },{
	            id: 'portlet-32',
				title: 'CRM ZFSSA Utilization',
				items: [{
					xtype: 'crmzfssauutils',
					border: false
				}]
			},{
	            id: 'portlet-34',
				title: 'CRM ZFSSA History',
				items: [{
					xtype: 'linechart2field',
					border: false,
					height: 200,
					store: 'UtilsHistStore',
					axes_field: ['CRM-JTN_used_zfssa', 'CRM-STL_used_zfssa'],
					cat_fields: ['report_alias'],
					s1_title: 'CRM-JTN',
					s1_xfield: 'report_id',
					s1_yfield: 'CRM-JTN_used_zfssa',
					s2_title: 'CRM-STL',
					s2_xfield: 'report_id',
					s2_yfield: 'CRM-STL_used_zfssa'
				}]
	        }]
        }]
	}]
});