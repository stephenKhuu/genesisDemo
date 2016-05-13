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

    var currentFilter = FILTERS.DEFAULT;

    var itemSwapStore = swapConfig.item_swaps;

    this.filters = FILTERS;

    this.init = function() {
      configureItems();
    };

    this.updateFilter = function(newFilter, pageIndex) {
      if (!animationLock){
        hideItems(pageIndex);
        currentFilter = newFilter;
        renderItems(pageIndex);

        return true;
      }

      return false;
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

    function renderItems(pageIndex) {
      var swapId = 'swap_' + pageIndex;
      var swapGroup = itemSwapStore[swapId];

      if(swapGroup) {
        var itemVersion = swapGroup[currentFilter];
        var $item = $('#' + itemVersion['id'] + '[data-swap-group="' + swapId + '"]');

        $item.addClass('displayed_item');
        $item.addClass('slideIn' + itemVersion['direction']);
        $item.removeClass('slideOut' + DIRECTION_OPPOSITES[itemVersion['direction']]);
      }
    }

    function hideItems(pageIndex) {
      var swapId = 'swap_' + pageIndex;
      var swapGroup = itemSwapStore[swapId];

      if(swapGroup) {
        var itemVersion = swapGroup[currentFilter];
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

  };

  window.Genesis = genesis;

})();