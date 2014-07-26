var App = require('../start.js'),
    
    FooterTmp = require('../templates/layouts/FooterView');

module.exports = Backbone.View.extend({
    template: FooterTmp,
    el: 'footer',
    events: {
        'click a': 'navigate',
        'update': 'onUpdate'
    },
    serialize: function() {
        if (this.model) {
            return this.model.toJSON() ;
        }
    },
    initialize: function() {
        this.activeTab = this.model.attributes.pageSlug;
    },
    afterRender: function() {
        this.makeActive(this.activeTab);
        console.log(this, this.serialize());
    },
    onUpdate: function() {

    },
    makeActive: function(activeTarget) {
        if (activeTarget === 'home') { activeTarget = '';}
        var target = $('footer .tab-item[href="#' + activeTarget + '"]');
        $('footer .active').removeClass('active');
        $(target).addClass('active');
    },
    navigate: function(e) {
        e.preventDefault();
        var target = e.target.hash;
        Backbone.history.navigate(target, true);
    }
});