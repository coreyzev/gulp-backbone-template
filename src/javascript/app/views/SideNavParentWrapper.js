var App = require('../start.js'),

    //Child Views
    InnerParent = require('./SideNavInnerParent'),
    NavChild = require('./SideNavChild'),

    Pages = require('../collections/PagesCollection'),

    ParentWrapperTmp = require('../templates/SideNavParentWrapper');

module.exports = Backbone.Layout.extend({
    manage: true,
    template: ParentWrapperTmp,
    tagName: 'div',
    className: 'mp-level',
    serialize: function() {
        if (this.model) {
            return this.model.toJSON();
        }
    },
    beforeRender: function() {
        this.collection.each(function(model){
            var y = model.toJSON();
            if (y.hasChildren) {
                var data = new Pages(model.children.models);
                this.insertView('.table-view', new InnerParent({model: model, serialize: y, collection: data})).render();
            } else {
                this.insertView('.table-view', new NavChild({serialize: y})).render();
            }
        }, this);
    }
});