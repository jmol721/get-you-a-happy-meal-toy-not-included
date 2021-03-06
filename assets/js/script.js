// modal elements
var recipeModalEl = document.querySelector("#recipe-form-modal");
var openModalEl = document.querySelector("#btn-open-modal");
var closeModalEl = document.querySelector(".btn-close");
var modalMainIngredientEl = document.querySelector("#modalMainIngredient");
var modalMealCategoryEl = document.querySelector("#category");
var searchRecipeEl = document.querySelector(".btn-search");

// search results/recipe elements
var resultsContainerEl = document.querySelector("#results-container");
var recipeTitleEl = document.querySelector("#recipe-title");
var ingredientsListEl = document.querySelector("#ingredients");
var instructionsListEl = document.querySelector("#instructions");
var mainIngredient = "";
var mealCategory = "";
var listDisplayEl = document.getElementById("list-display");

var saveBtnContainerEl = document.querySelector("#save-btn-container");
var imageContainerEl = document.querySelector("#img-container");

//modal is triggered
openModalEl.addEventListener("click", function () {
    // open modal
    recipeModalEl.style.display = "block";

    // clear value for next search
    modalMainIngredientEl.value = "";
});

// close the modal
closeModalEl.addEventListener("click", function () {
    recipeModalEl.style.display = "none";
});

// find recipe button in modal clicked
searchRecipeEl.addEventListener("click", function () {
    // get user input values
    mainIngredient = modalMainIngredientEl.value;
    mealCategory = modalMealCategoryEl.value;
    console.log(mainIngredient, mealCategory);

    recipeModalEl.style.display = "none";


    // use values to search API for data
    getRecipes(mainIngredient, mealCategory);
    getGif(mainIngredient);
    getJoke();
});

var getRecipes = function (ingredient, category) {
    // search mealdb API for recipes with main ingredient
    if (ingredient !== null && ingredient !== "") {
    var apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php";

    fetch(apiUrl + "?s=" + ingredient)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            displayRecipeList(data);
        })
    }
    else if (category !== "Select a Category") {
        // search mealdb API for recipes by category
        var apiUrlCat = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

        fetch(apiUrlCat + category)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                displayRecipeList(data);
            })

        getGif(category);
    }
    else {
        console.log("Enter a main ingredient or category");
    }

}

// display search results
// capture user's option and send to new function displaying chosen recipe
var displayRecipeList = function (data) {

    // clear previous search results list
    listDisplayEl.innerHTML = "";

    // clear previous recipe guide
    recipeTitleEl.innerHTML = '';
    ingredientsListEl.innerHTML = '';
    instructionsListEl.innerHTML = '';
    //clear save button
    saveBtnContainerEl.innerHTML = '';
    //clear image
    imageContainerEl.innerHTML = '';


    for (var i = 0; i < data.meals.length; i++) {
        // add text content to heading: Choose a recipe to try!
        var listHeader = document.getElementById("list-header");
        listHeader.innerHTML = 'Choose a recipe to try!';
        // create list links or buttons of options 
        var listDisplayLi = document.createElement("li");
        // listDisplayLi.className = 'recipe-list';
        listDisplayLi.setAttribute('class', 'recipe-list');
        var listDisplayBtn = document.createElement("button");
        listDisplayBtn.setAttribute("id", data.meals[i].idMeal);
        listDisplayBtn.textContent = data.meals[i].strMeal;
        listDisplayEl.appendChild(listDisplayLi);
        listDisplayLi.appendChild(listDisplayBtn);

        // addEventListener for user's click/choice from the recipe list
        listDisplayBtn.addEventListener("click", function() {
            console.log(this.id);

            //clear header
            listHeader.innerHTML = '';

            // send id number to getRecipe
            getRecipe(this.id);
        })
    }
}


// find recipe by id number to load recipe book/favorites
var getRecipe = function (mealId) {
    var apiUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="

    fetch(apiUrl + mealId)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // send recipe to be displayed
            displayRecipe(data);
        })
}

// display chosen recipe in results container
var displayRecipe = function (recipe) {
    console.log(recipe.meals[0]);
    var mealName = recipe.meals[0].strMeal;
    console.log(mealName);
    var mealId = recipe.meals[0].idMeal;
    console.log(mealId);

    var ingredientList = [];
    var measurementList = [];

    // clear search results list
    listDisplayEl.innerHTML = "";

    // display dish title
    recipeTitleEl.textContent = mealName;

    // get ingredients and measurements
    for (var i = 1; i < 21; i++) {
        var ingredients = recipe.meals[0]["strIngredient" + i];
        var measurements = recipe.meals[0]["strMeasure" + i];
        ingredientList.push(ingredients);
        measurementList.push(measurements);
    }

    // display measurements and ingredients
    ingredientsListEl.innerHTML = "<b>Ingredients:</b>";

    for (var i = 0; i < ingredientList.length; i++) {
        if (ingredientList[i] !== null) {
            var recipeAmt = document.createElement("li");
            recipeAmt.textContent = measurementList[i] + "  " + ingredientList[i];
            ingredientsListEl.appendChild(recipeAmt);
        }
    }

    // get instructions from API data
    var instructions = recipe.meals[0].strInstructions;
    var paragraphs = instructions.split(".");

    // display instructions
    instructionsListEl.innerHTML = "<b>Instructions:</b>";
    for (var i = 0; i < paragraphs.length-1; i++) {
        var instructions = document.createElement("li");
        instructions.textContent = paragraphs[i];
        instructionsListEl.appendChild(instructions);
    }

    // get image from API data
    var imgSrc = recipe.meals[0].strMealThumb;
    var mealImg = document.createElement("img");
    mealImg.setAttribute("src", imgSrc);
    mealImg.setAttribute("width", "350px");
    mealImg.setAttribute("height", "280px");

    // display image
    imageContainerEl.innerHTML = "";
    imageContainerEl.appendChild(mealImg);

    // create buttons: save to recipe box or back to list
    var addRecipe = document.createElement("button");
    addRecipe.setAttribute("id", "btn-addRecipe");
    addRecipe.className = "btn";
    addRecipe.textContent = "Add to Recipe Stash";
    var returnList = document.createElement("button");
    returnList.setAttribute("id", "btn-returnList");
    returnList.className = "btn";
    returnList.textContent = "Back to Recipe List";
    saveBtnContainerEl.appendChild(addRecipe);
    saveBtnContainerEl.appendChild(returnList);

    // when user clicks add recipe button, save to recipeStash []
    addRecipe.addEventListener("click", function() {
        console.log("click add");

        // create recipe object
        var recipeObj = { name: mealName, id: mealId};
        // push object to recipeStash []
        // recipeStash.push(recipeObj);
        // console.log("recipe Stash", recipeStash);

        saveRecipes(recipeObj);
    });

    // when user clicks return to list, send user back to search results
    returnList.addEventListener("click", function() {
        // clear previous recipe before displaying search results list
        recipeTitleEl.textContent = "";
        imageContainerEl.innerHTML = "";
        ingredientsListEl.innerHTML = ""; 
        instructionsListEl.innerHTML = "";
        saveBtnContainerEl.innerHTML = "";

        getRecipes(mainIngredient, mealCategory);
    });
}

var getJoke = function (ingredient) {
    var apiUrl = "https://api.chucknorris.io/jokes/random";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data.value)
            var jokeContainerEl = document.querySelector("#joke-div");
            jokeContainerEl.innerHTML = data.value;
        });
}

var getGif = function (ingredient) {
    // search GIPHY API for ingredient related GIFs
    var apiUrl = "https://api.giphy.com/v1/gifs/search";

    fetch(apiUrl + "?q=" + ingredient + "&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=20")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // display gif
            console.log(response);
            if (response.data.length === 0) {
                console.log('Giphy could not find anything for that.');
            } else {
                console.log(response.data[0]);
                var gifContainerEl = document.querySelector('#gif-container');
                gifContainerEl.innerHTML = '';
                var gifImg = document.createElement('img');
                var randomGif = Math.floor(Math.random()*response.data.length);
                gifImg.setAttribute('src', response.data[randomGif].images.fixed_height.url);
                // gifImg.setAttribute('class', 'gif-img');
                gifContainerEl.appendChild(gifImg);
            }
        })
}

//load recipes from Recipe Stash
var previousRecipes = function(event) {
    console.log('previous recipe', event);
    console.log('event target', event.target);

    getRecipe(event.target.id);
    saveBtnContainerEl.innerHTML = "";
}

// save recipe to localStorage
var saveRecipes = function (recipeObj) {
    var savedRecipies = [];
    var localRecipeStash = localStorage.getItem('saved-recipes');
    if (localRecipeStash !== null) {
        savedRecipies = JSON.parse(localRecipeStash);
    }
    savedRecipies.push(recipeObj);
    localStorage.setItem('saved-recipes', JSON.stringify(savedRecipies));

    var recipeList = document.getElementById("recipe-box");
    var recipeDivs = document.createElement('div');
    recipeDivs.textContent = recipeObj.name;
    recipeDivs.setAttribute('id', recipeObj.id);
    recipeDivs.setAttribute('class', 'stash-box-recipes');
    recipeDivs.onclick = function(event) {
        previousRecipes(event);
    }

    recipeList.appendChild(recipeDivs);
}

// load recipes from localStorate
var loadRecipes = function () {
    var preloadedRecipeList = JSON.parse(localStorage.getItem('saved-recipes'));
    var recipeList = document.getElementById("recipe-box");
    

    if (preloadedRecipeList !== null) {
        for (var i = 0; i < preloadedRecipeList.length; i++) {
            var recipeDivs = document.createElement('div');
            recipeDivs.textContent = preloadedRecipeList[i].name;
            recipeDivs.setAttribute('id', preloadedRecipeList[i].id)
            recipeDivs.setAttribute('class', 'stash-box-recipes');
            console.log('new', recipeDivs);
            console.log(preloadedRecipeList[i].id);
            recipeDivs.onclick = function(event) {
                previousRecipes(event);
            }

            recipeList.appendChild(recipeDivs);
        }
    }
}

loadRecipes();