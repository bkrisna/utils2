Ext.define('CImeetsExtJS.view.exautils.sdpjtn.SdpJtnVcpuPanel', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.sdpjtnvcpuutils',

    requires: [
		'Ext.data.JsonStore',
        'Ext.chart.theme.Base',
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
				store: 'SdpJtnUtilStore',
	            legend: {
	                position: 'bottom'
	            },
	            axes: [{
	                type: 'Numeric',
	                position: 'bottom',
	                fields: ['used_vcpu_pct','free_vcpu_pct'],
	                title: false,
	                grid: true,
	                label: {
	                    renderer: function(v) {
	                        return String(v);
	                    }
	                }
	            }, {
	                type: 'Category',
	                position: 'left',
	                fields: ['hostalias'],
	                title: false
	            }],
	            series: [{
					title: ['Used vCPU', 'Free vCPU'],
	                type: 'bar',
	                axis: 'bottom',
	                gutter: 80,
	                xField: 'hostname',
	                yField: ['used_vcpu_pct', 'free_vcpu_pct'],
	                stacked: true,
					label: {
		                contrast: true,
		                display: 'insideEnd',
		                field: ['used_vcpu', 'free_vcpu'],
		                color: '#000',
		                'text-anchor': 'middle'
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
