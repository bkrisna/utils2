Ext.define('CImeetsExtJS.store.ReportStore', {
    extend: 'Ext.data.Store',
    model: 'CImeetsExtJS.model.ReportModel',
    autoLoad: true
	//remoteSort: true,
    //pageSize: 45,
    /*sorters: [{
		property: 'box_id',
		direction: 'desc'
    }]*/
});
