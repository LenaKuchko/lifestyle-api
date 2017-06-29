var recipeKey = require('./../.env').recipeKey;
var recipeId = require('./../.env').recipeId;


Recipe = function(Name, Source, ImageLink, RecipeLink, Calories, Weight){
  this.name = Name;
  this.source = Source;
  this.imageLink = ImageLink;
  this.recipeLink = RecipeLink;
  this.calories = Calories;
  this.weight = Weight;
  this.ingredients = [];
};

Recipe.prototype.findRecipe = function (searchId, allRecipes, displayRecipeDetails) {
  for (var i = 0; i < allRecipes.length; i++) {
    if (allRecipes[i].weight == searchId) {
      displayRecipeDetails(allRecipes[i]);
    }
  }
};

Recipe.prototype.getRecipes = function(ingredient, displayAllRecipes){
  console.log(ingredient);
  $.get("https://api.edamam.com/search?q="+ ingredient + "&app_id=" + recipeId+ "&app_key=" + recipeKey + "&from=0&to=5&calories=gte%20100,%20lte%20400").then(function(response){
    var allRecipes = [];
    for(var i = 0; i < response.hits.length; i++)
    {
      var newRecipe = new Recipe(response.hits[i].recipe.label, response.hits[i].recipe.source, response.hits[i].recipe.image, response.hits[i].recipe.url, response.hits[i].recipe.calories, response.hits[i].recipe.totalWeight);
      newRecipe.ingredients = response.hits[i].recipe.ingredientLines;
      allRecipes.push(newRecipe);
    }
    console.log(response.hits[0]);
    // console.log(allRecipes);
    displayAllRecipes(allRecipes);
  });
};

exports.recipeModule = Recipe;
