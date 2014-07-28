var App = require('../start.js'),

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
    afterRender: function() {
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