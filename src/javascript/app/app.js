$ = require('jquery');
_ = require('underscore');
Backbone = require('backbone');
Backbone.$ = require('jquery');

var App = require('./start'),
	Router = require('./routers/Router'),
    Bootstrap = require('./bootstrap');

var View = require('./views/View');
App.Views.Instances.view = new View({el: 'body'});
require('plugin');

$(document).on("ready", function () { //eventually on "deviceReady"
	App.Routers.Instances.router = new Router();
	Backbone.history.start({pushState: true});
	plugin();
});