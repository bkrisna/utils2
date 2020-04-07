Ext.define('CImeetsExtJS.view.exautils.template.MainContentPanel', {
    extend: 'Ext.panel.Panel',
	alias: 'widget.maincontentpanel',
	border: false,
	layout: 'fit',
	defaults: {
		bodyStyle:'padding:5px',
		border: false
	},
	
	utilstore: '',
	datastore: '',
	detailstore: '',
	tmpl_id: '',
	bar_chart_height: '',
	svrgrid_height: '',
	datagrid_height: '',
	gauge_chart_height: '',
	
	
	initComponent: function(){
		Ext.apply(this, {
			items: [{
		        id: this.tmpl_id + '-portal',
		        xtype: 'tablepanel',
		        items: [{
					id: this.tmpl_id +'prlt-1',
					xtype: 'portlet',
					title: 'Compute Node vCPU Utilization',
					rowspan: 2,
					width: 450,
					items: [{
						xtype: 'stackedbarchart',
						border: false,
						height: this.bar_chart_height,
						store: this.utilstore,
						axes_field: ['used_vcpu_pct', 'free_vcpu_pct'],
						cat_fields: ['hostalias'],
						field_tile: ['Used vCPU', 'Free vCPU'],
						xfield: 'hostname',
						yfield: ['used_vcpu_pct', 'free_vcpu_pct'],
						yfield_data: ['used_vcpu', 'free_vcpu']
					}]
				},{
					id: this.tmpl_id +'prlt-2',
					xtype: 'portlet',
					title: 'Compute Node MEM Utilization',
					rowspan: 2,
					width: 450,
					items: [{
						xtype: 'stackedbarchart',
						border: false,
						height: this.bar_chart_height,
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
					id: this.tmpl_id +'prlt-3',
					xtype: 'portlet',
					title: 'Overall Exalogic Utilization',
					width: 650,
					height: this.gauge_chart_height,
					items: [{
						xtype: '3piechart',
						border: false,
						store: this.detailstore,
						legend_pos: 'bottom'
					}]
				},{
					id: this.tmpl_id +'prlt-4',
					xtype: 'portlet',
					title: 'Compute Node Utilization',
					items: [{
						xtype: 'serverutilsgrid',
						border: false,
						store: this.utilstore
					}]
				},{
					id: this.tmpl_id +'prlt-5',
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