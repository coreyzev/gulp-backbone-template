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

            deferred.resolve(page);
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
                deferred.reject(null);
            }
            return deferred.promise();
        },

        findByParent = function (parentId) {
            var deferred = $.Deferred(),
                pages = JSON.parse(window.localStorage.getItem("pages")),
                results = pages.filter(function (element) {
                    return parentId === element.parentId;
                });
            deferred.resolve(results);
            return deferred.promise();
        };


    // Store sample data in Local Storage
    window.localStorage.setItem("pages", JSON.stringify(
        [
            {id: 1, pageSlug: "home", parentId: 0, title: "The Home Page", template: "", postRender: "", addonIDs: []},
            {id: 2, pageSlug: "lorem", parentId: 0, title: "Lorem", template: "", postRender: "", addonIDs: []},
            {id: 3, pageSlug: "dolor", parentId: 1, title: "Dolor", template: "", postRender: "", addonIDs: []},
            {id: 4, pageSlug: "sit", parentId: 1, title: "Sit", template: "", postRender: "", addonIDs: []},
            {id: 5, pageSlug: "amet", parentId: 2, title: "Amet", template: "", postRender: "", addonIDs: []}
        ]
    ));

        // The public API
    return {
        findById: findById,
        findBySlug: findBySlug,
        findByParent: findByParent
    };


}());