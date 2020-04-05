Ext.define('CImeetsExtJS.model.ReportModel', {
    extend: 'Ext.data.Model',
	
	fields: [{
        name: 'report_id',
        type: 'int'
    },{
        name: 'report_name',
        type: 'string'
    }],
    
    idProperty: 'report_id',
    
    proxy: {
        type: 'custProxy',
        api: {
            read: 'exautils/get_report_list',
        },
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'total',
            successProperty: 'success'
        },
    }
});