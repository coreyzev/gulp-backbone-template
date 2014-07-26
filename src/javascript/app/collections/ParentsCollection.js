var App = require('../start.js'),
    Page = require('../models/PageModel'),
    pageAdapter = require('../adapters/localstorage-adapter.js');

module.exports = Backbone.Collection.extend({

    model: Page,

    sync: function(method, model, options) {
        if (method === "read") {
            console.log("find by parent");
            pageAdapter.findByParent(this.parent.id).done(function (data) {
                options.success(data);
            });
        }
    }

});