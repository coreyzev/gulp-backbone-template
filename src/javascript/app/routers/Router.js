var App = require('../start'),
    Bootstrap = require('../bootstrap'),
    pageAdapter = require('../adapters/localstorage-pages.js'),

    //Views
    HeaderView = require('../views/HeaderView'),
    ContentView = require('../views/ContentView'),
    FooterView = require('../views/FooterView'),
    SideNavView = require('../views/SideNavView'),
    SliderPageView = require('../views/SliderPageView'),

    //Models
    Page = require('../models/PageModel'),

    //Collections
    Pages = require('../collections/PagesCollection'),

    //Templates
    MainViewTmp = require('../templates/layouts/MainView');

    require('pageslider');

module.exports = Backbone.Router.extend({

    routes: {
        '': 'index',
        ':slug': 'page'
    },

    initialize: function() {

        App.Collections.Instances.pages = new Pages();
        App.Models.Instances.home = new Page({ pageSlug: "home" });
        App.model("home").fetch();
        var homePage = { model: App.model("home") };

        Backbone.Layout.configure({
            manage: true,
            el: false
        });
        var mainLayout = App.Layouts.Instances.mainLayout = new Backbone.Layout({
            template: MainViewTmp,
            el: 'body'
        });

        mainLayout.render().promise().done(function() {
            mainLayout.setViews({
                'header': new HeaderView(),
                '#content': new ContentView(),
                'footer': new FooterView(homePage),
                '#mp-menu': new SideNavView()
            }).renderViews().promise().done(function() {
                App.Utils.slider = new PageSlider($('.primaryView'));
                mainLayout.getView('#content').setViews({
                    '.sliderContent': new SliderPageView(homePage)
                });
            });
        });
    },

    index: function() {
        this.page("home");
    },

    page: function(slug) {
        pageAdapter.findBySlug(slug)
        .done(function(data) {
            var page;
            if (!App.model(slug)) {
                page = App.Models.Instances[slug] = new Page({
                    pageSlug: slug
                });
                console.warn("Created Instance for model:", slug);
            } else {
                page = App.model(slug);
            }
            page.fetch({
                //fix this to use layoutManager
                success: function(data) {
                    var layout = App.layout('mainLayout');
                    Backbone.Layout.cleanViews([
                        layout.getView('header'),
                        layout.getView('footer'),
                        layout.getView('#content').getView('.sliderContent')
                    ]);
                    new SliderPageView({ model: data }).render();
                    new HeaderView({ model: data }).render();
                    new FooterView({ model: data }).render();
                    new SideNavView({ model: data }).render();
                }
                    success: function(data) {
                        page.set({nextSlide:{}});
                        function updateNextSlide() {
                            var next = page.attributes.nextSlide,
                                nextObj = {},
                                model = page;

                            next.id = page.id + 1;

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
                        }
                        updateNextSlide();
            });
        })
        .fail(function(data) {
            App.router("router").pageDNE(slug);
        });
    },

    pageDNE: function(wrongHash) {
        console.log("You tried to reach ", wrongHash, " and failed. Sorry.");
    }

});