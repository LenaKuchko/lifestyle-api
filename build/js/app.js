(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.nutritionKey = "e2777152d3c1e74ad0d5c16ad5800a55";
exports.nutritionId = "c37ad869";
exports.recipeKey = "9709182c56a173fa5ffcabb53c514245";
exports.recipeId = "9593a6fa";

},{}],2:[function(require,module,exports){
var nutritionKey = require('./../.env').nutritionKey;
var nutritionId = require('./../.env').nutritionId;

Food = function(Id, BrandName, Name, Calories, Fat, Cholesterol, Sodium, Carbs, Fiber, Sugars, Proteins){
  this.id = Id;
  this.brandName = BrandName;
  this.name = Name;
  this.calories = Calories;
  this.fat = Fat;
  this.cholesterol = Cholesterol;
  this.sodium = Sodium;
  this.carbs = Carbs;
  this.fiber = Fiber;
  this.sugars = Sugars;
  this.proteins = Proteins;
};
// Food.prototype.getNutritionSingle = function(foodName, displayOne){
//   $.get("https://api.nutritionix.com/v1_1/item?id=" + foodId + "&appId=" + nutritionId + "&appKey=" +  nutritionKey).then(function(response){
//     var selectedFood = new Food(foodId, response.brand_name, response.item_name, response.nf_calories, response.nf_total_fat, response.nf_cholesterol, response.nf_sodium, response.nf_total_carbohydrate, response.nf_dietary_fiber, response.nf_sugars, response.nf_protein);
//     displayOne(selectedFood);
//   });
// };
Food.prototype.getNutritionSingle = function(foodId, displayOne){
  $.get("https://api.nutritionix.com/v1_1/item?id=" + foodId + "&appId=" + nutritionId + "&appKey=" +  nutritionKey).then(function(response){
    var selectedFood = new Food(foodId, response.brand_name, response.item_name, response.nf_calories, response.nf_total_fat, response.nf_cholesterol, response.nf_sodium, response.nf_total_carbohydrate, response.nf_dietary_fiber, response.nf_sugars, response.nf_protein);
    displayOne(selectedFood);
  });
};

Food.prototype.getAllNutrition = function(searchFood, displayNutrition){
  $.get("https://api.nutritionix.com/v1_1/search/" + searchFood + "?&results=0%3A10&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id%2Cnf_calories%2Cnf_total_fat%2Cnf_cholesterol%2Cnf_sodium%2Cnf_dietary_fiber%2Cnf_total_carbohydrate%2Cnf_sugars%2Cnf_protein&appId=" + nutritionId + "&appKey=" + nutritionKey).then(function(response){
    // console.log(response);
    var nutrition = [];
    for(var i = 0; i < response.hits.length; i++){
      var newFood = new Food(response.hits[i].fields.item_id, response.hits[i].fields.brand_name, response.hits[i].fields.item_name, response.hits[i].fields.nf_calories, response.hits[i].fields.nf_total_fat, response.hits[i].fields.nf_cholesterol, response.hits[i].fields.nf_sodium, response.hits[i].fields.nf_total_carbohydrate, response.hits[i].fields.nf_dietary_fiber, response.hits[i].fields.nf_sugars, response.hits[i].fields.nf_protein);
      nutrition.push(newFood);
    }
    displayNutrition(nutrition);
  });
};







exports.foodModule = Food;
// https://api.edamam.com/search?q=chicken&app_id=" + recipeId + "&app_key=" + recipeKey + "&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-free

},{"./../.env":1}],3:[function(require,module,exports){
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

},{"./../.env":1}],4:[function(require,module,exports){
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

},{"./../js/food.js":2,"./../js/recipe.js":3}]},{},[4]);
