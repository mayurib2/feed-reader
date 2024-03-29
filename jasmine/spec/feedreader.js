/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         // Test will fail if either one of expectations aren't met
         it('has url defined and not empty', function() {
              allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
              });
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has name defined and is not empty string', function() {
              allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
              });
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
      /* TODO: Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
       it('menu is hidden by default ', function() {
         //get DOM element 'body' to check for class 'hidden menu'

         //Using HTML DOM manipulation
          expect(document.body.classList.contains("menu-hidden")).toBe(true);

        // Alternatively using JQuery for the same
        // expect($("body").hasClass("menu-hidden")).toBe(true);
       });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('menu toggles visibility when clicked', function() {
            //'.click' simulates(automates) a mouseclick
            $(".menu-icon-link").click();
            expect($("body").hasClass("menu-hidden")).toBe(false);
            $(".menu-icon-link").click();
            expect($("body").hasClass("menu-hidden")).toBe(true);
          })
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
           loadFeed(0,done);
         });
         it('has atleast one entry when feeder initialises', function() {
           // $(".feed .entry") returns the whole feed array
           expect($(".feed .entry").length).toBeGreaterThan(0);
         });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
      // variables to store state of the feed before and after new selection
        let feedOne,feedTwo;

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        /*
         * Callbacks used for this Asynchronous work.
         * Optionally Promises or async/await can also be used
         * https://jasmine.github.io/tutorials/async
         * Asynchronous Functions are those functions that request
         * info from the server and meanwhile, the server is processing
         * that info these functions don't wait for info, the execution of
         * code proceeds and next lines of the code are executed. These
         * functions have callback functions associated with them which,
         * when the response to that request is received make the function
         * execute.
         * done required to let Jasmine know which functions/tasks to wait for
         */

         // Nested loops to ensure 2nd loadFeed function received data from server
           beforeEach(function(done) {
           loadFeed(0, () => {
             feedOne = $('.feed').html();
             console.log("feed one =", feedOne);
             loadFeed(1, () => {
               feedTwo = $('.feed').html();
              console.log("feed two =", feedTwo);
               done();
             });
           });
         });
         it('content has changed',function() {
           expect(feedOne === feedTwo).toBe(false);
         });
    });
}());
