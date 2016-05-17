(function() {

  genesis_config = {
    DCs : {
      page1: {
        LOCATION : [{
          id : 'location-dc',
          direction: 'Up'
        }]
      }
    },
    item_swaps: {
      swap_2: {
        DEFAULT: {
          width: 309,
          height: 242,
          top: 458,
          left: 356,
          direction: 'Up',
          id: 'pork'
        },
        VEGETARIAN: {
          width: 309,
          height: 242,
          top: 459,
          left: 362,
          direction: 'Up',
          id: 'kale'
        }
      }
    }
  };

  window.Genesis_Config = genesis_config;
})();