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
