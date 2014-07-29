var App = require('../start.js'),

    //Child Views
    ParentWrapper = App.Views.ParentWrapper = require('./SideNavParentWrapper'),
    InnerParent = App.Views.InnerParent = require('./SideNavInnerParent'),
    NavChild = App.Views.NavChild = require('./SideNavChild'),

    Pages = require('../collections/PagesCollection'),

    SideNavTmp = require('../templates/layouts/SideNavView');

module.exports = Backbone.Layout.extend({
    manage: true,
    template: SideNavTmp,
    //el: '#mp-menu',
    events: {
        'click a': 'navClick'
    },
    initialize: function() {
        this.collection = App.collection("pages");
    },
    serialize: {},
    navClick: function(e) {
        e.preventDefault();
        var target = e.target;
        App.router("router").linkClick(target, true);
        console.log("navigate");
    },
    beforeRender: function() {
        var layout = this;
        this.collection.each(function(model, index, context) {
            if (model.attributes.parentId === 0 && model.id > 1) {
                var y = model.toJSON();
                var data = this.collection.filter(function (elem) {
                    return model.id === elem.attributes.parentId;
                });
                data = new Pages(data);
                if (y.hasChildren) {
                    this.insertView('.table-view', new InnerParent({model:model, serialize: y, collection: data})).render();
                } else {
                    this.insertView('.table-view', new NavChild({serialize: y})).render();
                }
            }
        }, this);
    },
    afterRender: function() {
        console.log('after render');
        //this.buildNav();
        require('sidebars');
        new mlPushMenu(
            document.getElementById('mp-menu'),
            document.getElementById('nav-trigger')
        );
        if ($('#mp-pusher').hasClass('mp-pushed')) {
            $('#mp-pusher').click().promise().done(function() {
                if ($('#mp-pusher').hasClass('mp-pushed')) {
                    var touch = document.createEvent('TouchEvent');
                    touch.initTouchEvent('touchstart', true, true);
                    document.getElementById('mp-pusher').dispatchEvent(touch);
                }
            });
        }
    }
});