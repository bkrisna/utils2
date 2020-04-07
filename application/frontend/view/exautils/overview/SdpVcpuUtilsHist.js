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
	            store: 'UtilsHistStore',
	            shadow: true,
	            legend: {
	                position: 'right'
	            },
	            axes: [{
	                type: 'Numeric',
	                minimum: 0,
	                position: 'left',
	                fields: ['SDP-SB_used_vcpu', 'SDP-JTN_used_vcpu', 'SDP-STL_used_vcpu'],
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
	                fields: ['report_alias']
	            }],
	            series: [{
					title: ['SDP-SB'],
	                type: 'line',
	                highlight: {
	                    size: 7,
	                    radius: 7
	                },
	                axis: 'left',
	                xField: 'report_id',
	                yField: ['SDP-SB_used_vcpu'],
					tips: {
	                    trackMouse: true,
	                    width: 120,
	                    height: 40,
	                    renderer: function(storeItem, item) {
	                        this.setTitle(storeItem.get('report_alias') + ' - SDP-SB');
	                        this.update(storeItem.get('SDP-SB_used_vcpu'));
	                    }
	                }
	            },{
					title: ['SDP-JTN'],
	                type: 'line',
	                highlight: {
	                    size: 7,
	                    radius: 7
	                },
	                axis: 'left',
	                xField: 'report_id',
	                yField: ['SDP-JTN_used_vcpu'],
					tips: {
	                    trackMouse: true,
	                    width: 120,
	                    height: 40,
	                    renderer: function(storeItem, item) {
	                        this.setTitle(storeItem.get('report_alias') + ' - SDP-JTN');
	                        this.update(storeItem.get('SDP-JTN_used_vcpu'));
	                    }
	                }
	            },{
					title: ['SDP-STL'],
	                type: 'line',
	                highlight: {
	                    size: 7,
	                    radius: 7
	                },
	                axis: 'left',
	                xField: 'report_id',
	                yField: ['SDP-STL_used_vcpu'],
					tips: {
	                    trackMouse: true,
	                    width: 120,
	                    height: 40,
	                    renderer: function(storeItem, item) {
	                        this.setTitle(storeItem.get('report_alias') + ' - SDP-STL');
	                        this.update(storeItem.get('SDP-STL_used_vcpu'));
	                    }
	                }
	            }]
			}
        });

        this.callParent(arguments);
    }
});
