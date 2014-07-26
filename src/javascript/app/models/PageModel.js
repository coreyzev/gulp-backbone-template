var App = require('../start.js'),
    Parents = require('../collections/ParentsCollection.js'),
    pageAdapter = require('../adapters/localstorage-adapter.js');

module.exports = Backbone.Model.extend({

    defaults: {
        nextSlide: {
            id: 1,
            slug: '',
            title: ''
        }
    },

    initialize:function () {
        this.reports = new Parents();
        this.reports.parent = this;
        this.on("change", function() {
            var next = this.attributes.nextSlide,
                nextObj = pageAdapter.findById(next.id);
            next.id = this.id + 1;
            next.slug = nextObj.pageSlug;
            next.title = nextObj.title;
        });
    },


    sync: function(method, model, options) {
        if (method === "read") {
            pageAdapter.findBySlug(this.attributes.pageSlug).done(function (data) {
                options.success(data);
            });
        }
    }

});