var App = require("./start");

/**
 * Get an instance for a view
 * @param  {String} name Name for a view
 * @return {Backbone.View}
 */
App.view = function getViewindowstance(name) {
  if(!App.Views.Instances.hasOwnProperty(name)) {
    console.error("Cannot find an Instance for the view : " + name);
    return undefined;
  }
  return App.Views.Instances[name];
};

/**
 * Get an instance for a model
 * @param  {String} name Name for a model
 * @return {Backbone.Model}
 */
App.model = function getModelInstance(name) {
  if(!App.Models.Instances.hasOwnProperty(name)) {
    console.error("Cannot find an Instance for the view : " + name);
    return undefined;
  }
  return App.Models.Instances[name];
};

/**
 * Get an instance for a collection
 * @param  {String} name Name for a collection
 * @return {Backbone.Collection}
 */
App.collection = function getCollectionInstance(name) {
  if(!App.Collections.Instances.hasOwnProperty(name)) {
    console.error("Cannot find an Instance for the view : " + name);
    return undefined;
  }
  return App.Collections.Instances[name];
};

// Store each timeouts ID
window.appTimesout  = [];
window.syncTimesout = [];

// Default time before we return to the home page in seconds
window.TIMEOUT_BEFORE_HOME = 50;

// Display App's debug if it's 1, 0 to hide them
window.VERBOSE = 1;

/**
 * Clean each timesout
 * It's also set a new timeout to the home page.
 * The delay before the home page is defined in TIMEOUT_BEFORE_HOME
 */
window.resetTimeout = function resetTimeout() {
  if(window.appTimesout.length) {
    console.debug('[App@resetTimeout] Clear timeouts');
    window.appTimesout.forEach(window.clearTimeout);
    window.appTimesout.length = 0;
  }

  window.setTimeoutPage();
};

window.resetSyncTimeout = function resetSyncTimeout() {
  if(window.syncTimesout.length) {
    window.syncTimesout.forEach(window.clearTimeout);
  }
};


/**
 * Create a repeatable action with a custom delay
 * @param  {Function} cb    Callback to trigger
 * @param  {Integer}   delay
 * @param  {String}   msg
 */
window.repeatAction = function repeatAction(cb, delay, msg) {
  window.appIntervals.push(setInterval(function() {
    cb();
  }, delay * 1000));

  msg && console.debug("[repeatAction] " + msg);
};

/**
 * Remove each intervals
 * @return {void}
 */
window.resetActions = function resetActions() {
  if(window.appIntervals.length) {
    console.debug('[App@resetActions] Clear intervals');
    window.appIntervals.forEach(clearInterval);
    window.appIntervals.length = 0;
  }
};

/**
 * Open a page after a custom delay
 * @param {String} page  Page name
 * @param {Integer} delay How many seconds ?
 */
window.setTimeoutPage = function setTimeoutPage(page,delay) {

  page = page || '';
  delay = delay || window.TIMEOUT_BEFORE_HOME;

  var _page = page || 'root';
  console.debug('[App@setTimeoutPage] Open page ' + _page + ' in ' + delay + 's');

  window.appTimesout.push(setTimeout(function() {
    App.Routers.Instances.router.navigate(page,{trigger: true});
  },delay * 1000));
};

/**
 * Helper to open a page
 * It can also open a page after a custom delay if you specify one.
 * It sends log informations to the driver
 * @param  {String} page  Page name
 * @param  {Integer} delay Delay in seconds
 * @return {void}
 */
window.openPage = function openPage(page,delay) {

  var _page = page || 'root';

  if(delay) {
    console.log("[App@openPage] : Open the page - " + _page + " - with a delay of " + delay + "s");
    return window.setTimeoutPage(page, delay);
  }

  console.log("[App@openPage] : Open the page - " + _page);
  App.Routers.Instances.router.navigate(page || '',{trigger: true});
};

/**
 * Navigate back in the future
 * @param  {Integer} howMany
 * @return {void}
 */
window.back = function back(howMany) {
  Backbone.history.history.go(-howMany);
};


// Remove the App's debug message
if(!window.VERBOSE) {
  console.debug = function(){};
}

// Return the value for a field inside the form
window.findByKey = function findByKey(o,key) {
  var field = _.findWhere(o,{name:key });
  return (field) ? field.value : "";
};

var Bootstrap = {};

module.exports = Bootstrap;