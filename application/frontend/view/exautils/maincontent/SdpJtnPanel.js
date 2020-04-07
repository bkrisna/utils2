Ext.define('CImeetsExtJS.view.exautils.maincontent.SdpJtnPanel', {
    extend: 'Ext.panel.Panel',
	alias: 'widget.exautils-sdpjtnpanel',
	border: false,
	layout: 'fit',
	defaults: {
		bodyStyle:'padding:5px',
		border: false
	},
	
	utilstore: '',
	datastore: '',
	
	
	initComponent: function(){
		Ext.apply(this, {
			items: [{
		        id: 'sdpjtn-portal',
		        xtype: 'tablepanel',
		        items: [{
					id: 'portletsdpjtn-1',
					xtype: 'portlet',
					title: 'Compute Node vCPU Utilization',
					items: [{
							xtype: 'stackedbarchart',
							border: false,
							height: 655,
							store: this.utilstore,
							axes_field: ['used_vcpu_pct', 'free_vcpu_pct'],
							cat_fields: ['hostalias'],
							field_tile: ['Used vCPU', 'Free vCPU'],
							xfield: 'hostname',
							yfield: ['used_vcpu_pct', 'free_vcpu_pct'],
							yfield_data: ['used_vcpu', 'free_vcpu']
						}]
				},{
					id: 'portletsdpjtn-2',
					xtype: 'portlet',
					title: 'Compute Node MEM Utilization',
					items: [{
							xtype: 'stackedbarchart',
							border: false,
							height: 655,
							series_label_convert: 'MB-GB',
							store: this.utilstore,
							axes_field: ['used_mem_pct', 'free_mem_pct'],
							cat_fields: ['hostalias'],
							field_tile: ['Used MEM', 'Free MEM'],
							xfield: 'hostname',
							yfield: ['used_mem_pct', 'free_mem_pct'],
							yfield_data: ['used_mem', 'free_mem']
						}]
				},{
					id: 'portletsdpjtn-3',
					xtype: 'portlet',
					title: 'Compute Node Utilization',
					items: [{
						xtype: 'serverutilsgrid',
						border: false,
						store: this.utilstore
					}]
				},{
					id: 'portletsdpjtn-5',
					xtype: 'portlet',
					title: 'Compute Node Utilization Data',
					colspan: 3,
					items: [{
						xtype: 'serverdatagrid',
						border: false,
						store: this.datastore
					}]
			    }]
			}]
		});
		
		this.callParent(arguments);
	}
});