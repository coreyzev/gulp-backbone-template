var App = require('../start.js'),

    SliderPageTmp = require('../templates/SliderPageView');

module.exports = Backbone.View.extend({
    manage: true,
    template: SliderPageTmp,
    initialize: function () {
        if(this.model) {
            if (this.model.template) {
                this.template = this.model.template;
            }
        }
    },
    events: {

    },
    serialize: function() {
        if (this.model) {
            return this.model.toJSON() ;
        } else {
            return {title: 'The Demo Slide' };
        }
    },
    afterRender: function() {
        if (this.model.id == 1) {
            App.Utils.slider.slidePageFrom(this.$el, 'left');/*
        } else if ( this.model.id + 1 == this.model.attributes.nextSlide.id) {
            App.Utils.slider.slidePageFrom(this.$el, 'right'); */
        } else {
            App.Utils.slider.slidePage(this.$el);
        }
        console.log('after slide render');
    }
});