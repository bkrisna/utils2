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
					xtype: 'button',
					iconCls: 'fam find',
					itemId: 'find',
					text: 'Select Report',
					action: 'loadreport'
				},{
					xtype: 'button',
					iconCls: 'fam save',
					itemId: 'save',
					text: 'Export to Excel',
					action: 'exportToExcel'
				}]
			}],
            
            items: [{
				xtype: 'exautils-tab',
				region: 'center'
			}]
        });

        this.callParent(arguments);
    }
});