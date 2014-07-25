var App = require('../start'),
    Bootstrap = require('../bootstrap'),

    HeaderView = require('../views/HeaderView'),
    ContentView = require('../views/ContentView'),
    FooterView = require('../views/FooterView'),
    SideNavView = require('../views/SideNavView'),
    SliderPageView = require('../views/SliderPageView'),

    MainViewTmp = require('../templates/layouts/MainView');

    require('pageslider');

module.exports = Backbone.Router.extend({

    routes: {
        '': 'index',
        'employees/:id/map': 'map',
        'lorem': 'test',
        'test2': 'test2',
        ':id': 'page'
    },

    initialize: function() {
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
                'footer': new FooterView(),
                '#mp-menu': new SideNavView()
            }).renderViews().promise().done(function() {
                App.Utils.slider = new PageSlider($('.primaryView'));
                mainLayout.getView('#content').setViews({
                    '.sliderContent': new SliderPageView()
                }).renderViews();
            });
        });
    },

    index: function() {
        console.log("Index Page");
    },

    map: function(id) {
        //App.Utils.slider.slidePage(new app.views.MapView().render().$el);
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

    },

    page: function(id) {
        console.log("Page function actuated", id);
    }

});