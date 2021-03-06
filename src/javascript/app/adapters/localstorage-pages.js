var App = require('../start.js');

module.exports = (function () {

    console.log("Loading localstorage adapter module");

    var findById = function (id) {

            var deferred = $.Deferred(),
                pages = JSON.parse(window.localStorage.getItem("pages")),
                page = null,
                l = pages.length;

            for (var i = 0; i < l; i++) {
                if (pages[i].id === id) {
                    page = pages[i];
                    break;
                }
            }

            if (page) {
                deferred.resolve(page);
            } else {
                deferred.reject();
            }
            return deferred.promise();
        },

        findBySlug = function (searchKey) {
            var deferred = $.Deferred(),
                pages = JSON.parse(window.localStorage.getItem("pages")),
                results = pages.filter(function (element) {
                    return element.pageSlug.toLowerCase() == searchKey.toLowerCase();
                });

            if (results.length) {
                deferred.resolve(results[0]);
            } else {
                deferred.reject();
            }
            return deferred.promise();
        },

        findByParent = function (parentId) {
            var deferred = $.Deferred(),
                pages = JSON.parse(window.localStorage.getItem("pages")),
                results = pages.filter(function (element) {
                    return parentId === element.parentId;
                });
            if (results.length) {
                deferred.resolve(results);
            } else {
                deferred.reject();
            }
            return deferred.promise();
        };


    //CURRENTLY, we're managing the nesting and breadcrumbs using the slug you see here, breaking the string at the slash, and parsing the names.
    // Stop doing that, you can do better, just use the parent IDs, or find a way to write ID's with period seperators.

    // Store sample data in Local Storage
    window.localStorage.setItem("pages", JSON.stringify(
        [
            {id: 1, pageSlug: "home", parentId: 0, title: "The Home Page", template: "", postRender: "", addonIDs: []},

            {id: 2, pageSlug: "lorem", parentId: 0, title: "Lorem", template: "", postRender: "", addonIDs: []},
            {id: 3, pageSlug: "lorem/dolor", parentId: 2, title: "Dolor", template: "", postRender: "", addonIDs: []},
            {id: 4, pageSlug: "lorem/dolor/sit", parentId: 3, title: "Sit", template: "", postRender: "", addonIDs: []},
            {id: 5, pageSlug: "lorem/dolor/ipsum", parentId: 3, title: "Ipsum", template: "", postRender: "", addonIDs: []},
            {id: 6, pageSlug: "lorem/consectetur", parentId: 2, title: "Consectetur", template: "", postRender: "", addonIDs: []},
            {id: 7, pageSlug: "lorem/consectetur/adipiscing", parentId: 6, title: "Adipiscing", template: "", postRender: "", addonIDs: []},
            {id: 8, pageSlug: "lorem/consectetur/adipiscing/elit", parentId: 7, title: "Elit", template: "", postRender: "", addonIDs: []},

            {id: 9, pageSlug: "donec", parentId: 0, title: "Donec", template: "", postRender: "", addonIDs: []},
            {id: 10, pageSlug: "donec/consequat", parentId: 9, title: "Consequat", template: "", postRender: "", addonIDs: []},
            {id: 11, pageSlug: "donec/consequat/imperdiet", parentId: 10, title: "Imperdiet", template: "", postRender: "", addonIDs: []},

            {id: 12, pageSlug: "sodales", parentId: 0, title: "Sodales", template: "", postRender: "", addonIDs: []},

            {id: 13, pageSlug: "mauris", parentId: 0, title: "Mauris", template: "", postRender: "", addonIDs: []},

            {id: 14, pageSlug: "rhoncus", parentId: 0, title: "Rhoncus", template: "", postRender: "", addonIDs: []},
        ]
    ));

        // The public API
    return {
        findById: findById,
        findBySlug: findBySlug,
        findByParent: findByParent
    };


}());