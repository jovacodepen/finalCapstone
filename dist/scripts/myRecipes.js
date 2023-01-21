// SLIGHT variatons in the code required a secondary JS file. Includes the add comment function 


// CLASSES
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


// DOM ELEMENTS 
// RECIPE.HTML
let recipeName = document.querySelector(".recipe-name");
let recipeComment = document.querySelector(".recipe-comment");
let recipeForm = document.querySelector(".recipe-form");
let recipeImg = document.querySelector(".recipe-img");
let inputComment = document.querySelector(".input-comment");
let commentSubmit = document.querySelector(".comment-submit");
let saveRecipe = document.querySelector(".save-recipe");
let likeRecipe = document.querySelector(".like-recipe");
let recipeRow = document.querySelector(".recipe-card-row");

// FUNCTIONS 
const setRecipeStorage = (string, array) => {
    let jsonString = JSON.stringify(array);
    localStorage.setItem(string, jsonString);
}

const getRecipeStorage = (string) => {
    return jsonObj = JSON.parse(localStorage.getItem(string))
};

const renderSeedMeals = (jsonObject) => {
    recipeRow.innerHTML = " ";

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
                        ${arrayPrint(recipe.comments)}
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
        } else if(recipe.isLiked === false || recipe.isSaved === true) {
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
                            ${arrayPrint(recipe.comments)}
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
                              <span href="#" class="btn like-recipe">Like recipe</span>
                            </div>
                        </div>
                      </div>
                </div>
                <!-- END OF CARD -->
                `
                recipeRow.insertAdjacentHTML('beforeend', newRecipe);
            } 
            else if(jsonObject = " "){
                alert("Nothing saved! Go to all recipes and save a meal")
            }

          }
    }

const saveRecipeFunction = (e) => {
    let seedMeals = getRecipeStorage('seedMeals');
    let savedMeals = getRecipeStorage('savedMeals');

    if(e.target.classList.contains('save-recipe')){
        let targetName = e.target.parentNode.parentNode.firstElementChild.textContent;

        for(meal of seedMeals){
            if(meal.name === targetName){
                meal.isSaved = true;
                savedMeals.push(meal);
                e.target.classList.remove('save-recipe');
                e.target.classList.add('unsave-recipe');
                e.target.textContent = "Unsave";
            }
        }
        setRecipeStorage('savedMeals', savedMeals);
        setRecipeStorage('seedMeals', seedMeals);

        alert(`You have ${getRecipeStorage('savedMeals').length} items in your save for later`);
        renderSeedMeals(getRecipeStorage('savedMeals'))

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
            }
            setRecipeStorage('seedMeals', seedMeals);
        }

        setRecipeStorage('savedMeals', savedMeals);
        renderSeedMeals(getRecipeStorage('savedMeals'));
        alert(`You have ${getRecipeStorage('savedMeals').length} items in your save for later`);

    }

}

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

// NEW FUNCTION FOR MY RECIPES 
const addComment = (e) => {
    e.preventDefault()

    // All localStorage lists are first retrieved 
    let savedMeals = getRecipeStorage('savedMeals');
    let likedMeals = getRecipeStorage('likedMeals');
    let seedMeals = getRecipeStorage('seedMeals');


    if(e.target.classList.contains('comment-submit')){
      // variables  holding the target recipes are located via DOM tree navigation
        let targetName = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.firstElementChild.textContent;
        let commentInput = e.target.parentNode.parentNode.firstElementChild.firstElementChild.nextSibling.nextSibling;

        // Saved meals are looped through to find a match, then the comment input is pushed into the comments property and the savedMeals array re-set into local storage 
        for(meal of savedMeals){
            if(meal.name === targetName){
                meal.comments.push(commentInput.value);
                setRecipeStorage('savedMeals', savedMeals);
            }
        }

                //Seed meals are looped through to find a match, then the comment input is pushed into the comments property and the savedMeals array re-set into local storage 
        for(meal of seedMeals){
            if(meal.name === targetName){
                meal.comments.push(commentInput.value);
                setRecipeStorage('seedMeals', seedMeals);
            }
        }
        renderSeedMeals(getRecipeStorage('savedMeals'));
        alert("Comment added!")
    }
}

const init = () => {
    if(getRecipeStorage('savedMeals') === null){
      let savedMeals = [];
      setRecipeStorage('savedMeals', savedMeals);
    } if(getRecipeStorage('likedMeals') === null){
      let likedMeals = [];
      setRecipeStorage('likedMeals', likedMeals);
    } if(getRecipeStorage('seedMeals') === null){
      let seedMeals = [carbonara, chorizoBake, chocCake];
      setRecipeStorage('seedMeals', seedMeals);
      renderSeedMeals(getRecipeStorage('seedMeals'));
    }
    else {
      getRecipeStorage('savedMeals');
      renderSeedMeals(getRecipeStorage('savedMeals'));
        console.log("Local storage is not empty ")
    }
  }
  
  init()


// EVENT LISTENERS 
recipeRow.addEventListener('click', saveRecipeFunction);
recipeRow.addEventListener('click', likeRecipeFunction);
recipeRow.addEventListener('click', addComment);







