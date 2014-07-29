var App = require('../start.js'),

    NavChildTmp = require('../templates/SideNavChild');

module.exports = Backbone.View.extend({
    manage: true,
    template: NavChildTmp,
    tagName: 'li'
});