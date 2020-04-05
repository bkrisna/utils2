Ext.define('CImeetsExtJS.view.exautils.overview.SdpVcpuUtilsHist', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.sdpvcpuutilshist',

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
	            store: 'SdpUtilsHistStore',
	            shadow: true,
	            legend: {
	                position: 'right'
	            },
	            axes: [{
	                type: 'Numeric',
	                minimum: 0,
	                position: 'left',
	                fields: ['used_vcpu'],
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
	                fields: ['report_id']
	            }],
	            series: [{
	                type: 'line',
	                highlight: {
	                    size: 7,
	                    radius: 7
	                },
	                axis: 'left',
	                xField: 'report_id',
	                yField: ['box_id']
	            }]
			}
        });

        this.callParent(arguments);
    }
});
