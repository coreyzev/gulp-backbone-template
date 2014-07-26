var App = require('../start.js'),
    Parents = require('../collections/ParentsCollection.js'),
    pageAdapter = require('../adapters/localstorage-pages.js');

module.exports = Backbone.Model.extend({

    initialize:function () {
        this.reports = new Parents();
        this.reports.parent = this;
    },


    sync: function(method, model, options) {
        if (method === "read") {
            pageAdapter.findBySlug(this.attributes.pageSlug).done(function (data) {
                options.success(data);
            });
        }
    }

});