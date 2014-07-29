var App = require('../start.js'),
    Children = require('../collections/ChildrenCollection.js'),
    pageAdapter = require('../adapters/localstorage-pages.js');

module.exports = Backbone.Model.extend({

    idAttribute: 'id',
    defaults: {
        hasChildren: false,
        hasSubChildren: false
    },
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
    fetchChildren: function(){
        var deferred = $.Deferred(),
            model = this,
            results = App.collection("pages").filter(function (element) {
                return model.id === element.attributes.parentId;
            });
        if (results.length) {
            deferred.resolve(results);
        } else {
            deferred.reject();
        }
        deferred.promise().done(function(data){
            model.children = new Children(data);
            model.children.parent = model;
            model.set({hasChildren: true});
        });
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