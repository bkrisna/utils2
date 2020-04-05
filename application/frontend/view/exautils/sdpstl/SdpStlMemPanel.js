Ext.define('CImeetsExtJS.view.exautils.sdpstl.SdpStlMemPanel', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.sdpstlmemutils',

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
            height: 655,
            items: {
                xtype: 'chart',
	            animate: true,
	            shadow: true,
				store: 'SdpStlUtilStore',
	            legend: {
	                position: 'bottom'
	            },
	            axes: [{
	                type: 'Numeric',
	                position: 'bottom',
	                fields: ['used_mem_pct','free_mem_pct'],
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
	                fields: ['hostalias'],
	                title: false
	            }],
	            series: [{
					title: ['Used MEM (GB)', 'Free MEM (GB)'],
	                type: 'bar',
	                axis: 'bottom',
	                gutter: 80,
	                xField: 'hostname',
	                yField: ['used_mem_pct', 'free_mem_pct'],
	                stacked: true,
					label: {
		                contrast: true,
		                display: 'insideEnd',
		                field: ['used_mem', 'free_mem'],
		                color: '#000',
		                'text-anchor': 'middle',
						renderer: function(value, label, storeItem, item, i, display, animate, index) {
							return +(Math.round((value/(1024)) + "e+2") + "e-2") + ' GB';
						}
		            },
	                xField: 'box_name',
	                yField: ['used_mem_pct', 'free_mem_pct'],
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
