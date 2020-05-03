Ext.define('CImeetsExtJS.store.ReportStore', {
    extend: 'Ext.data.Store',
    model: 'CImeetsExtJS.model.ReportModel',
    autoLoad: true,
	//buffered: true,
	remoteFilter: true,
	
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
		simpleSortMode: true,
		filterParam: 'query',
		encodeFilters: function(filters) {
            return filters[0].value;
        }
    }
});
