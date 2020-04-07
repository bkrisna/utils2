Ext.define('CImeetsExtJS.view.exautils.overview.CrmVcpuUtilsHist', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.crmvcpuutilshist',

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
	            store: 'UtilsHistStore',
	            shadow: true,
	            legend: {
	                position: 'right'
	            },
	            axes: [{
	                type: 'Numeric',
	                minimum: 0,
	                position: 'left',
	                fields: ['CRM-JTN_used_vcpu', 'CRM-STL_used_vcpu'],
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
	                yField: ['CRM-JTN_used_vcpu']
	            },{
	                type: 'line',
	                highlight: {
	                    size: 7,
	                    radius: 7
	                },
	                axis: 'left',
	                xField: 'report_id',
	                yField: ['CRM-STL_used_vcpu']
	            }]
			}
        });

        this.callParent(arguments);
    }
});
