var App = require('../start.js'),

    DNEViewTmp = require('../templates/404View');

module.exports = Backbone.View.extend({
    template: DNEViewTmp,
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
        } else if (this.options.wrongHash) {
            return {wrongHash: this.options.wrongHash};
        } else {
            return {title: 'The Demo Slide' };
        }
    },
    afterRender: function() {
        App.Utils.slider.slidePage(this.$el);
        console.log('after slide render');
    }
});