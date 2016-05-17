(function() {

  var genesis = function(swapConfig) {

    var animationLock = false;

    var ANIMATION_TIME_DELAY = 1500;

    var FILTERS = {
      'DEFAULT' : 'DEFAULT',
      'VEGETARIAN' : 'VEGETARIAN',
      'LOCATION' : 'LOCATION'
    };

    var DIRECTION_OPPOSITES = {
      'Up' : 'Down',
      'Down' : 'Up',
      'Left' : 'Right',
      'Right' : 'Left'
    };

    var currentFilter = {};

    var itemSwapStore = swapConfig.item_swaps;
    var availableDCs = swapConfig.DCs;

    this.filters = FILTERS;

    this.init = function() {
      configurePages();
      configureItems();
    };

    function configureItems(){
      for(var swapId in itemSwapStore) {
        var swapGroup = itemSwapStore[swapId];
        for(var filter in swapGroup) {
          var itemVersion = swapGroup[filter];
          var $item = $('#' + itemVersion['id'] + '[data-swap-group="' + swapId + '"]');

          $item.css({
            'width' : itemVersion['width'] + 'px',
            'height' : itemVersion['height'] + 'px',
            'top' : itemVersion['top'] + 'px',
            'left' : itemVersion['left'] + 'px'
          });
        }

        var swapIndex = swapId.substring(5);
        renderItems(swapIndex);
      }
    }

    function configurePages() {
      $('.filterable').each(function(index, value){
        var pageNum = index + 1;

        currentFilter['page' + pageNum] = FILTERS.DEFAULT;
      });
    }

    this.updateFilter = function(newFilter, pageIndex) {
      if (!animationLock){
        hideItems(pageIndex);
        currentFilter['page' + pageIndex] = newFilter;
        renderItems(pageIndex);

        return true;
      }

      return false;
    };

    this.updateAvailableDCs = function(newFilter, pageIndex) {
      if (!animationLock) {
        hideAvailableDCs(pageIndex);
        currentFilter['page' + pageIndex] = newFilter;
        showAvailableDCs(pageIndex);
        return true;
      }

      return false;
    };

    function renderItems(pageIndex) {
      var swapId = 'swap_' + pageIndex;
      var swapGroup = itemSwapStore[swapId];

      if(swapGroup && swapGroup[currentFilter['page' + pageIndex]]) {
        var itemVersion = swapGroup[currentFilter['page' + pageIndex]];
        var $item = $('#' + itemVersion['id'] + '[data-swap-group="' + swapId + '"]');

        $item.addClass('displayed_item');
        $item.addClass('slideIn' + itemVersion['direction']);
        $item.removeClass('slideOut' + DIRECTION_OPPOSITES[itemVersion['direction']]);
      }
    }

    function hideItems(pageIndex) {
      var swapId = 'swap_' + pageIndex;
      var swapGroup = itemSwapStore[swapId];

      if(swapGroup && swapGroup[currentFilter['page' + pageIndex]]) {
        var itemVersion = swapGroup[currentFilter['page' + pageIndex]];
        var $item = $('#' + itemVersion['id'] + '[data-swap-group="' + swapId + '"]');

        animationLock = true;

        window.setTimeout(function(){
          $item.removeClass('displayed_item');
          animationLock = false;
        }, ANIMATION_TIME_DELAY);

        $item.removeClass('slideIn' + itemVersion['direction']);
        $item.addClass('slideOut' + DIRECTION_OPPOSITES[itemVersion['direction']]);
      }
    }

    function hideAvailableDCs(pageIndex) {
      var pageId = 'page' + pageIndex;
      var DCs = $('#' + pageId).find('.dc');

      DCs.addClass('hidden');
      DCs.removeClass('slideInDown');
    }

    function showAvailableDCs(pageIndex) {
      var pageId = 'page' + pageIndex;
      var DCgroup = availableDCs[pageId];

      if(DCgroup && DCgroup[currentFilter['page' + pageIndex]]) {
        var dcList = DCgroup[currentFilter['page' + pageIndex]];

        [].forEach.call(dcList, function(dc){
          var $dc = $('#' + dc.id);

          $dc.removeClass('hidden');
          $dc.addClass('slideInDown');
        });
      }
    }

  };

  window.Genesis = genesis;

})();