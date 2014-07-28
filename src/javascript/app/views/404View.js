var App = require('../start.js'),

    DNEViewTmp = require('../templates/404View');

module.exports = Backbone.View.extend({
    template: DNEViewTmp,
    initialize: function () {

    },
    events: {

    },
    serialize: function() {
        return {wrongHash: this.options.wrongHash};
    },
    afterRender: function() {
        App.Utils.slider.slidePage(this.$el);
        console.log('after slide render');
    }
});