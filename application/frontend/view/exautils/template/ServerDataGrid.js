Ext.define('CImeetsExtJS.view.exautils.template.ServerDataGrid', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.serverdatagrid',
	store: '',

    requires: [
        'Ext.data.JsonStore'
    ],

    initComponent: function(){

        Ext.apply(this, {
            height: this.height,
            store: this.store,
            stripeRows: true,
            columnLines: true,
            columns: [{
            	id: 'jtn-id',
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
