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
    initialize: function(options) {
        this.undelegateEvents();
        if (!this.options.DNE) {
            this.activeTab = this.model.attributes.pageSlug;
        } else {
            this.activeTab = false;
        }
    },
    afterRender: function() {
        this.makeActive(this.activeTab);
    },
    onUpdate: function() {

    },
    makeActive: function(activeTarget) {
        if (activeTarget) {
            if (activeTarget === 'home') { activeTarget = '';}
            var target = $('footer .tab-item[href="#' + activeTarget + '"]');
            $('footer .active').removeClass('active');
            $(target).addClass('active');
        } else {
            $('footer .active').removeClass('active');
        }
    },
    navigate: function(e) {
        e.preventDefault();
        var target = e.target;
        App.router("router").linkClick(target, true);
        console.log("navigate");
    }
});