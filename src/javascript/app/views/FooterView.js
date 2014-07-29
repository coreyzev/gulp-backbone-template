var App = require('../start.js'),
    
    FooterTmp = require('../templates/layouts/FooterView');

module.exports = Backbone.View.extend({
    manage: true,
    template: FooterTmp,
    el: 'footer',
    events: {
        'click a': 'navClick',
        'update': 'onUpdate'
    },
    initialize: function(options) {
        this.undelegateEvents();
        if (!this.options.DNE) {
            this.activeTab = this.model.attributes.pageSlug;
        } else {
            this.activeTab = false;
        }
    },
    serialize: function() {
        var data = {};
        data["nav"] = [];
        App.collection("pages").each(function(model) {
            if (model.attributes.parentId === 0 && model.id > 1) {
                var y = model.attributes;
                data["nav"].push({hash: y.pageSlug, title: y.title});
            }
        });
        if (this.model) {
            data["model"] = this.model.toJSON();
        }
        return data;
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
    navClick: function(e) {
        e.preventDefault();
        var target = e.target;
        App.router("router").linkClick(target, true);
        console.log("navigate");
    }
});