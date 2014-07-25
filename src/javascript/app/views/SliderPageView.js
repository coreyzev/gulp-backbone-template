var App = require('../start.js'),
    
    SliderPageTmp = require('../templates/SliderPageView');

module.exports = Backbone.View.extend({
    template: SliderPageTmp,
    events: {
        
    },
    serialize: {},
    afterRender: function() {
        App.Utils.slider.slidePage(this.$el);
        console.log("slider rendered");
    }
});