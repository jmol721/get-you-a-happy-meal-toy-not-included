// modal is triggered
$("#recipe-form-modal").on("show.bs.modal", function() {
    // clear value for next search
    $("#modalMainIngredient").val("");
});

// modal is fully visible
$("#recipe-form-modal").on("shown.bs.modal", function() {
    //highlight input area
    $("#modalMainIngredient").trigger("focus");
});

// find recipe button in modal clicked
$("#recipe-form-modal .btn-search").click(function() {
    // get user input values
    var mainIngredient = $("#modalMainIngredient").val().trim();
    var mealCategory = $("#category").val();
    console.log(mainIngredient, mealCategory);

    // use values to search API for data
    getRecipes(mainIngredient, mealCategory);
});

var getRecipes = function(ingredient, category) {
    // search mealdb API for recipes with main ingredient
    var apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php";

    fetch(apiUrl + "?s=" + ingredient)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        })

    // display search results
    // create links to each array recipe with for loop (with thumbnail image?)
    // capture user's option and send to new function displaying chosen recipe
}

var displayRecipe = function(recipe) {
    // list ingredients

    // list recipe instructions
}

var getJoke = function(ingredient) {
    var apiUrl = "";
}

var getGif = function(ingredient) {
    // search GIPHY API for ingredient related GIFs
    var apiUrl = "https://api.giphy.com/v1/gifs/search";

    fetch(apiUrl + "?=" + ingredient + "&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1")
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response.data[0]);
        })

    // display GIF

}