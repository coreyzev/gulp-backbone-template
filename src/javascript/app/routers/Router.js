var App = require('../start'),
    Bootstrap = require('../bootstrap'),
    pageAdapter = require('../adapters/localstorage-pages.js'),

    //Views
    HeaderView = require('../views/HeaderView'),
    ContentView = require('../views/ContentView'),
    FooterView = require('../views/FooterView'),
    SideNavView = require('../views/SideNavView'),
    SliderPageView = require('../views/SliderPageView'),
    DNEView = require('../views/404View'),

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
        ':slug1(/:slug2)(/:slug3)(/:slug4)': 'page'
    },

    initialize: function() {

        document.title = "CZ Updated Backbone App";

        App.Models.Instances.home = new Page({ pageSlug: "home" });
        var homePage = { model: App.model("home") };

        Backbone.Layout.configure({
            manage: true,
            el: false
        });
        var mainLayout = App.Layouts.Instances.mainLayout = new Backbone.Layout({
            template: MainViewTmp,
            el: '.container',
            addHF: function () {
                $('.scroller-inner').prepend('<header id="header" class="bar bar-nav"></header>').append('<footer id="footer" class="bar bar-tab"></footer>');
                $('#mp-pusher').prepend('<nav id="mp-menu" class="mp-menu"></nav>');
            },
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

        App.Collections.Instances.pages = new Pages(JSON.parse(window.localStorage.getItem("pages")));
    },

    linkClick: function (target, trigger) {
        //Filter a link clicks
        if ($(target).data("bypass")) {
            if (target.href !== "") {
                // If the target has "data-bypass=true" & the href isnt empty
                window.location.href = target.href;
            }
        } else {
            // else navigate using the backbone app
            this.navigate(target.hash, true);
        }
    },

    index: function() {
        this.page("home");
    },

    page: function(slug1, slug2, slug3, slug4) {
        // Please god one day make these breadcrumbs less sucky (see: localstorage-pages.js)
        var slug = slug1;
        for (var s = 1; s < arguments.length; s++) {
            if (arguments[s]) {
                slug = slug + "/" + arguments[s];
            }
        }
        if (App.model(slug)) {
            //If the slug is found in the local database
            var page = App.model(slug),
                layout = App.layout('mainLayout');
            //Remove the views from the DOM & stop listening to events
            layout.removeView('header');
            layout.removeView('footer');
            layout.getView('#content').removeView('.sliderContent');
            layout.removeView('#mp-menu');
            //Add back in the missing elements
            layout.addHF();
            //Insert & render the views with the new data
            layout.getView('#content').setView('.sliderContent', new SliderPageView({ model: page })).render();
            layout.setView('header', new HeaderView({ model: page })).render();
            layout.setView('footer', new FooterView({ model: page })).render();
            layout.setView('#mp-menu', new SideNavView({ model: page })).render();
        } else {
            //If it's not found, navigate to the 404 page
            App.router("router").pageDNE(slug);
        }
    },

    pageDNE: function(wrongHash) {
        var layout = App.layout('mainLayout');
        //Same as in the "page" function
        layout.removeView('header');
        layout.removeView('footer');
        layout.getView('#content').removeView('.sliderContent');
        layout.removeView('#mp-menu');
        layout.addHF();
        layout.getView('#content').setView('.sliderContent', new DNEView({ wrongHash: wrongHash })).render();
        layout.setView('header', new HeaderView({ DNE: true })).render();
        layout.setView('footer', new FooterView({ DNE: true })).render();
        layout.setView('#mp-menu', new SideNavView({ DNE: true })).render();
    }

});