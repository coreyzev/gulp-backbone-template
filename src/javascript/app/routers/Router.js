var App = require('../start'),
    Bootstrap = require('../bootstrap'),

    HeaderView = require('../views/HeaderView'),
    ContentView = require('../views/ContentView'),
    FooterView = require('../views/FooterView'),
    SideNavView = require('../views/SideNavView'),

    MainViewTmp = require('../templates/layouts/MainView');

require('pageslider');

module.exports = Backbone.Router.extend({

    routes: {
        '': 'home',
        ':id': 'page',
        'employees/:id/map': 'map',
        'lorem': 'test',
        'test2': 'test2'
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
            }).renderViews();
        });

        App.Utils.slider = new PageSlider($('.primaryView'));
        App.Utils.slider.slidePage($('.primaryView'));
        //mainLayout.getView('.primaryView').$el.addClass('content');

    },

    home: function() {
        /*
        // Since the home view never changes, we instantiate it and render it only once
        if (!App.view('homeView')) {
            //App.Views.Instances.homeView = new MainView();
            //App.view('homeView').render();
        } else {
            console.log('reusing home view');
            App.view('homeView').delegateEvents(); // delegate events when the view is recycled
        }
        //App.Utils.slider.slidePage(App.view('homeView').$el);
        */
    },

    map: function(id) {
        //App.Utils.slider.slidePage(new app.views.MapView().render().$el);
    },

    test: function() {

        App.Utils.slider.slidePage($(<div>test</div>));
        // Create a blank new Page.
        App.Models.Instance.page = new App.Models.Page({});
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