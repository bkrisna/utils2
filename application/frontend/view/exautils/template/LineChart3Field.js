Ext.define('CImeetsExtJS.view.exautils.template.LineChart3Field', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.linechart3field',
	store: '',
	axes_field: [],
	cat_fields: [],
	s1_tile: '',
	s1_xfield: '',
	s1_yfield: '',
	s2_tile: '',
	s2_xfield: '',
	s2_yfield: '',
	s3_tile: '',
	s3_xfield: '',
	s3_yfield: '',
	series_label_convert: '',

    requires: [
		'Ext.data.JsonStore',
        'Ext.chart.theme.Base',
        'Ext.chart.series.Series',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric'
    ],
	
    initComponent: function(){
		
        Ext.apply(this, {
            layout: 'fit',
            height: this.height,
            items: {
				xtype: 'chart',
	            animate: true,
	            store: this.store,
	            shadow: true,
	            legend: {
	                position: 'bottom'
	            },
	            axes: [{
	                type: 'Numeric',
	                minimum: 0,
	                position: 'left',
	                fields: this.axes_field,
	                minorTickSteps: 1,
					title: false,
	                grid: {
	                    odd: {
	                        opacity: 1,
	                        fill: '#ddd',
	                        stroke: '#bbb',
	                        'stroke-width': 0.5
	                    }
	                },
					label: {
						label_convert: this.series_label_convert,
		                renderer: function(value) {
							if (this.label_convert == 'MB-TB') {
								return +(Math.round((value/(1024*1024)) + "e+2") + "e-2") + ' TB';
							}
							if (this.label_convert == 'MB-GB') {
								return +(Math.round((value/(1024)) + "e+2") + "e-2") + ' GB';
							}
							if (this.label_convert == 'GB-TB') {
								return +(Math.round((value/(1024)) + "e+2") + "e-2") + ' TB';
							}
							else {
								return value
							}
		                }
		            }
	            }, {
	                type: 'Category',
	                position: 'bottom',
	                fields: [ this.cat_fields ],
					label: {
			            rotate: {
			                degrees: 315
			            }
			        }
	            }],
	            series: [{
					title: [this.s1_title],
	                type: 'line',
	                highlight: {
	                    size: 7,
	                    radius: 7
	                },
	                axis: 'left',
	                xField: this.s1_xfield,
	                yField: [this.s1_yfield],
					tips: {
	                    trackMouse: true,
	                    width: 120,
	                    height: 40,
						hdata1: this.cat_fields,
						hdata2: this.s1_title,
						bdata1: this.s1_yfield,
	                    renderer: function(storeItem, item) {
	                        this.setTitle(storeItem.get(this.hdata1) + ' - ' + this.hdata2);
	                        this.update(storeItem.get(this.bdata1));
	                    }
	                }
	            },{
					title: [this.s2_title],
	                type: 'line',
	                highlight: {
	                    size: 7,
	                    radius: 7
	                },
	                axis: 'left',
	                xField: this.s2_xfield,
	                yField: [this.s2_yfield],
					tips: {
	                    trackMouse: true,
	                    width: 120,
	                    height: 40,
						hdata1: this.cat_fields,
						hdata2: this.s2_title,
						bdata1: this.s2_yfield,
	                    renderer: function(storeItem, item) {
	                        this.setTitle(storeItem.get(this.hdata1) + ' - ' + this.hdata2);
	                        this.update(storeItem.get(this.bdata1));
	                    }
	                }
	            },{
					title: [this.s3_title],
	                type: 'line',
	                highlight: {
	                    size: 7,
	                    radius: 7
	                },
	                axis: 'left',
	                xField: this.s3_xfield,
	                yField: [this.s3_yfield],
					tips: {
	                    trackMouse: true,
	                    width: 120,
	                    height: 40,
						hdata1: this.cat_fields,
						hdata2: this.s2_title,
						bdata1: this.s2_yfield,
	                    renderer: function(storeItem, item) {
	                        this.setTitle(storeItem.get(this.hdata1) + ' - ' + this.hdata2);
	                        this.update(storeItem.get(this.bdata1));
	                    }
	                }
	            }]
			}
        });

        this.callParent(arguments);
    }
});
