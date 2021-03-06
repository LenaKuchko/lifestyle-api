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

// var getLocation = function(place){
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -33.8688, lng: 151.2195},
//     zoom: 8,
//     mapTypeId: "terrain"
//   });
//
//         // var input = document.getElementById('search-location');
//         var searchBox = new google.maps.places.SearchBox(place);
//         map.controls[google.maps.ControlPosition.TOP_LEFT].push(place);
//         console.log(searchBox);
//   var geocoder = new google.maps.Geocoder();
//   // console.log(address);
//   // var address = $("#search-location").val();
//   geocoder.geocode({'address' : place}, function(results, status){
//     if (status =="OK") {
//       var marker = new google.maps.Marker({
//         position: results[0].geometry.location,
//         map: map
//       });
//     } else {
//       console.log("Geocode was not successful for the following reason: " + status);
//     }
//   });
// };

var getLocation = function(){
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  //
  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));
  
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

$(document).ready(function(){
  // $("#location").submit(function(event){
  //   event.preventDefault();
  //   var place = $("#search-location").val();
    getLocation();
  // });
});

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
