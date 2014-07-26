var App = require('../start'),
    Bootstrap = require('../bootstrap'),
    pageAdapter = require('../adapters/localstorage-adapter.js'),

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
        var homePage = {model: App.model("home")};

        Backbone.Layout.configure({
            manage: true,
            el: false
        });
        var mainLayout = new Backbone.Layout({
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
        console.log("Page function actuated", slug);
        if (pageAdapter.findBySlug(slug)) {
            var page;
            if (!App.model(slug)) {
                page = App.Models.Instances[slug] = new Page({
                    pageSlug: slug
                });
                console.log("Created Instance for model:", slug);
            } else {
                page = App.model(slug);
            }
            page.fetch({
                //fix this to use layoutManager
                success: function(data) {
                    new SliderPageView({
                        model: data
                    }).render();
                }
            });
        } else {
            this.pageDNE(slug);
        }
    },

    pageDNE: function(x) {
        console.log("You tried to reach ", x, " and failed. Sorry.");
    },








    test: function() {
        console.log("Lorem Test Page reached");
        $('.sliderContent').append('<div class="page right testDiv">Goodbye World</div>');
        App.Utils.slider.slidePage($('.testDiv'));

        // Create a blank new Page.
        //App.Models.Instance.page = new App.Models.Page({});
    },

    test2: function() {

        // Set the login page as the second for example...
        App.Models.Instance.page.set({
            title: 'My Second Screen!',

            // Put the login page into the layout.
            view: new SecondPageView()
        });

    }

});