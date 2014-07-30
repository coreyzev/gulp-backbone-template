var App = require('../start.js'),

    DNEViewTmp = require('../templates/404View');

module.exports = Backbone.View.extend({
    manage: true,
    template: DNEViewTmp,
    tagName: 'article',
    className: function () {
        return 'page center ' + this.options.wrongHash;
    },
    initialize: function () {
        App.Views.Instances[this.el] = this;
        this.activeSlide = false;
    },
    events: {

    },
    serialize: function() {
        return {wrongHash: this.options.wrongHash};
    },
    afterRender: function() {
        if (this.hasRendered) {
            this.pageSlide();
        }
    },
    pageSlide: function() {
        App.Utils.slider.slidePage(this.$el, false, this, false);
        console.log('after slide render');
    }
});