var apiKey = require('./../.env').apiKey;
var apiId = require('./../.env').apiId;

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

Food.prototype.getNutritionSingle = function(foodId, displayOne){
  $.get("https://api.nutritionix.com/v1_1/item?id=" + foodId + "&appId=" + apiId + "&appKey=" +  apiKey).then(function(response){
    var selectedFood = new Food(foodId, response.brand_name, response.item_name, response.nf_calories, response.nf_total_fat, response.nf_cholesterol, response.nf_sodium, response.nf_total_carbohydrate, response.nf_dietary_fiber, response.nf_sugars, response.nf_protein);
    displayOne(selectedFood);
  });
};

Food.prototype.getAllNutrition = function(searchFood, displayNutrition){
  $.get("https://api.nutritionix.com/v1_1/search/" + searchFood + "?&results=0%3A10&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id%2Cnf_calories%2Cnf_total_fat%2Cnf_cholesterol%2Cnf_sodium%2Cnf_dietary_fiber%2Cnf_total_carbohydrate%2Cnf_sugars%2Cnf_protein&appId=" + apiId + "&appKey=" + apiKey).then(function(response){
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
