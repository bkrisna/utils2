/**
 * @class Ext.app.PortalPanel
 * @extends Ext.panel.Panel
 * A {@link Ext.panel.Panel Panel} class used for providing drag-drop-enabled portal layouts.
 */
Ext.define('CImeetsExtJS.view.exautils.layout.TablePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tablepanel',

    requires: [
        'Ext.layout.container.Table',
        //'CImeetsExtJS.view.exautils.PortalDropZone',
        'CImeetsExtJS.view.exautils.layout.TableColumn'
    ],

    //cls: 'x-portal',
    //bodyCls: 'x-portal-body',
    //defaultType: 'tablecolumn',
    autoScroll: true,
    manageHeight: false,

    initComponent : function() {
        var me = this;

        // Implement a Container beforeLayout call from the layout to this Container
        this.layout = {
            type : 'table',
			columns: 3,
			tableAttrs: {
				style: {
					width: '100%',
				}
			},
			tdAttrs: {
				style: {
					valign: 'top',
					padding: '5px 5px 5px 5px',
				}
			}
		};
        this.callParent();
    }
});

