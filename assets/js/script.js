var recipeModalEl = document.querySelector("#recipe-form-modal");
var openModalEl = document.querySelector("#btn-open-modal");
var closeModalEl = document.querySelector(".btn-close");
var modalMainIngredientEl = document.querySelector("#modalMainIngredient");
var modalMealCategoryEl = document.querySelector("#category");
var searchRecipeEl = document.querySelector(".btn-search");


//modal is triggered
openModalEl.addEventListener("click", function(){
    // open modal
    recipeModalEl.style.display="block";

    // clear value for next search
    modalMainIngredientEl.value="";
    
    // highlight input area
});

// close the modal
closeModalEl.addEventListener("click", function() {

    // save recipe in recipeHistory array

    // save to localStorage

    recipeModalEl.style.display="none";
});

// find recipe button in modal clicked
searchRecipeEl.addEventListener("click", function() {
    // get user input values
    var mainIngredient = modalMainIngredientEl.value;
    var mealCategory = modalMealCategoryEl.value;
    console.log(mainIngredient, mealCategory);

    // use values to search API for data
    getRecipes(mainIngredient, mealCategory);
    getGif(mainIngredient);
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


// save recipe to localStorage
var saveRecipes = function () {

}

// load recipes from localStorate
var loadRecipes = function () {

}