	$ = jQuery = require('jquery');
	touchSwipe = require('touchSwipe');
	_ = require('underscore');
	Backbone = require('backbone');
	Backbone.$ = require('jquery');
	LayoutManager = require('backbone.layoutmanager');

var App = require('./start'),
	Router = require('./routers/Router'),
    Bootstrap = require('./bootstrap');

$(document).on("ready", function () { //eventually on "deviceReady"
	App.Routers.Instances.router = new Router();
	Backbone.history.start({});//pushState: true, root: '/'});
});