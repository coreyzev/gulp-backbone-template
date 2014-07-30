var App = require('../start.js'),

    //Child Views
    //ParentWrapper = require('./SideNavParentWrapper'),

    InnerParentTmp = require('../templates/SideNavInnerParent');

module.exports = Backbone.Layout.extend({
    manage: true,
    template: InnerParentTmp,
    tagName: 'li',
    className: 'icon icon-left-nav',
    serialize: function() {
        return this.model.toJSON();
    },
    beforeRender: function() {
        this.insertView( new App.Views.ParentWrapper({model: this.model, collection: this.collection})).render();
    }
});