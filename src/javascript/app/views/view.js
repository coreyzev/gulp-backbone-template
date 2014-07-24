var App = require('../start.js'),
    MasterView = require('./MasterView'),
    MainView = require('../templates/template.hbs');

module.exports = MasterView.extend({
    template: MainView,
    initialize: function() {
        var underscoreTest;
        underscoreTest = _.last([0, 1, 2, 'hi mom!']);
        return this.render();
    },
    render: function() {
        this.$el.html(this.template({
            title: 'Gulp All The Things!',
            description: 'Starter Gulp + Browserify project equipped to handle the following:',
            tools: ['Browserify-shim', 'Browserify / Watchify', 'CoffeeScript', 'Compass', 'SASS', 'Handlebars', 'Image optimization', 'LiveReload', 'Non common-js jquery plugin', 'Npm backbone', 'Npm jquery', 'Underscore (included with Backbone)']
        }));
    }
});