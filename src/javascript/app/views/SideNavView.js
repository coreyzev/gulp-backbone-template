var App = require('../start.js'),

    //Child Views
    ParentWrapper = require('./SideNavParentWrapper'),
    InnerParent = require('./SideNavInnerParent'),
    NavChild = require('./SideNavChild'),

    SideNavTmp = require('../templates/layouts/SideNavView');

module.exports = Backbone.View.extend({
    template: SideNavTmp,
    el: '#mp-menu',
    events: {
        'click a': 'navClick'
    },
    serialize: {},
    navClick: function(e) {
        e.preventDefault();
        var target = e.target;
        App.router("router").linkClick(target, true);
        console.log("navigate");
    },
    buildNav: function(){
        var layout = this;
        App.collection("pages").each(function(model) {
            if (model.attributes.parentId === 0 && model.id > 1) {
                var y = model.toJSON();
                if (y.hasChildren) {
                    layout.setView(new ParentWrapper({serialize: y})).render();
                    console.log("debug parent wrapper");
                } else {
                    layout.setView(new NavChild({serialize: y})).render();
                    console.log("debug nav child");
                }
            }
        });
    },
    afterRender: function() {
        this.buildNav();
        require('sidebars');
        new mlPushMenu(
            document.getElementById('mp-menu'),
            document.getElementById('nav-trigger')
        );
        if ($('#mp-pusher').hasClass('mp-pushed')) {
            $('#mp-pusher').click().promise().done(function(){
                if ($('#mp-pusher').hasClass('mp-pushed')) {
                    var touch = document.createEvent('TouchEvent');
                    touch.initTouchEvent('touchstart', true, true);
                    document.getElementById('mp-pusher').dispatchEvent(touch);
                }
            });
        }
    }
});