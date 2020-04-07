Ext.define('CImeetsExtJS.view.exautils.template.StackedBarChart', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.stackedbarchart',
	store: '',
	axes_field: [],
	cat_fields: [],
	field_tile: '',
	xfield: '',
	yfield: [],
	yfield_data: [],
	series_label_convert: '',

    requires: [
		'Ext.data.JsonStore',
        'Ext.chart.theme.Base',
        'Ext.chart.series.Series',
        'Ext.chart.axis.Numeric'
    ],
	
    initComponent: function(){
		
        Ext.apply(this, {
            layout: 'fit',
            height: this.height,
            items: {
                xtype: 'chart',
	            animate: true,
	            shadow: true,
				store: this.store,
	            legend: {
	                position: 'bottom'
	            },
	            axes: [{
	                type: 'Numeric',
	                position: 'bottom',
	                fields: this.axes_field,
	                title: false,
	                grid: true,
					label: {
		                renderer: function(v) {
		                    return v + "%";
		                }
		            }
	            }, {
	                type: 'Category',
	                position: 'left',
	                fields: [ this.cat_fields ],
	                title: false
	            }],
	            series: [{
					title: this.field_tile,
	                type: 'bar',
	                axis: 'bottom',
	                gutter: 80,
	                xField: this.xfield,
	                yField: this.yfield,
	                stacked: true,
					label: {
		                contrast: true,
		                display: 'insideEnd',
		                field: this.yfield_data,
		                color: '#000',
		                'text-anchor': 'middle',
						label_convert: this.series_label_convert,
						renderer: function(value, label, storeItem, item, i, display, animate, index) {
							if (label['label_convert'] == 'MB-TB') {
								return +(Math.round((value/(1024*1024)) + "e+2") + "e-2") + ' TB';
							}
							if (label['label_convert'] == 'MB-GB') {
								return +(Math.round((value/(1024)) + "e+2") + "e-2") + ' GB';
							}
							if (label['label_convert'] == 'GB-TB') {
								return +(Math.round((value/(1024)) + "e+2") + "e-2") + ' TB';
							}
							else {
								return value
							}
						}
		            },
	                tips: {
	                    trackMouse: true,
	                    width: 65,
	                    height: 28,
		                renderer: function(storeItem, item) {
								this.setTitle(String(item.value[1]) + "%");
		                }
	                }
	            }]
            }
        });

        this.callParent(arguments);
    }
});
