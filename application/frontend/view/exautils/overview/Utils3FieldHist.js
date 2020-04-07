Ext.define('CImeetsExtJS.view.exautils.overview.Utils3FieldHist', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.utils3fieldhist',
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
            height: 200,
            items: {
				xtype: 'chart',
	            animate: true,
	            store: this.store,
	            shadow: true,
	            legend: {
	                position: 'right'
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
	                }
	            }, {
	                type: 'Category',
	                position: 'bottom',
	                fields: [ this.cat_fields ]
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
	                    renderer: function(storeItem, item) {
	                        this.setTitle(storeItem.get(this.cat_fields) + ' - ' + this.s1_title);
	                        this.update(storeItem.get(this.s1_yfield));
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
	                    renderer: function(storeItem, item) {
	                        this.setTitle(storeItem.get(this.cat_fields) + ' - ' + this.s2_title);
	                        this.update(storeItem.get(this.s2_yfield));
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
	                    renderer: function(storeItem, item) {
	                        this.setTitle(storeItem.get(this.cat_fields) + ' - ' + this.s3_title);
	                        this.update(storeItem.get(this.s3_yfield));
	                    }
	                }
	            }]
			}
        });

        this.callParent(arguments);
    }
});
