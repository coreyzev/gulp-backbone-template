var App = require('../start.js'),
    
    FooterTmp = require('../templates/layouts/FooterView');

module.exports = Backbone.View.extend({
    template: FooterTmp,
    el: 'footer',
    events: {
        
    },
    serialize: {},
    afterRender: function() {
    }
});