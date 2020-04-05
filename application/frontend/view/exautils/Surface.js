Ext.define('CImeetsExtJS.view.exautils.Surface', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.exautils-surface',
    
    initComponent: function() {
        Ext.apply(this, {
            id: 'exautils-surface',
            layout: 'border',
            border: true,
            bodyPadding: 0,
			
			title: 'Exalogic Utilization Report',
			
			dockedItems: [{
				xtype: 'toolbar',
				items: [{
	                xtype: 'combo',
					width: 400,
	                fieldLabel: 'Report Period',
	                store: Ext.create('CImeetsExtJS.store.ReportStore'),
	                minChars : 0 ,
	                displayField: 'report_name',
	                valueField: 'report_id',
					blankText: 'Select Report Period',
					emptyText: '-- Select Report Period --',
					allowBlank: false,
					editable: false,
	            },'-',{
					xtype: 'button',
					iconCls: 'fam find',
					itemId: 'find',
					text: 'Load Report',
					action: 'loadreport'
				},]
			}],
            
            items: [{
				xtype: 'exautils-tab',
				region: 'center'
			}]
        });

        this.callParent(arguments);
    }
});