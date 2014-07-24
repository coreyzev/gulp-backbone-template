$ = require('jquery');
_ = require('underscore');
Backbone = require('backbone');
Backbone.$ = require('jquery');

var App = require('./start'),
	Router = require('./routers/Router'),
    Bootstrap = require('./bootstrap');

$(document).on("ready", function () { //eventually on "deviceReady"
	App.Routers.Instances.router = new Router();
	Backbone.history.start({pushState: true});
});