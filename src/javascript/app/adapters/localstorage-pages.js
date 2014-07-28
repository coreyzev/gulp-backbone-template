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


    // Store sample data in Local Storage
    window.localStorage.setItem("pages", JSON.stringify(
        [
            {id: 1, pageSlug: "home", parentId: 0, title: "The Home Page", template: "", postRender: "", addonIDs: []},
            {id: 2, pageSlug: "lorem", parentId: 0, title: "Lorem", template: "", postRender: "", addonIDs: []},
            {id: 3, pageSlug: "dolor", parentId: 2, title: "Dolor", template: "", postRender: "", addonIDs: []},
            {id: 4, pageSlug: "sit", parentId: 3, title: "Sit", template: "", postRender: "", addonIDs: []},
            {id: 5, pageSlug: "ipsum", parentId: 3, title: "Ipsum", template: "", postRender: "", addonIDs: []},
            {id: 6, pageSlug: "consectetur", parentId: 2, title: "Consectetur", template: "", postRender: "", addonIDs: []},
            {id: 7, pageSlug: "adipiscing", parentId: 6, title: "Adipiscing", template: "", postRender: "", addonIDs: []},
            {id: 5, pageSlug: "elit", parentId: 7, title: "Elit", template: "", postRender: "", addonIDs: []},
            {id: 8, pageSlug: "donec", parentId: 0, title: "Donec", template: "", postRender: "", addonIDs: []},
            {id: 9, pageSlug: "consequat", parentId: 8, title: "Consequat", template: "", postRender: "", addonIDs: []},
            {id: 10, pageSlug: "imperdiet", parentId: 9, title: "Imperdiet", template: "", postRender: "", addonIDs: []}
        ]
    ));

        // The public API
    return {
        findById: findById,
        findBySlug: findBySlug,
        findByParent: findByParent
    };


}());