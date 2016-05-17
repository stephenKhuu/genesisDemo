(function() {

  var recipeCarousel = function(){

    var siblingMapping = {
      'recipe1' : {
        'left' : 'recipe2',
        'right' : 'recipe3'
      },
      'recipe2' : {
        'left' : 'recipe3',
        'right' : 'recipe1'
      },
      'recipe3' : {
        'left' : 'recipe1',
        'right' : 'recipe2'
      }
    };

    var recipeCoordinates = {
      'left' : 170,
      'center' : 220,
      'right' : 270
    };

    var presentRecipe;
    var $leftSibling_;
    var $rightSibling_;

    var $wrapper_;

    var $recipes_;
    var $recipeContainer_;
    var $recipeSlideout_;
    var $recipeSlideoutImage_;

    this.init = function() {
      $wrapper_ = $('.wrapper');
      $recipeSlideout_ = $('.slideout-overlay');
      $recipeSlideoutImage_ = $('.slideout-image');
      $recipeContainer_ = $('#recipe-bg');
      $recipes_ = $recipeContainer_.find('img');

      if($recipes_.length > 0){
        setPresentRecipe($recipes_.eq(0));
      }

      $('.recipe-card').click(function(){
        bindCardRotation($(this));
      });


      $recipeSlideout_.find('.slideout-background').click(function(){
        $recipeSlideout_.attr('collapsed', 'true');
        $wrapper_.removeClass('recipe-open');
      });
    };

    function bindCardRotation($target) {
      var selectedId = $target.attr('id');

      if(selectedId == presentRecipe.attr('id')) {
        //Display recipe slideout
      } else {
        if(selectedId == $leftSibling_.attr('id')) {
          rotateCardsCounterClockwise();
        } else if(selectedId == $rightSibling_.attr('id')) {
          rotateCardsClockwise();
        }

        setPresentRecipe($target);
      }
    }

    function rotateCardsCounterClockwise(){
      rotateCards($rightSibling_, $leftSibling_, presentRecipe);
    }

    function rotateCardsClockwise() {
      rotateCards(presentRecipe, $rightSibling_, $leftSibling_);
    }

    function rotateCards($cardForLeft, $cardForCenter, $cardForRight) {
      $('.recipe-focus').remove('recipe-focus');
      $('.slideRecipeLeft').removeClass('slideRecipeLeft');
      $('.slideRecipeRight').removeClass('slideRecipeRight');

      $cardForLeft.css({
        'left' : recipeCoordinates['left'] + 'px'
      });

      $cardForCenter.css({
        'left' : recipeCoordinates['center'] + 'px'
      });

      $cardForRight.css({
        'left' : recipeCoordinates['right'] + 'px'
      });

      $cardForLeft.addClass('animating-rotation');
      $cardForCenter.addClass('animating-rotation');
      $cardForRight.addClass('animating-rotation');

      setTimeout(function(){
        $cardForLeft.removeClass('animating-rotation');
        $cardForCenter.removeClass('animating-rotation');
        $cardForRight.removeClass('animating-rotation');
      }, 500);
    }

    function setPresentRecipe($newRecipe) {
      if(presentRecipe) {
        presentRecipe.unbind('click');
        $leftSibling_.unbind('click');
        $rightSibling_.unbind('click');
        presentRecipe.unbind('mouseenter');
        $recipeContainer_.unbind('mouseleave');
        presentRecipe.removeClass('present');
      }

      var targetRecipeId = $newRecipe.attr('id');
      $leftSibling_  = $('#' + siblingMapping[targetRecipeId].left);
      $rightSibling_  = $('#' + siblingMapping[targetRecipeId].right);

      presentRecipe = $newRecipe;
      presentRecipe.addClass('present');

      presentRecipe.click(function(ev){
        var imageUrl = presentRecipe.attr('src');

        $recipeSlideoutImage_.html('');
        $recipeSlideoutImage_.html('<img src="' + imageUrl + '" />');

        var flyerViewOffset = $('#main').offset();

        $recipeSlideout_.css({
          'left' : Math.abs(flyerViewOffset.left) + 'px'
        });

        $recipeSlideout_.removeAttr('collapsed');
        $wrapper_.addClass('recipe-open');
      });

      $('.recipe-card').click(function(){
        bindCardRotation($(this));
      });

      presentRecipe.on('mouseenter', function(ev){
        presentRecipe.add('recipe-focus');
        $leftSibling_.addClass('slideRecipeLeft');
        $rightSibling_.addClass('slideRecipeRight');
      });

      $recipeContainer_.on('mouseleave', function(ev) {
        presentRecipe.remove('recipe-focus');
        $leftSibling_.removeClass('slideRecipeLeft');
        $rightSibling_.removeClass('slideRecipeRight');
      });
    }
  };

  window.RecipeCarousel = recipeCarousel;
})();