var App = require('../start.js'),

    //Child Views
    ParentWrapper = require('./SideNavParentWrapper'),

    InnerParentTmp = require('../templates/SideNavInnerParent');

module.exports = Backbone.View.extend({
    template: InnerParentTmp,
    el: 'li',
    className: 'icon icon-left-nav',
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