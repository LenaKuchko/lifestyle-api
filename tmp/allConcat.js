var Food = require('./../js/food.js').foodModule;

var currentFood = new Food();

var displayOne = function (selectedFood) {
  $("#nutrition").text("Calories: " + selectedFood.calories + "Fat: " + selectedFood.fat + "Cholesterol: " + selectedFood.cholesterol + "Sodium: " + selectedFood.sodium + "Carbs: " + selectedFood.carbs + "Fiber: " + selectedFood.fiber + "Sugars: " + selectedFood.sugars + "Proteins: " + selectedFood.proteins);
};

var displayNutrition = function(nutrition) {
  for(var i = 0; i < nutrition.length; i++){
    $(".output").append("<div class = 'info' id=" + nutrition[i].id + ">" + nutrition[i].brandName + " " + nutrition[i].name + "</div>");
  }
  $(".info").click(function() {
    var clicked = $(this)[0].id;
    console.log(clicked);
    currentFood.getNutritionSingle(clicked, displayOne);
  });
};

// var displayRecipe = function(recipes) {
//   // for(var i = 0; i < recipes.length; i++){
//   //
//   // }
//   console.log(recipes);
// }

$(document).ready(function() {
  $("#search").submit(function(event) {
    event.preventDefault();
    var searchFood = $("#search-food").val();
    currentFood.getAllNutrition(searchFood, displayNutrition);

  });
  // currentFood.getRecipe();
});

var Recipe = require('./../js/recipe.js').recipeModule;

var currentRecipe = new Recipe();

var displayRecipeDetails = function(recipe) {
  console.log(recipe);
  $("#recipe-details").html("<img src='" + recipe.imageLink + "'>");
  for (var i = 0; i < recipe.ingredients.length; i++) {
    $("#recipe-ingredients").append("<li>" + recipe.ingredients[i] + "</li>");
  }
}

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

id:
NPzb8ahOVNyBlwN3P1MMBA
key:
HSWhkgIij86QmpUXuPC7iFos3yhztaghQpQ07E4NIZOlnkrL84OD8m2bSbAIXi10
