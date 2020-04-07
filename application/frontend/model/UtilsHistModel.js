Ext.define('CImeetsExtJS.model.UtilsHistModel', {
    extend: 'Ext.data.Model',
	
	fields: [{
		name: "report_id",
		type: 'int'
    },{
		name: "report_alias",
		type: 'string'
    },{
		name: "SDP-SB_used_vcpu",
		type: 'int'
    },{
		name: "SDP-SB_used_mem",
		type: 'int'
    },{
		name: "SDP-SB_used_zfssa",
		type: 'int'
    },{
		name: "SDP-JTN_used_vcpu",
		type: 'int'
    },{
		name: "SDP-JTN_used_mem",
		type: 'int'
    },{
		name: "SDP-JTN_used_zfssa",
		type: 'int'
    },{
		name: "SDP-STL_used_vcpu",
		type: 'int'
    },{
		name: "SDP-STL_used_mem",
		type: 'int'
    },{
		name: "SDP-STL_used_zfssa",
		type: 'int'
    },{
		name: "CRM-JTN_used_vcpu",
		type: 'int'
    },{
		name: "CRM-JTN_used_mem",
		type: 'int'
    },{
		name: "CRM-JTN_used_zfssa",
		type: 'int'
    },{
		name: "CRM-STL_used_vcpu",
		type: 'int'
    },{
		name: "CRM-STL_used_mem",
		type: 'int'
    },{
		name: "CRM-STL_used_zfssa",
		type: 'int'
	}],
    
    idProperty: 'report_id',
    
    proxy: {
        type: 'custProxy',
        api: {
            read: 'exautils/get_exa_utils_hist',
        },
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'total',
            successProperty: 'success'
        },
    }
});