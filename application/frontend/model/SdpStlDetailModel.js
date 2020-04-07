Ext.define('CImeetsExtJS.model.SdpStlDetailModel', {
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
        type: 'decimal'
    },{
        name: 'free_mem',
        type: 'int'
    },{
        name: 'free_mem_pct',
        type: 'decimal'
    },{
        name: 'total_zfssa',
        type: 'int'
    },{
        name: 'used_zfssa',
        type: 'int'
    },{
        name: 'used_zfssa_pct',
        type: 'decimal'
    },{
        name: 'free_zfssa',
        type: 'int'
    },{
        name: 'free_zfssa_pct',
        type: 'decimal'
    }],
    
    idProperty: 'box_id',
    
    proxy: {
        type: 'custProxy',
        api: {
            read: 'exautils/get_box_detail/3',
        },
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'total',
            successProperty: 'success'
        },
    }
});