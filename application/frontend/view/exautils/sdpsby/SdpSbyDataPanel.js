Ext.define('CImeetsExtJS.view.exautils.sdpsby.SdpSbyDataPanel', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.sdpsbydata',

    requires: [
        'Ext.data.JsonStore'
    ],

    initComponent: function(){

        Ext.apply(this, {
            //height: 300,
            height: this.height,
            store: 'SdpSbyDataStore',
            stripeRows: true,
            columnLines: true,
            columns: [{
				id: 'sdpsby-id',
            	dataIndex: 'id',
				hidden: true
            },{
                text   : 'Compute Node',
                flex: 1,
                sortable : true,
                dataIndex: 'hostname'
            },{
                text   : 'VM Name',
                flex: 1,
                dataIndex: 'vmname'
            },{
                text   : 'vCPU',
                dataIndex: 'vcpu',
				align: 'center',
            },{
                text   : 'Memory',
                dataIndex: 'memory',
				align: 'center'
            },{
                text   : 'OS',
                dataIndex: 'os'
            },{
                text   : 'OS Storage',
                dataIndex: 'osstor',
				align: 'center'
            },{
                text   : 'Attached Storage',
                dataIndex: 'attachedstor',
				align: 'center'
            },{
                text   : 'IP Address',
                dataIndex: 'ipaddress'
            },{
                text   : 'VM Hostname',
				flex: 1,
                dataIndex: 'vmhostname'
            }]
        });

        this.callParent(arguments);
    }
});
