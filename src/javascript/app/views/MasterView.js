var App = require('../start.js');


var MasterView = Backbone.View.extend({

  /**
   * Master events:
   *     - Open page from a custom target
   * These events are triggered after a view's events
   * @type {Object}
   */
  events: {
    //'click [data-page-dest]' : "getPageTarget"
  },

  /**
   * Custom constructor for a Class
   */
  init: function init() {},

  /**
   * Create a context for your view
   * Override this method to remove the extend of events
   * @return {void}
   */
  initialize: function initialize() {
    // Extends your view's events, so yours will be triggered before Master's
    this.events = _.extend({},this.events, MasterView.prototype.events);

    this.init();
  },

  // Hook before we render the view
  beforeRender: function beforeRender() {},

  // Hook after we have rendered
  afterRender: function afterRender() {},

  /**
   * Render the view
   * You can bind a custom context by adding one inside the before hook
   * @return {Backbone.View}
   */
  render: function render() {

    var context = this.model ? this.model.toJSON() : {};

    // Find a custom context for your view
    this.beforeRender();

    this.$el.html(this.template(context));

    this.afterRender();

    // There it is, we bind events to the view.
    this.delegateEvents();

    return this;
  },

  /**
   * Input values changed
   * @param {type} evt
   */
  changed: function changed(evt) {
    window.resetTimeout();
    // We get the name of input and the value and we store it in the form
    this.model.set(evt.currentTarget.name, encodeURIComponent(evt.currentTarget.value || ''));
  },

  /**
   * This method is called on each click on a button.
   * It will look for an attribute :
   *     - data-page-dest : It's a page's name
   * So it will auto open this page.
   * It will log an error to the driver if the page's name does not match a route.
   * @param  {Object} e Event click
   * @return {void}
   */
  getPageTarget : function getPageTarget(e) {

    var routes = App.Routers.Instances.router.routes,
      page   = e.currentTarget.getAttribute("data-page-dest");

    console.debug("[MasterView@getPageTarget] : Open the page - " + page);

    if(page) {

      // Because page is always an empty string
      if('root' === page) {
        page = "";
      }

      if(routes.hasOwnProperty(page)) {
        return window.openPage(page);
      }
      console.error("Something is wrong with your route's name, it does'nt match any of our routes  --  " + page || 'root');
    }
   },

});

module.exports = MasterView;