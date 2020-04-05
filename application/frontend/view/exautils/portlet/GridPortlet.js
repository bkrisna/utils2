Ext.define('CImeetsExtJS.view.exautils.portlet.GridPortlet', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.gridportlet',

    requires: [
        'Ext.data.JsonStore',
        'Ext.chart.theme.Base',
        'Ext.chart.series.Series',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric'
    ],

    initComponent: function(){

        var store = Ext.create('Ext.data.ArrayStore', {
            fields: [
               {name: 'company'},
               {name: 'change',     type: 'float'},
               {name: 'pctChange',  type: 'float'}
            ],
            data: this.myData
        });

        Ext.apply(this, {
            //height: 300,
            height: this.height,
            store: store,
            stripeRows: true,
            columnLines: true,
            columns: [{
                id       :'company',
                text   : 'Company',
                //width: 120,
                flex: 1,
                sortable : true,
                dataIndex: 'company'
            },{
                text   : 'Change',
                width    : 75,
                sortable : true,
                dataIndex: 'change'
            },{
                text   : '% Change',
                width    : 75,
                sortable : true,
                dataIndex: 'pctChange'
            }]
        });

        this.callParent(arguments);
    }
});
