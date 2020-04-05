/**
 * @class Ext.app.PortalColumn
 * @extends Ext.container.Container
 * A layout column class used internally be {@link Ext.app.PortalPanel}.
 */
Ext.define('CImeetsExtJS.view.exautils.layout.TableColumn', {
    extend: 'Ext.container.Container',
    alias: 'widget.tablecolumn',

    requires: [
        'Ext.layout.container.Anchor',
        'CImeetsExtJS.view.exautils.portlet.Portlet'
    ],

    layout: 'anchor',
    defaultType: 'portlet',
    cls: 'x-portal-column'

    // This is a class so that it could be easily extended
    // if necessary to provide additional behavior.
});