Ext.define('CImeetsExtJS.model.CrmUtilsHistModel', {
    extend: 'Ext.data.Model',
	
	fields: [{
        name: 'report_id',
        type: 'int'
    },{
        name: 'box_id',
        type: 'int'
    },{
        name: 'box_name',
        type: 'string'
    },{
        name: 'box_alias',
        type: 'string'
    },{
        name: 'total_vcpu',
        type: 'int'
    },{
        name: 'used_vcpu',
        type: 'int'
    },{
        name: 'free_vcpu',
        type: 'int'
    },{
        name: 'total_mem',
        type: 'int'
    },{
        name: 'used_mem',
        type: 'int'
    },{
        name: 'free_mem',
        type: 'int'
    },{
        name: 'total_zfssa',
        type: 'int'
    },{
        name: 'used_zfssa',
        type: 'int'
    },{
        name: 'free_zfssa',
        type: 'int'
    }],
    
    idProperty: 'box_id',
    
    proxy: {
        type: 'custProxy',
        api: {
            read: 'exautils/get_crm_utils_hist',
        },
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'total',
            successProperty: 'success'
        },
    }
});