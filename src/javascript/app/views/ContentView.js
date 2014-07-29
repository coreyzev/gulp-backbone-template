var App = require('../start.js'),

    SliderPageView = require('./SliderPageView'),
    
    ContentTmp = require('../templates/layouts/ContentView');
    
require('pageslider');

module.exports = Backbone.Layout.extend({
    template: ContentTmp,
    //el: '#content',
    events: {
        
    },
    beforeRender: function() {
        this.insertView('.sliderContent', new SliderPageView({model: App.model('home')})).render();
    }
});