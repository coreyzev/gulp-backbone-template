/* Notes:
 * - History management is currently done using window.location.hash.  This could easily be changed to use Push State instead.
 * - jQuery dependency for now. This could also be easily removed.
 */

window.PageSlider = function (container) {

    var container = container,
        currentPage,
        prevPage,
        deletePage,
        stateHistory = [];

    this.back = function() {
        location.hash = stateHistory[stateHistory.length - 2];
    };

    this.state = function() {

        var l = stateHistory.length,
            state = window.location.hash;

        if (l === 0) {
            stateHistory.push(state);
            return "start";
        } else if (state === stateHistory[l-2]) {
            stateHistory.pop();
            return "back";
        } else {
            stateHistory.push(state);
            return "forward";
        }
    };

    // Use this function if you want PageSlider to automatically determine the sliding direction based on the state history
    this.slidePage = function(page, nextPage, pageView, nextPageView) {

        switch (this.state()) {
            case "start":
                this.slidePageFrom(page, nextPage, pageView, nextPageView);
                break;
            case "back":
                this.slidePageFrom(page, nextPage, pageView, nextPageView, 'left');
                break;
            default:
                this.slidePageFrom(page, nextPage, pageView, nextPageView, 'right');
                break;
            }

    };

    // Use this function directly if you want to control the sliding direction outside PageSlider
    this.slidePageFrom = function(page, nextPage, pageView, nextPageView, from) {

        if (currentPage == page) return;

        console.log('run PS SPF');

        container.append(page);

        if (!currentPage || !from) {
            currentPage = page;
            currentPage.removeClass('right left').addClass('center');
            stateHistory.push(window.location.hash);
            deletePage = prevPage = currentPage;
            return;
        }

        // Position the page at the starting position of the animation
        page.removeClass("center left right").addClass(from);

        if (nextPage) {
            container.append(nextPage);
            nextPage.removeClass("center left right").addClass(from);
        }

        // Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
        container[0].offsetWidth;

        // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
        page.removeClass(from).addClass('transition center');
        currentPage.removeClass("center").addClass('transition' + from === "left" ? "right" : "left");
        prevPage ? deletePage = prevPage : deletePage = undefined;
        prevPage = currentPage;
        currentPage = page;
    };

};