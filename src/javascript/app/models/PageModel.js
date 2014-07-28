var App = require('../start.js'),
    Children = require('../collections/ChildrenCollection.js'),
    pageAdapter = require('../adapters/localstorage-pages.js');

module.exports = Backbone.Model.extend({

    initialize: function() {
        var model = this;
        model.set({nextSlide: {}});
        model.fetch({
            success: function(data) {
                model.updateNextSlide(data);
            }
        });
        model.save();
        App.Models.Instances[this.attributes.pageSlug] = this;
    },
    fetchChildren: function(collection){
        this.children = new Children();
        this.children.parent = this;
        this.children.fetch();
    },
    updateNextSlide: function(data) {
        var next = this.attributes.nextSlide,
            nextObj = {},
            model = this;

        next.id = this.id + 1;

        pageAdapter.findById(next.id)
            .done(function(data) {
                nextObj = data;
                next.slug = nextObj.pageSlug;
                next.title = nextObj.title;
            })
            .fail(function() {
                model.unset("nextSlide", {
                    silent: false
                });
            });
    },

    sync: function(method, model, options) {
        if (method === "read") {
            pageAdapter.findBySlug(this.attributes.pageSlug).done(function(data) {
                options.success(data);
            });
        }
    }

});