Ext.define('CImeetsExtJS.view.exautils.sdpjtn.SdpJtnSrvPanel', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.sdpjtnsrvpanel',

    requires: [
        'Ext.data.JsonStore'
    ],

    initComponent: function(){

        Ext.apply(this, {
            height: this.height,
            store: 'SdpJtnUtilStore',
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
