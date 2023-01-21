// CLASSES

// Class constructor initialised to create new instances of recipes 
class Recipe {
    constructor(name, img, ingredients = [], comments = [], isLiked = false, isSaved = false){
        this.name = name,
        this.img = img,
        this.ingredients = ingredients,
        this.comments = comments,
        this.isLiked = isLiked,
        this.isSaved = isSaved
    }
}


// SEED DATA 

// These are example instances to populate the local storage for the site to work 
let carbonara = new Recipe ("Carbonara", "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80", ["100g pancetta", "50g pecorino cheese", "50g parmesan", "3 large eggs", "350g spaghetti", "2 plump garlic gloves", "50g unsalted butter"]);
let chorizoBake = new Recipe("Chorizo and Mozzarella Gnocchi", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/gnocchi-1d16725.jpg?quality=90&webp=true&resize=440,400", ["1 tbsp olive oil", "1 onion", "2 garlic cloves", "120g chorizo", "2 x 400g cans chopped tomatoes", "1 tsp caster sugar", "600g fresh gnocchi", "125g mozzarella ball", "small bunch of basil", "green salad"]);
let chocCake = new Recipe("Chocolate Fudge Cake", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chocolate-fudge-cake-91de17a.jpg?quality=90&webp=true&resize=220,200", ["150ml sunflower oil", "175g self-raising flour", "2 tbsp cocoa powder", "1 tsp bicarbonate of soda", "150g caster sugar", "2 tbsp golden syrup", "2 large eggs", "150ml semi-skimmed milk"]);

// DOM ELEMENTS 

// All DOM elements are grouped together for ease of reference
let recipeName = document.querySelector(".recipe-name");
let recipeComment = document.querySelector(".recipe-comment");
let recipeForm = document.querySelector(".recipe-form");
let recipeImg = document.querySelector(".recipe-img");
let inputComment = document.querySelector(".input-comment");
let commentSubmit = document.querySelector(".comment-submit");
let saveRecipe = document.querySelector(".save-recipe");
let likeRecipe = document.querySelector(".like-recipe");
let recipeRow = document.querySelector(".recipe-card-row");

// FUNCTIONS grouped togeter 

// This function cuts down on repetition of setting localStorage data. It accepts a string and array repsenting the localStorage data 
const setRecipeStorage = (string, array) => {
    let jsonString = JSON.stringify(array);
    localStorage.setItem(string, jsonString);
}

// This function cuts down on repetition of getting localStorage data. It accepts a string representing the key for the localStorage data 
const getRecipeStorage = (string) => {
    return jsonObj = JSON.parse(localStorage.getItem(string))
};

// This function renders the data retrived from the localStorage. It is called when the saveFunction and likeFunction are called. 

// Function accepts a passed in jsonObject 
const renderSeedMeals = (jsonObject) => {

  // The container is clered of all existing HTML to prevent duplication in the client side interface 
  recipeRow.innerHTML = " ";

  // For each recipe a function is run that accepts an array object and save each item in the array to a variable called list. This is to unpack the values from both the ingredients and comment arrays  
  for(recipe of jsonObject){
      let arrayPrint = (itemArray) => {
          let list = "";
          if(itemArray.length === 0){
              list = `<li class="list-group-item">No items</li>`
          } else {
              for(item of itemArray){
                  list += `<li class="list-group-item">${item}</li>` 
              }
          }
          return list
      };

      // These if statements check for certain properties to determine both what style the UI buttons should be (and their text content) but also whether to remove or add data to the local storage 
      if(recipe.isLiked === true){
          let newRecipe = `
          <!-- CARD ONE -->
          <div class="col-sm-12 col-md-4 recipe-card" id="${jsonObject.indexOf(recipe)}">
              <div class="card" style="width: 100%;">
                  <img src="${recipe.img}" class="card-img-top recipe-img" alt="...">
                  <div class="card-body">
                    <h5 class="card-title recipe-name">${recipe.name}</h5>
  
  
                    <!-- RECIPE LIST BLOCK  -->
                    <div id="recipe-list-button">
                      <a class="comments-btn" data-bs-toggle="collapse" href="#comment-${String(jsonObject.indexOf(recipe))}" role="button" aria-expanded="false" aria-controls="recipe-list-container">
                        Recipe <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                      </a>
                  </div>
  
                    <div class="collapse" id="comment-${String(jsonObject.indexOf(recipe))}">
                      <div class="card card-body card-comment recipe-comment">
                          <ul class="list-group">
                              ${arrayPrint(recipe.ingredients)}
                            </ul>
                      </div>
  
                    </div>

                    <div id="comments-button">
                      <a class="comments-btn" data-bs-toggle="collapse" href="#comments-container" role="button" aria-expanded="false" aria-controls="comments-container">
                        Comments <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                      </a>
                  </div>

                    <div class="collapse" id="comments-container">
                      <div class="card card-body card-comment">
                        Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                      </div>

                      <div class="card card-body" id="card-form-container">
                          <h3 id="card-form-header">Add a comment</h3>

                          <form id="card-form recipe-form">
                              <div class="mb-3">
                                <label for="user-comment" class="form-label">Comment</label>
                                <textarea class="form-control mb-3 input-comment"></textarea>
                                  <a class="btn btn-primary comment-submit">Submit</a>
                              </div>
                            </form>

                        </div>

                    </div>
  
                  <!-- BUTTON BLOCK -->
                    <div class="btn-container">
                        <span href="#" class="btn unsave-recipe">Unsave</span>
                        <span href="#" class="btn unlike-recipe">Unlike recipe</span>
                      </div>
                  </div>
                </div>
          </div>
          <!-- END OF CARD -->
          `
          recipeRow.insertAdjacentHTML('beforeend', newRecipe);
      } else if(recipe.isLiked === false && recipe.isSaved === false) {
              let newRecipe = `
              <!-- CARD ONE -->
              <div class="col-sm-12 col-md-4 recipe-card" id="${jsonObject.indexOf(recipe)}">
                  <div class="card" style="width: 100%;">
                      <img src="${recipe.img}" class="card-img-top recipe-img" alt="...">
                      <div class="card-body">
                        <h5 class="card-title recipe-name">${recipe.name}</h5>
      
      
                        <!-- RECIPE LIST BLOCK  -->
                        <div id="recipe-list-button">
                          <a class="comments-btn" data-bs-toggle="collapse" href="#comment-${String(jsonObject.indexOf(recipe))}" role="button" aria-expanded="false" aria-controls="recipe-list-container">
                            Recipe <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                          </a>
                      </div>
      
                        <div class="collapse" id="comment-${String(jsonObject.indexOf(recipe))}">
                          <div class="card card-body card-comment recipe-comment">
                              <ul class="list-group">
                                  ${arrayPrint(recipe.ingredients)}
                                </ul>
                          </div>
      
                        </div>

      
                      <!-- BUTTON BLOCK -->
                        <div class="btn-container">
                            <span href="#" class="btn save-recipe">Save to my recipes</span>
                            <span href="#" class="btn like-recipe">Like recipe</span>
                          </div>
                      </div>
                    </div>
              </div>
              <!-- END OF CARD -->
              `
              recipeRow.insertAdjacentHTML('beforeend', newRecipe);
          } else if(recipe.isSaved === true) {
            let newRecipe = `
              <!-- CARD ONE -->
              <div class="col-sm-12 col-md-4 recipe-card" id="${jsonObject.indexOf(recipe)}">
                  <div class="card" style="width: 100%;">
                      <img src="${recipe.img}" class="card-img-top recipe-img" alt="...">
                      <div class="card-body">
                        <h5 class="card-title recipe-name">${recipe.name}</h5>
      
      
                        <!-- RECIPE LIST BLOCK  -->
                        <div id="recipe-list-button">
                          <a class="comments-btn" data-bs-toggle="collapse" href="#comment-${String(jsonObject.indexOf(recipe))}" role="button" aria-expanded="false" aria-controls="recipe-list-container">
                            Recipe <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                          </a>
                      </div>
      
                        <div class="collapse" id="comment-${String(jsonObject.indexOf(recipe))}">
                          <div class="card card-body card-comment recipe-comment">
                              <ul class="list-group">
                                  ${arrayPrint(recipe.ingredients)}
                                </ul>
                          </div>
      
                        </div>

      
                        <div class="btn-container">
                            <span href="#" class="btn unsave-recipe">Unsave</span>
                            <span href="#" class="btn like-recipe">Like recipe</span>
                          </div>
                      </div>
                    </div>
              </div>`

              recipeRow.insertAdjacentHTML('beforeend', newRecipe);
          } else {
            let newRecipe = `
              <!-- CARD ONE -->
              <div class="col-sm-12 col-md-4 recipe-card" id="${jsonObject.indexOf(recipe)}">
                  <div class="card" style="width: 100%;">
                      <img src="${recipe.img}" class="card-img-top recipe-img" alt="...">
                      <div class="card-body">
                        <h5 class="card-title recipe-name">${recipe.name}</h5>
      
      
                        <div id="recipe-list-button">
                          <a class="comments-btn" data-bs-toggle="collapse" href="#comment-${String(jsonObject.indexOf(recipe))}" role="button" aria-expanded="false" aria-controls="recipe-list-container">
                            Recipe <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                          </a>
                      </div>
      
                        <div class="collapse" id="comment-${String(jsonObject.indexOf(recipe))}">
                          <div class="card card-body card-comment recipe-comment">
                              <ul class="list-group">
                                  ${arrayPrint(recipe.ingredients)}
                                </ul>
                          </div>
      
                        </div>

      
                        <div class="btn-container">
                            <span href="#" class="btn unsave-recipe">Save to my recipes</span>
                            <span href="#" class="btn like-recipe">Like recipe</span>
                          </div>
                      </div>
                    </div>
              </div>
              <!-- END OF CARD -->`

              recipeRow.insertAdjacentHTML('beforeend', newRecipe);
          }
          
        }
  }


  // This function is to save and unsave recipes to local storage
const saveRecipeFunction = (e) => {

  // variables save the json objects from local storage from the seed and saved meals localStorage.
    let seedMeals = getRecipeStorage('seedMeals');
    let savedMeals = getRecipeStorage('savedMeals')

    // The if statement checks if the clicked item contains 'save-recipe'. This indicates the recipe should be saved to the local storage
    if(e.target.classList.contains('save-recipe')){

      // Saves the recipe name to a variable
        let targetName = e.target.parentNode.parentNode.firstElementChild.textContent;

      // For loop checks if the targetName value matches a seedMeal object name. If it does, the statement block runs
        for(meal of seedMeals){
            if(meal.name === targetName){

              // the meal.isSaved property is first updated in the seedMeals list. 
                meal.isSaved = true;

                // The meal is then pushed into the savedMeals array, the button updated in class list 
                savedMeals.push(meal);
                e.target.classList.remove('save-recipe');
                e.target.classList.add('unsave-recipe');
                e.target.textContent = "Unsave";
            }
        }

        // The saved and seed meal arrays now updated, are set to the localStorage 
        setRecipeStorage('savedMeals', savedMeals);
        setRecipeStorage('seedMeals', seedMeals);

        // An alert tells the user how many items they have saved 
        alert(`You have ${getRecipeStorage('savedMeals').length} items in your save for later`);

        // This else statement block works the same as the above, but for un-saving the recipe from the localStorage and removing it from the UI. 
    } else if(e.target.classList.contains('unsave-recipe')){
        let targetName = e.target.parentNode.parentNode.firstElementChild.textContent;

        for(meal of savedMeals){
            if(meal.name === targetName){
                meal.isSaved = false;
                console.log(savedMeals.indexOf(meal))
                let removedItem = savedMeals.splice(savedMeals.indexOf(meal), 1);
                e.target.classList.remove('unsave-recipe');
                e.target.classList.add('save-recipe');
                e.target.textContent = "Save to my recipes";
            }
        }
        for(meal of seedMeals){
          if(meal.name === targetName){
            console.log("hello")
              meal.isSaved = false;
              e.target.classList.remove('unsave-recipe');
              e.target.classList.add('save-recipe');
              e.target.textContent = "Save to my recipes";
          }
          setRecipeStorage('seedMeals', seedMeals);
      }

        setRecipeStorage('savedMeals', savedMeals);
        alert(`You have ${getRecipeStorage('savedMeals').length} items in your save for later`);

    }

}

// The like function works in the same way as the saveFunction, but updated the meal properties for localStorage keys for seedMeals, likedMeals and savedMeals. This would be much easier to maintain in an express app vs doing manually through JS. 
const likeRecipeFunction = (e) => {
  let seedMeals = getRecipeStorage('seedMeals');
  let likedMeals = getRecipeStorage('likedMeals');
  let savedMeals = getRecipeStorage('savedMeals');

  if(e.target.classList.contains('like-recipe')){
      let targetName = e.target.parentNode.parentNode.firstElementChild.textContent;

      for(meal of seedMeals){
          if(meal.name === targetName){
              meal.isLiked = true;
              likedMeals.push(meal);
              e.target.classList.remove('like-recipe');
              e.target.classList.add('unlike-recipe');
              e.target.textContent = "Unlike";
          }
          setRecipeStorage('seedMeals', seedMeals);
      }

      for(meal of savedMeals){
          if(meal.name === targetName){
              meal.isLiked = true;
              e.target.classList.remove('like-recipe');
              e.target.classList.add('unlike-recipe');
              e.target.textContent = "Unlike";
          }
          setRecipeStorage('savedMeals', savedMeals);
          setRecipeStorage('likedMeals', likedMeals);
      }


  } else if(e.target.classList.contains('unlike-recipe')){
      let targetName = e.target.parentNode.parentNode.firstElementChild.textContent;

      for(meal of savedMeals){
          if(meal.name === targetName){
              meal.isLiked = false;
              console.log(savedMeals.indexOf(meal))
              e.target.classList.remove('unlike-recipe');
              e.target.classList.add('like-recipe');
              e.target.textContent = "Like";
          }
          setRecipeStorage('savedMeals', savedMeals);
          setRecipeStorage('likedMeals', likedMeals);
      }
      for(meal of seedMeals){
        if(meal.name === targetName){
          console.log("hello")
            meal.isLiked = false;
        }
        setRecipeStorage('seedMeals', seedMeals);
    }

  }

}

// This init function first checks if there is any local storage for any of the data lists. 
const init = () => {

  // If there is no 'savedMeals' localStorage key, then it is initialised as a variable and set to the localStorage 
  if(getRecipeStorage('savedMeals') === null){
    let savedMeals = [];
    setRecipeStorage('savedMeals', savedMeals);

    // If there is no 'likedMeals' localStorage key, then it is initialised as a variable and set to the localStorage 
  } if(getRecipeStorage('likedMeals') === null){
    let likedMeals = [];
    setRecipeStorage('likedMeals', likedMeals);

    // If there is no 'seedMeals' localStorage key, then it is initialised as a variable and set to the localStorage 
  } if(getRecipeStorage('seedMeals') === null){
    let seedMeals = [carbonara, chorizoBake, chocCake];
    setRecipeStorage('seedMeals', seedMeals);
    renderSeedMeals(getRecipeStorage('seedMeals'));
  }

  // If there is data, then the seedMeals array is retrieved from the localStroage and rendered. 
  else {
    getRecipeStorage('seedMeals');
    renderSeedMeals(getRecipeStorage('seedMeals'));
      console.log("Local storage is not empty ")
  }
}


// Init function is called on each load. 
init()


// EVENT LISTENERS 
recipeRow.addEventListener('click', saveRecipeFunction);
recipeRow.addEventListener('click', likeRecipeFunction);







