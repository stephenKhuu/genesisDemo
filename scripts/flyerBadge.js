(function() {

  var flyerBadge = function() {

    var $quickPeek_;

    this.init = function() {
      createTemporaryQuickPeek();
      bindTemporaryOverlay();
    };

    function createTemporaryQuickPeek(){
      var markup = $('#quickPeek-template').text();
      $quickPeek_ = $(markup);

      $('body').append($quickPeek_);
    }

    function bindTemporaryOverlay() {
      $('.badge').hover(function(ev){
        var self = $(ev.currentTarget);

        $quickPeek_.css({
          'top' : self.offset().top + 'px',
          'left' : self.offset().left + 'px'
        });
        $quickPeek_.stop().show(150);
      }, function(){
        //$quickPeek_.hide();
      });

      $quickPeek_.hover(function(){

      }, function() {
        $quickPeek_.stop().hide(150);
      });
    }
  };

  window.FlyerBadge = flyerBadge;
})();