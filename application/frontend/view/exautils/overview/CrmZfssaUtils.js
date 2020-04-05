Ext.define('CImeetsExtJS.view.exautils.overview.CrmZfssaUtils', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.crmzfssauutils',

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
            height: 300,
            items: {
                xtype: 'chart',
	            animate: true,
	            shadow: true,
				store: 'CrmUtilsStore',
	            legend: {
	                position: 'bottom'
	            },
	            axes: [{
	                type: 'Numeric',
	                position: 'bottom',
	                fields: ['used_zfssa_pct', 'free_zfssa_pct'],
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
	                fields: ['box_alias'],
	                title: false
	            }],
	            series: [{
	                type: 'bar',
	                axis: 'bottom',
	                gutter: 80,
	                xField: 'box_name',
	                yField: ['used_zfssa_pct', 'free_zfssa_pct'],
	                stacked: true,
					label: {
		                contrast: true,
		                display: 'insideEnd',
		                field: ['used_zfssa', 'free_zfssa'],
		                color: '#000',
		                'text-anchor': 'middle',
						renderer: function(value, label, storeItem, item, i, display, animate, index) {
							return +(Math.round((value/(1024)) + "e+2") + "e-2") + ' T';
						}
		            },
	                tips: {
	                    trackMouse: true,
	                    width: 65,
	                    height: 28,
		                label: {
		                    renderer: function(storeItem, item) {
		                        this.setTitle(String(item.value[1]) + "%");
		                    }
		                }
	                }
	            }]
            }
        });

        this.callParent(arguments);
    }
});
