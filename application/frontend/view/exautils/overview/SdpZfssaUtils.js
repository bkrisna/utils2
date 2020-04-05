Ext.define('CImeetsExtJS.view.exautils.overview.SdpZfssaUtils', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.sdpzfssauutils',

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
				store: 'SdpUtilsStore',
	            legend: {
	                position: 'bottom'
	            },
	            axes: [{
	                type: 'Numeric',
	                position: 'bottom',
	                fields: ['used_zfssa_pct', 'free_zfssa_pct'],
	                title: false,
					max: 1,
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
					title: ['Used Size (T)', 'Free Size (T)'],
	                type: 'bar',
	                axis: 'bottom',
	                gutter: 80,
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
	                xField: 'box_name',
	                yField: ['used_zfssa_pct', 'free_zfssa_pct'],
	                stacked: true,
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
