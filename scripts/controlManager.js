(function(){

  var controlManager = function(genesisApp){
    var filterControls = [];

    this.init = function(genesisApp) {
      var $pages = $('.filterable');

      $pages.each(function(index, page){
        var filterControl = new window.FilterControl(genesisApp);
        filterControl.init(page);
        filterControls.push(filterControl);
      });
    };

    this.toggle = function() {
      [].forEach.call(filterControls, function(filterControl){
        filterControl.toggle();
      });
    }
  };

  window.ControlManager = controlManager;
})();