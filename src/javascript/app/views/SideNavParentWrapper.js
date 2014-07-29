var App = require('../start.js'),

    //Child Views
    InnerParent = require('./SideNavInnerParent'),
    NavChild = require('./SideNavChild'),

    ParentWrapperTmp = require('../templates/SideNavParentWrapper');

module.exports = Backbone.View.extend({
    template: ParentWrapperTmp,
    el: 'div',
    className: 'mp-level',
    serialize: {},
    buildNav: function(){
        /*
        var layout = this;
        App.collection("pages").each(function(model) {
            if (model.attributes.parentId === 0 && model.id > 1) {
                var y = model.attributes;
                if (y.hasChildren) {
                    layout.setView(new ParentWrapper(y.toJson()));

                }
                data["nav"].push({hash: y.pageSlug, title: y.title});
            }
        });
        */
    }
});