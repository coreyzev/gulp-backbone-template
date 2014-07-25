var App = require('../start.js'),
    
    ContentTmp = require('../templates/layouts/ContentView');

module.exports = Backbone.View.extend({
    template: ContentTmp,
    el: '#content',
    events: {
        
    },
    serialize: {},
    afterRender: function() {
    }
});