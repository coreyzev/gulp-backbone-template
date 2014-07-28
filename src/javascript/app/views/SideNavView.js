var App = require('../start.js'),
    
    SideNavTmp = require('../templates/layouts/SideNavView');

module.exports = Backbone.View.extend({
    template: SideNavTmp,
    el: '#mp-menu',
    events: {
        
    },
    serialize: {},
    afterRender: function() {
        require('sidebars');
        new mlPushMenu(
            document.getElementById('mp-menu'),
            document.getElementById('nav-trigger')
        );
    }
});