var App = require('../start.js'),
    
    HeaderTmp = require('../templates/layouts/HeaderView');

module.exports = Backbone.View.extend({
    template: HeaderTmp,
    el: 'header',
    events: {
        
    },
    serialize: {},
    afterRender: function() {
    }
});