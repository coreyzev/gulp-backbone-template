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

        Backbone.Layout.configure({
            manage: true,
            el: true
        });
        var mainLayout = App.Layouts.Instances.mainLayout = new Backbone.Layout({
            template: MainViewTmp,
            el: '.container',
            addHF: function () {
                $('.scroller-inner').prepend('<header id="header" class="bar bar-nav"></header>').append('<footer id="footer" class="bar bar-tab"></footer>');
                $('#mp-pusher').prepend('<nav id="mp-menu" class="mp-menu"></nav>');
            }
        });

        App.Collections.Instances.pages = new Pages(JSON.parse(window.localStorage.getItem("pages")));
        App.collection('pages').each(function(model, index, models) {
            models[index].fetchChildren();
        });
        App.collection('pages').each(function(model) {
            if (model.attributes.hasChildren) {
                var data = model.children.models;
                for (var d = 0; d < data.length; d++) {
                    data[d].set({parent: {pageSlug: model.attributes.pageSlug, title: model.attributes.title}});
                    if (data[d].attributes.hasChildren) {
                        model.set({hasSubChildren: true});
                        data[d].children.models.forEach(function(childModel) {
                            childModel.set({parent: {pageSlug: data[d].attributes.pageSlug, title: data[d].attributes.title}});
                        });
                    }
                }
            }
            model.save();
        });

        mainLayout.render().promise().done(function() {
            mainLayout.setViews({
                'header': new HeaderView(),
                '#content': new ContentView()
            }).renderViews().promise().done(function() {
                App.Utils.slider = new PageSlider($('.primaryView'));
                //mainLayout.getView('#content').insertView('.sliderContent', new SliderPageView({ model: App.model('home'), activeSlide: true}));
            });
        });

        mainLayout.setView('footer', new FooterView({ model: App.model('home')})).render();
        mainLayout.setView('#mp-menu', new SideNavView()).render();

        $(window).swipe({
            swipeLeft: function() {
                App.router('router').swipeForward.apply(this,arguments);
            },
            swipeRight: function() {
                App.router('router').swipeBack.apply(this,arguments);
            },
            threshold:300
        });
    },
    go: function() {
        var destination = _.toArray(arguments).join("/");
        if (destination !== "home") {
            return this.navigate(destination, true);
        }
    },
    swipeForward: function (event, direction, distance, duration, fingerCount, fingerData) {
        if (fingerData[0].start.x > (document.body.clientWidth - 50)) {
            return App.router('router').go($('a.next')[0].hash.slice(1));
        }
    },
    swipeBack: function (event, direction, distance, duration, fingerCount, fingerData) {
        if (fingerData[0].start.x < 50 ) {
            return window.history.back();
        }
    },
    linkClick: function (target, trigger) {
        //Filter a link clicks
        if ($(target).data("bypass")) {
            if (target.href !== "") {
                // If the target has "data-bypass=true" & the href isnt empty
                return window.location.href = target.href;
            }
        } else {
            // else navigate using the backbone app
            return this.navigate(target.hash, true);
        }
    },

    index: function() {
        this.page("home");
    },

    page: function(slug1, slug2, slug3, slug4) {
        // Please god one day make these pageSlugs less sucky (see: localstorage-pages.js)
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
            layout.removeView('#mp-menu');
            //Add back in the missing elements
            layout.addHF();
            //Insert & render the views with the new data
            var slide, nextSlide, oldPages;
            if (App.view(slug)) {
                layout.getView('#content').getView('.sliderContent').stopListening();
                slide = App.view(slug);
                if (slide.options.nextPage) {
                    nextSlide = slide.options.nextPage;
                    nextSlide.render();
                    nextSlide.options.activeSlide = true;
                    App.Utils.slider.slidePage(slide.$el, nextSlide.$el, slide, nextSlide);
                } else {
                    App.Utils.slider.slidePage(slide.$el, false, slide, false);
                }
            } else {
                layout.getView('#content').insertView('.sliderContent', new SliderPageView({ model: page, activeSlide: true })).render();
            }
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
        layout.getView('#content').getView('.sliderContent').stopListening();
        layout.removeView('#mp-menu');
        layout.addHF();
        layout.getView('#content').insertView('.sliderContent', new DNEView({ wrongHash: wrongHash })).render();
        layout.setView('header', new HeaderView({ DNE: true })).render();
        layout.setView('footer', new FooterView({ DNE: true })).render();
        layout.setView('#mp-menu', new SideNavView({ DNE: true })).render();
    }

});