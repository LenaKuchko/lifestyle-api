var Recipe = require('./../js/recipe.js').recipeModule;

var currentRecipe = new Recipe();

var displayRecipeDetails = function(recipe) {
  console.log(recipe);
  $("#recipe-details").html("<img src='" + recipe.imageLink + "'>");
  for (var i = 0; i < recipe.ingredients.length; i++) {
    $("#recipe-ingredients").append("<li>" + recipe.ingredients[i] + "</li>");
  }
};

var displayAllRecipes = function(allRecipes){
  console.log(allRecipes);
  console.log(allRecipes.length);
  for(var i = 0; i < allRecipes.length; i++){
      $(".output-recipes").append("<div class = 'info-recipes' id = '" + allRecipes[i].weight + "'> <strong>" + allRecipes[i].name + "</strong> by " + allRecipes[i].source + "</div>");
  }
  $(".info-recipes").click(function() {
    var clicked = $(this)[0].id;
    currentRecipe.findRecipe(clicked, allRecipes, displayRecipeDetails);
  });
};


$(document).ready(function() {
  $("#get-recipes").submit(function (event) {
    event.preventDefault();
    var ingredient = $("#search-recipe").val();
    currentRecipe.getRecipes(ingredient, displayAllRecipes);
  });
});
