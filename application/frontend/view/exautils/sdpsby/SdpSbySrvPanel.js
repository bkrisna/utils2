Ext.define('CImeetsExtJS.view.exautils.sdpsby.SdpSbySrvPanel', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.sdpsbysrvpanel',

    requires: [
        'Ext.data.JsonStore'
    ],

    initComponent: function(){

        Ext.apply(this, {
            height: 300,
            store: 'SdpSbyUtilStore',
            stripeRows: true,
            columnLines: true,
            columns: [{
				dataIndex: 'box_id',
				hidden: true
            },{
                text   : 'Compute Node',
                flex: 1,
                sortable : true,
                dataIndex: 'hostname',
				flex: 1
            },{
                text   : 'Available VCPU',
                dataIndex: 'free_vcpu',
				align: 'center'
            },{
                text   : 'Available Mem',
                dataIndex: 'free_mem',
				align: 'center'
            }]
        });

        this.callParent(arguments);
    }
});
