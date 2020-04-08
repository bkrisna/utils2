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
					xtype: 'stackedbarchart',
					border: false,
					height: 300,
					store: 'SdpUtilsStore',
					axes_field: ['used_vcpu_pct', 'free_vcpu_pct'],
					cat_fields: ['box_alias'],
					field_tile: ['Used vCPU', 'Free vCPU'],
					xfield: 'box_name',
					yfield: ['used_vcpu_pct', 'free_vcpu_pct'],
					yfield_data: ['used_vcpu', 'free_vcpu']
				}]
	        },{
	            id: 'portlet-12',
				title: 'SDP vCPU History',
				items: [{
					xtype: 'linechart3field',
					border: false,
					height: 300,
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
					xtype: 'stackedbarchart',
					border: false,
					height: 300,
					store: 'CrmUtilsStore',
					axes_field: ['used_vcpu_pct', 'free_vcpu_pct'],
					cat_fields: ['box_alias'],
					field_tile: ['Used vCPU', 'Free vCPU'],
					xfield: 'box_name',
					yfield: ['used_vcpu_pct', 'free_vcpu_pct'],
					yfield_data: ['used_vcpu', 'free_vcpu']
				}]
	        },{
	            id: 'portlet-14',
				title: 'CRM vCPU History',
				items: [{
					xtype: 'linechart2field',
					border: false,
					height: 300,
					store: 'UtilsHistStore',
					axes_field: ['CRM-JTN_used_vcpu', 'CRM-STL_used_vcpu'],
					cat_fields: ['report_alias'],
					s1_title: 'CRM-JTN',
					s1_xfield: 'report_id',
					s1_yfield: 'CRM-JTN_used_vcpu',
					s2_title: 'CRM-STL',
					s2_xfield: 'report_id',
					s2_yfield: 'CRM-STL_used_vcpu',
				}]
	        }]
        }, {
	    	id: 'col-2',
			items: [{
	            id: 'portlet-21',
				title: 'SDP Memory Utilization',
				items: [{
					xtype: 'stackedbarchart',
					border: false,
					height: 300,
					series_label_convert: 'MB-TB',
					store: 'SdpUtilsStore',
					axes_field: ['used_mem_pct', 'free_mem_pct'],
					cat_fields: ['box_alias'],
					field_tile: ['Used MEM', 'Free MEM'],
					xfield: 'box_name',
					yfield: ['used_mem_pct', 'free_mem_pct'],
					yfield_data: ['used_mem', 'free_mem']
				}]
	        },{
	            id: 'portlet-22',
				title: 'SDP MEM History',
				items: [{
					xtype: 'linechart3field',
					border: false,
					height: 300,
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
					s3_yfield: 'SDP-STL_used_mem',
					series_label_convert: 'MB-TB',
				}]
	        },{
	            id: 'portlet-23',
				title: 'CRM Memory Utilization',
				items: [{
					xtype: 'stackedbarchart',
					border: false,
					height: 300,
					series_label_convert: 'MB-TB',
					store: 'CrmUtilsStore',
					axes_field: ['used_mem_pct', 'free_mem_pct'],
					cat_fields: ['box_alias'],
					field_tile: ['Used MEM', 'Free MEM'],
					xfield: 'box_name',
					yfield: ['used_mem_pct', 'free_mem_pct'],
					yfield_data: ['used_mem', 'free_mem']
				}]
	        },{
	            id: 'portlet-24',
				title: 'CRM MEM History',
				items: [{
					xtype: 'linechart2field',
					border: false,
					height: 300,
					store: 'UtilsHistStore',
					axes_field: ['CRM-JTN_used_mem', 'CRM-STL_used_mem'],
					cat_fields: ['report_alias'],
					s1_title: 'CRM-JTN',
					s1_xfield: 'report_id',
					s1_yfield: 'CRM-JTN_used_mem',
					s2_title: 'CRM-STL',
					s2_xfield: 'report_id',
					s2_yfield: 'CRM-STL_used_mem',
					series_label_convert: 'MB-TB',
				}]
	        }]
        }, {
	    	id: 'col-3',
			items: [{
	            id: 'portlet-31',
				title: 'SDP ZFSSA Utilization',
				items: [{
					xtype: 'stackedbarchart',
					border: false,
					height: 300,
					series_label_convert: 'GB-TB',
					store: 'SdpUtilsStore',
					axes_field: ['used_zfssa_pct', 'free_zfssa_pct'],
					cat_fields: ['box_alias'],
					field_tile: ['Used Size', 'Free Size'],
					xfield: 'box_name',
					yfield: ['used_zfssa_pct', 'free_zfssa_pct'],
					yfield_data: ['used_zfssa', 'free_zfssa']
				}]
	        },{
	            id: 'portlet-32',
				title: 'SDP ZFSSA History',
				items: [{
					xtype: 'linechart3field',
					border: false,
					height: 300,
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
					s3_yfield: 'SDP-STL_used_zfssa',
					series_label_convert: 'GB-TB',
				}]
	        },{
	            id: 'portlet-33',
				title: 'CRM ZFSSA Utilization',
				items: [{
					xtype: 'stackedbarchart',
					border: false,
					height: 300,
					series_label_convert: 'GB-TB',
					store: 'CrmUtilsStore',
					axes_field: ['used_zfssa_pct', 'free_zfssa_pct'],
					cat_fields: ['box_alias'],
					field_tile: ['Used Size', 'Free Size'],
					xfield: 'box_name',
					yfield: ['used_zfssa_pct', 'free_zfssa_pct'],
					yfield_data: ['used_zfssa', 'free_zfssa']
				}]
	        },{
	            id: 'portlet-34',
				title: 'CRM ZFSSA History',
				items: [{
					xtype: 'linechart2field',
					border: false,
					height: 300,
					store: 'UtilsHistStore',
					axes_field: ['CRM-JTN_used_zfssa', 'CRM-STL_used_zfssa'],
					cat_fields: ['report_alias'],
					s1_title: 'CRM-JTN',
					s1_xfield: 'report_id',
					s1_yfield: 'CRM-JTN_used_zfssa',
					s2_title: 'CRM-STL',
					s2_xfield: 'report_id',
					s2_yfield: 'CRM-STL_used_zfssa',
					series_label_convert: 'GB-TB',
				}]
	        }]
        }]
	}]
});