var App = require('../start.js'),

    NavChildTmp = require('../templates/SideNavChild');

module.exports = Backbone.View.extend({
    manage: true,
    template: NavChildTmp,
    tagName: 'li',
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