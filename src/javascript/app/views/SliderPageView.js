var App = require('../start.js'),
    
    SliderPageTmp = require('../templates/SliderPageView');

module.exports = Backbone.View.extend({
    template: SliderPageTmp,
    events: {
        
    },
    serialize: {},
    afterRender: function() {
        App.Utils.slider.slidePage(this.$el);
        this.$el.on("webkitTransitionEnd", function() {
            alert("slide in done");
        });
    }
});