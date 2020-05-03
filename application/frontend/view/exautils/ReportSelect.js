Ext.define('CImeetsExtJS.view.exautils.ReportSelect' ,{
    extend: 'Ext.window.Window',
	
	alias : 'widget.report-select',
	border: false,
	id: 'reportSelect',
	
	layout: 'fit',
    closable: true,
	width: 350,
	height: 250,
    resizable: false,
    border: false,
	
	title: 'Select Report to Generate',
	modal: true,
	
	
	dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: ['->',{
            xtype: 'button',
            text: 'Cancel',
            //iconCls: 'fam door',
            action: 'cancelBtn'
        },{
            xtype: 'button',
            text: 'Load Report',
            //iconCls: 'fam door',
            action: 'loadReport'
        }]
	}],
	
	initComponent: function() {
		Ext.apply(this, {
			items: [{
				xtype: 'gridpanel',
				border: false,
				store: 'ReportStore',
	            stripeRows: true,
	            columnLines: true,
				loadMask: true,
		        dockedItems: [{
		            dock: 'top',
		            xtype: 'toolbar',
		            items: [{
						xtype: 'searchfield',
						store: 'ReportStore',
		                width: 337,
		                fieldLabel: 'Search',
		                labelWidth: 50
		            }]
		        }],
		        multiSelect: false,
	            columns: [{
					dataIndex: 'report_id',
					hidden: true
	            },{
	                text   : 'Report Name',
	                flex: 1,
	                sortable : false,
	                dataIndex: 'report_name',
					flex: 1
	            }]
			}]
        });
		
		this.callParent(arguments);
	}
});