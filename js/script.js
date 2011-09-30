/**
 * Test application to show how to use Backbone.js to Backbon-ify an app
 * @author : DjebbZ
 * September 2011
 */

// Anynomous function to avoid pollution of the global namespace
// I'm sure there are other (and better!) ways to do this though 
(function(){

  // Each "page" of the application is a Backbone.View
  var IndexView = Backbone.View.extend({
    // tie the View to the #scroller element for iScroll.js
    el : '#scroller',
    
    // each view can be "self-rendered"
    render : function() {
      // ich is the ICanHaz magic templating system
      $(this.el).html(ich.indexView());
      
      // render the SwipeSlide slider on demand
      $('#slider', this.el).swipeSlide({
        content_selector: '#slider-content',
        visible_slides: 3,
        bullet_navigation: false
      });
      
      // to allow chainability
      return this;
    }
  });
  
  // Another dummy page
  var Page2View = Backbone.View.extend({
    el : '#scroller',
    
    render : function() {
      $(this.el).html(ich.page2View());
      return this;
    }
  });
  
  // The Backbone.Router controls the urls of the app
  // Completely inspired from Rob Conery's article
  // http://wekeroad.com/post/8797704995/the-backbonejs-todo-list-sample-refactored-part-1
  var AppController = Backbone.Router.extend({
    // create the necessary pagess of the app
    initialize : function() {
      this.indexView = new IndexView();
      this.page2View = new Page2View();
    },
    
    routes : {
      "" : "index",
      "page2" : "page2"
    },
    
    // self render the index page
    index : function(){
      this.indexView.render();
    },
    
    // self render the page 2 dummy page
    page2 : function(){
      this.page2View.render();
    }
  });
  
  var myScroll, app;
  
  // Not using $(document).ready because it was firing too soon.
  // This technique is used for safely loading iScroll-4
  // Details : http://cubiq.org/iscroll-4 (section "ON LOAD")
  // Credits : https://groups.google.com/forum/#!topic/iscroll/pp8K7Q-2Hkg
  function loaded() {
    setTimeout(function () {
      // As iScroll needs a little delay to load properly,
      // the Backbone app loading is also delayed so everything stays in sync
      app = new AppController();
      Backbone.history.start();
      setTimeout(function(){
        myScroll = new iScroll('wrapper');
      }, 100); 
    }, 100);
  }
  window.addEventListener('load', loaded, false);
})();
