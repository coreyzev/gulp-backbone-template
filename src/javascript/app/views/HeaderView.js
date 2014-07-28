var App = require('../start.js'),
    
    HeaderTmp = require('../templates/layouts/HeaderView');

module.exports = Backbone.View.extend({
    template: HeaderTmp,
    el: 'header',
    events: {
        
    },
    initialize: function() {
        this.companyName = "AppTastic";
    },
    serialize: function() {
        return this;
    },
    afterRender: function() {
    }
});