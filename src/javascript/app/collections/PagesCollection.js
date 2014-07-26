var App = require('../start.js'),
    Page = require('../models/PageModel'),
    pageAdapter = require('../adapters/localstorage-pages.js');

module.exports = Backbone.Collection.extend({

    model: Page,

    sync: function(method, model, options) {
        if (method === "read") {
            pageAdapter.findBySlug(options.data.name).done(function (data) {
                options.success(data);
            });
        }
    }

});