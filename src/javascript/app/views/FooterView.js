var App = require('../start.js'),
    
    FooterTmp = require('../templates/layouts/FooterView');

module.exports = Backbone.View.extend({
    template: FooterTmp,
    el: 'footer',
    events: {
        'click a': 'navigate'
    },
    serialize: {},
    afterRender: function() {
    },
    navigate: function(e) {
        e.preventDefault();
        var target = e.target.hash;
        console.log("triggering navigate from footer");
        //App.router("router").navigate(target, {trigger: true});
        Backbone.history.navigate(target, true);
    }
});