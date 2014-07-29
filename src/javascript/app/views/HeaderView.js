var App = require('../start.js'),
    
    HeaderTmp = require('../templates/layouts/HeaderView');

module.exports = Backbone.View.extend({
    manage: true,
    template: HeaderTmp,
    el: 'header',
    events: {
        
    },
    initialize: function() {
        this.companyName = "AppTastic";
    },
    serialize: function() {
        var data = {};
        if (this.model && this.model.id > 1) {
            data["crumbs"] = {};
            if (this.model.attributes.parent ) {
                var parent = this.model.attributes.parent;

                if (App.model(parent.pageSlug).attributes.parent) {
                    var grandpa = App.model(parent.pageSlug).attributes.parent;
                    
                    if (App.model(grandpa.pageSlug).attributes.parent) {
                        var greatGran = App.model(grandpa.pageSlug).attributes.parent;
                        data["crumbs"]["greatGran"] = {hash: greatGran.pageSlug, title: greatGran.title};
                    }
                    data["crumbs"]["grandpa"] = {hash: grandpa.pageSlug, title: grandpa.title};
                }
                data["crumbs"]["parent"] = {hash: parent.pageSlug, title: parent.title};
            }
            data["crumbs"]["title"] = {title: this.model.attributes.title};
        }
        data["companyName"] = this.companyName;
        return data;
    },
    afterRender: function() {
    }
});