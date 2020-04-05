Ext.define('CImeetsExtJS.model.SdpJtnUtilModel', {
    extend: 'Ext.data.Model',
	
	fields: [{
        name: 'report_id',
        type: 'int'
    },{
        name: 'box_id',
        type: 'int'
    },{
        name: 'server_id',
        type: 'int'
    },{
        name: 'hostname',
        type: 'string'
    },{
        name: 'hostalias',
        type: 'string'
    },{
        name: 'total_vcpu',
        type: 'int'
    },{
        name: 'used_vcpu',
        type: 'int'
    },{
        name: 'used_vcpu_pct',
        type: 'int'
    },{
        name: 'free_vcpu',
        type: 'int'
    },{
        name: 'free_vcpu_pct',
        type: 'int'
    },{
        name: 'total_mem',
        type: 'int'
    },{
        name: 'used_mem',
        type: 'int'
    },{
        name: 'used_mem_pct',
        type: 'int'
    },{
        name: 'free_mem',
        type: 'int'
    },{
        name: 'free_mem_pct',
        type: 'int'
    }],
    
    idProperty: 'server_id',
    
    proxy: {
        type: 'custProxy',
        api: {
            read: 'exautils/get_sdp_jtn_util',
        },
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'total',
            successProperty: 'success'
        },
    }
});