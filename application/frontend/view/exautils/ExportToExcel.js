Ext.define('CImeetsExtJS.view.exautils.ExportToExcel' ,{
    extend: 'Ext.window.Window',
	
	alias : 'widget.export-excel',
	border: false,
	id: 'exportExcel',
	
	//layout: 'fit',
    closable: true,
	width: 400,
    resizable: false,
    border: false,
	
	title: 'Export to Excel',
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
            text: 'Export Report',
            //iconCls: 'fam door',
            action: 'exportReport'
        }]
	}],
	
	initComponent: function() {
		Ext.apply(this, {
			items: [{
				xtype: 'form',
				layout: 'form',
				border: false,
				bodyPadding: 10,
			    fieldDefaults: {
					msgTarget: 'side',
					labelWidth: 75
				},
				defaultType: 'textfield',
				items: [{
		            fieldLabel: 'Report ID',
		            name: 'report_id',
		            allowBlank: false,
					readOnly: true
		        },{
		            fieldLabel: 'Report Name',
		            name: 'report_name',
		            allowBlank: false,
					readOnly: true
		        }]
			}]
        });
		
		this.callParent(arguments);
	}
});