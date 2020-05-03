Ext.define('CImeetsExtJS.model.ReportModel', {
    extend: 'Ext.data.Model',
	
	fields: [{
        name: 'report_id',
        type: 'int'
    },{
        name: 'report_name',
        type: 'string'
    }],
    
    idProperty: 'report_id'
});