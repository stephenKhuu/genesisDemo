(function(){

  var filterControl = function(genesisApp) {

    var pageId;
    var visible = false;
    var genesisApp = genesisApp;

    var $page_;
    var $filterControl_;
    var $filterAdd_;
    var $filterSelected_;
    var $filterCollection_;

    var $veggieFilter_;

    var controlTemplate = $('#page-filter').text();

    this.init = function(page) {
      var controlMarkup = $(controlTemplate);
      $page_ = $(page);
      pageId = $page_.attr('id').substring('4');
      $page_.prepend(controlMarkup);
      $filterControl_ = $page_.find('.filter-wrapper');
      $filterAdd_ = $page_.find('.filter-add');
      $filterCollection_ = $page_.find('.filter-collection');
      $filterSelected_ = $page_.find('.filter-selected');

      $veggieFilter_ = $filterCollection_.find('#veggie-filter');

      bindEvents();
    };

    function bindEvents() {
      $filterAdd_.click(function(){
        $filterCollection_.toggleClass('hidden');
      });

      $veggieFilter_.click(function(){
        toggleVeggieFilter();
      });
    }

    function toggleVeggieFilter(){
      var $currentFilter = $filterSelected_.find('img');

      if ($currentFilter.length > 0) {
        if(genesisApp.updateFilter(genesisApp.filters.DEFAULT, pageId)) {
          $filterSelected_.html('');
        }
      } else {
        if(genesisApp.updateFilter(genesisApp.filters.VEGETARIAN, pageId)) {
          var $filterCopy = $veggieFilter_.clone();

          $filterCopy.appendTo($filterSelected_);

          $filterCopy.click(function(){
            toggleVeggieFilter();
          });
        }
      }
    }

    this.toggle = function(){
      if (visible) {
        $filterControl_.addClass('hidden');
      } else {
        $filterControl_.removeClass('hidden');
      }

      visible = !visible;
    }
  };

  window.FilterControl = filterControl;
})();