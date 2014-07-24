var App = require('../start'),
    Bootstrap = require('../bootstrap'),
    MainView = require('../views/MainView');
require('pageslider');

module.exports = Backbone.Router.extend({

    routes: {
        "": "home",
        ":id": "page",
        "employees/:id/map": "map",
        "test": "test",
        "test2": "test2"
    },

    initialize: function() {
        App.Utils.slider = new PageSlider($('#content'));
        App.Views.Instances.view = new MainView({el: 'body'});

    },

    home: function() {
        // Since the home view never changes, we instantiate it and render it only once
        if (!App.view('homeView')) {
            //App.Views.Instances.homeView = new MainView();
            //App.view('homeView').render();
        } else {
            console.log('reusing home view');
            App.view('homeView').delegateEvents(); // delegate events when the view is recycled
        }
        //App.Utils.slider.slidePage(App.view('homeView').$el);
    },

    map: function(id) {
        //App.Utils.slider.slidePage(new app.views.MapView().render().$el);
    },

    test: function() {

        // Create a blank new Page.
        App.Models.Instance.page = new App.Models.Page({});
    },

    test2: function() {

        // Set the login page as the second for example...
        App.Models.Instance.page.set({
            title: "My Second Screen!",

            // Put the login page into the layout.
            view: new SecondPageView()
        });

    }

});