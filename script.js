// document.addEventListener('DOMContentLoaded', () => {
//     const recipesContainer = document.getElementById('recipe-list');
//     const recipeDetail = document.getElementById('recipe-detail');
//     const searchForm = document.querySelector('form');

//     let recipes = [];

//     function fetchRecipes(query) {
//         fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`)
//             .then(response => response.json())
//             .then(data => {
//                 recipes = data.data.recipes;
//                 displayRecipes(recipes);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     }

//     function displayRecipes(recipes) {
//         recipesContainer.innerHTML = '';
//         recipes.forEach(recipe => {
//             const recipeElement = document.createElement('div');
//             recipeElement.classList.add('recipe-item');
//             recipeElement.dataset.id = recipe.id;

//             const recipeImage = document.createElement('img');
//             recipeImage.src = recipe.image_url;
//             recipeImage.alt = recipe.title;

//             const recipeTitle = document.createElement('span');
//             recipeTitle.textContent = recipe.title;

//             recipeElement.appendChild(recipeImage);
//             recipeElement.appendChild(recipeTitle);
//             recipeElement.addEventListener('click', () => displayRecipeDetail(recipe.id));

//             recipesContainer.appendChild(recipeElement);
//         });
//     }

//     function displayRecipeDetail(id) {
//         const recipe = recipes.find(recipe => recipe.id === id);
//         if (recipe) {
//             recipeDetail.innerHTML = `
//                 <h2>${recipe.title}</h2>
//                 <img src="${recipe.image_url}" alt="${recipe.title}" class="recipe-detail">
//                 <p><strong>Publisher:</strong> ${recipe.publisher}</p>
//                 <p><strong>Source URL:</strong> <a href="${recipe.source_url}" target="_blank">${recipe.source_url}</a></p>
//             `;
//         }
//     }

//     searchForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const searchQuery = document.querySelector('.search1').value;
//         fetchRecipes(searchQuery);
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const recipesContainer = document.getElementById('recipe-list');
    const recipeDetail = document.getElementById('recipe-detail');
    const searchForm = document.querySelector('form');

    let recipes = [];

    function fetchRecipes(query) {
        fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the data to check the API response
                if (data.results === 0) {
                    recipesContainer.innerHTML = '<p>No recipes found for your search.</p>';
                    return;
                }
                recipes = data.data.recipes;
                displayRecipes(recipes);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                recipesContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
            });
    }

    function displayRecipes(recipes) {
        recipesContainer.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe-item');
            recipeElement.dataset.id = recipe.id;

            const recipeImage = document.createElement('img');
            recipeImage.src = recipe.image_url;
            recipeImage.alt = recipe.title;

            const recipeTitle = document.createElement('span');
            recipeTitle.textContent = recipe.title;

            recipeElement.appendChild(recipeImage);
            recipeElement.appendChild(recipeTitle);
            recipeElement.addEventListener('click', () => displayRecipeDetail(recipe.id));

            recipesContainer.appendChild(recipeElement);
        });
    }

    function displayRecipeDetail(id) {
        const recipe = recipes.find(recipe => recipe.id === id);
        if (recipe) {
            recipeDetail.innerHTML = `
                <h2>${recipe.title}</h2>
                <img src="${recipe.image_url}" alt="${recipe.title}" class="recipe-detail">
                <p><strong>Publisher:</strong> ${recipe.publisher}</p>
                <p><strong>Source URL:</strong> <a href="${recipe.source_url}" target="_blank">${recipe.source_url}</a></p>
            `;
        }
    }

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchQuery = document.querySelector('.search1').value.trim();
        if (searchQuery) {
            fetchRecipes(searchQuery);
        } else {
            recipesContainer.innerHTML = '<p>Please enter a search term.</p>';
        }
    });
});
