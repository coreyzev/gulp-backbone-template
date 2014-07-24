var App = require('../start.js'),
    MasterView = require('./MasterView'),
    MainView = require('../templates/MainView');

module.exports = MasterView.extend({
    template: MainView,
    events: {
        
    },
    initialize: function() {
        return this.render();
    },
    afterRender: function() {
        require('sidebars');
        new mlPushMenu(
            document.getElementById('mp-menu'),
            document.getElementById('nav-trigger')
        );
    }
});