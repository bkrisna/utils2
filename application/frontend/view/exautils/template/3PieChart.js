Ext.define('CImeetsExtJS.view.exautils.template.3PieChart', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.3piechart',
	store: '',
	axes_field: [],
	cat_fields: [],
	field_tile: '',
	xfield: '',
	yfield: [],
	yfield_data: [],
	series_label_convert: '',
	legend_pos: '',

    requires: [
		'Ext.data.JsonStore',
        'Ext.chart.theme.Base',
        'Ext.chart.series.Series',
        'Ext.chart.axis.Numeric'
    ],
	
    initComponent: function(){
		
        Ext.apply(this, {
			xtype: 'panel',
			width: this.width,
			height: this.height,
	        layout: {
	            type: 'hbox',
	            align: 'stretch'
	        },
	        items: [{
				xtype: 'chart',
	            animate: true,
	            store: this.store,
				shadow: true,
	            legend: {
	                position: this.legend_pos
	            },
	            insetPadding: 20,
	            flex: 1,
				theme: 'Base:gradients',
				axes: [{
	                type: 'gauge',
	                position: 'gauge',
	                minimum: 0,
	                maximum: 100,
	                steps: 10,
	                margin: 5
	            }],
	            series: [{
					type: 'gauge',
					title: ['Used vCPU'],
					showInLegend: true,
	                field: ['used_vcpu_pct'],
	                donut: 30,
	                tips: {
	                    trackMouse: true,
	                    width: 180,
	                    height: 50,
		                renderer: function(storeItem, item) {
								this.setTitle('Total vCPU Usage:');
								this.update(storeItem.get('used_vcpu') + ' of ' + storeItem.get('total_vcpu'));
		                }
	                }
	            }]
	        },{
				xtype: 'chart',
	            animate: true,
	            store: this.store,
				shadow: true,
	            legend: {
	                position: this.legend_pos
	            },
	            insetPadding: 20,
	            flex: 1,
				theme: 'Base:gradients',
				axes: [{
	                type: 'gauge',
	                position: 'gauge',
	                minimum: 0,
	                maximum: 100,
	                steps: 10,
	                margin: 5
	            }],
	            series: [{
	                type: 'gauge',
					title: ['Used Mem'],
					showInLegend: true,
	                field: 'used_mem_pct',
	                donut: 30,
	                tips: {
	                    trackMouse: true,
	                    width: 180,
	                    height: 50,
		                renderer: function(storeItem, item) {
								this.setTitle('Total MEM Usage:');
								umem = +(Math.round((storeItem.get('used_mem')/(1024*1024)) + "e+2") + "e-2") + ' TB';
								tmem = +(Math.round((storeItem.get('total_mem')/(1024*1024)) + "e+2") + "e-2") + ' TB';
								this.update(umem + ' of ' + tmem);
		                }
	                }
	            }]
	        },{
				xtype: 'chart',
	            animate: true,
	            store: this.store,
				shadow: true,
	            legend: {
	                position: this.legend_pos
	            },
	            insetPadding: 20,
	            flex: 1,
				theme: 'Base:gradients',
				axes: [{
	                type: 'gauge',
	                position: 'gauge',
	                minimum: 0,
	                maximum: 100,
	                steps: 10,
	                margin: 5
	            }],
	            series: [{
	                type: 'gauge',
					title: ['Used ZFSSA'],
					showInLegend: true,
	                field: 'used_zfssa_pct',
	                donut: 30,
	                tips: {
	                    trackMouse: true,
	                    width: 180,
	                    height: 50,
		                renderer: function(storeItem, item) {
								this.setTitle('Total ZFSSA Usage:');
								umem = +(Math.round((storeItem.get('used_zfssa')/(1024)) + "e+2") + "e-2") + ' TB';
								tmem = +(Math.round((storeItem.get('total_zfssa')/(1024)) + "e+2") + "e-2") + ' TB';
								this.update(umem + ' of ' + tmem);
		                }
	                }
	            }]
	        }]
        });

        this.callParent(arguments);
    }
});
