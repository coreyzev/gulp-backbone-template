var App = require('../start.js'),

    SliderPageTmp = require('../templates/SliderPageView');

module.exports = SliderPageView = Backbone.View.extend({
    manage: true,
    template: SliderPageTmp,
    tagName: 'article',
    className: 'page right',
    initialize: function () {
        if(this.model) {
            if (this.model.template) {
                this.template = this.model.template;
            }
            App.Views.Instances[this.model.attributes.pageSlug] = this;
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
        if (this.model.attributes.nextSlide) {
            this.options.nextModel = App.model(this.model.attributes.nextSlide.slug);
            this.options.nextPage = this.__manager__.parent.insertView('.sliderContent', new SliderPageView({ model: this.options.nextModel }));
            console.log("make next slide");
        }
        if (this.options.activeSlide) {
            if (this.model.attributes.nextSlide) {
                this.options.nextPage.render();
                this.pageSlide(this.options.nextPage.$el, this.options.nextPage);
            }
            this.pageSlide();
        }
        this.$el.attr('id',this.model.attributes.pageSlug);
    },
    pageSlide: function(nextSlide, nextSlideView) {
        var oldPages;
        if (this.model.attributes.nextSlide) {
            if (this.model.id == 1) {
                App.Utils.slider.slidePageFrom(this.$el, nextSlide, this, nextSlideView, 'left');
            } else {
                App.Utils.slider.slidePage(this.$el, nextSlide, this, nextSlideView);
                console.log("slide next slide");
            }
        } else {
            App.Utils.slider.slidePage(this.$el, false, this, false);
        }
    }
});