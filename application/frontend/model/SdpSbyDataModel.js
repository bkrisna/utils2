Ext.define('CImeetsExtJS.model.SdpSbyDataModel', {
    extend: 'Ext.data.Model',
	
	fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'hostname',
        type: 'string'
    },{
        name: 'vmname',
        type: 'string'
    },{
        name: 'vcpu',
        type: 'int'
    },{
        name: 'memory',
        type: 'int'
    },{
        name: 'os',
        type: 'string'
    },{
        name: 'osstor',
        type: 'int'
    },{
        name: 'attachedstor',
        type: 'int'
    },{
        name: 'ipaddress',
        type: 'string'
    },{
        name: 'vmhostname',
        type: 'string'
    },{
        name: 'state',
        type: 'int'
    }],
    
    idProperty: 'id',
    
    proxy: {
        type: 'custProxy',
        api: {
            read: 'exautils/get_box_data/1',
        },
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'total',
            successProperty: 'success'
        },
    }
});