/*
Créer un tag quand tape quelque chose dans la barre de recherche
ATTENTION ! Tri des cartes: 2 algo à faire*/

import Header from "./js/components/Header.js";
import Search from "./js/components/Search.js";
import RecipeCard from "./js/components/RecipeCard.js";
import SearchButton from "./js/components/SearchButton.js";
import Tag from "./js/components/Tag.js";
import recipes from "./recipes.js";

class Index {
	constructor() {
		this.recipes = recipes;
		this.displayHeader();
		this.displaySearch();
		this.displayRecipeCard(this.recipes);
		this.displayButtons(this.recipes);
		this.displayTag();
		this.removeTag();
	}

	displayHeader() {
		const headerContainer = document.querySelector(".headerContainer");
		const header = new Header();
		headerContainer.innerHTML += header.render();
	}

	displaySearch() {
		const searchContainer = document.querySelector(".searchContainer");
		const search = new Search();
		searchContainer.innerHTML += search.render();
	}

	displayRecipeCard(recipes) {
		const cardsContainer = document.querySelector(".cardsContainer");
		const cards = recipes.map((recipe) => {
			const recipeCard = new RecipeCard(recipe);
			return recipeCard.render();
		});
		//for each recipe, create a new card (array), then .join("") to string
		cardsContainer.innerHTML = cards.join("");
	}

	displayButtons(recipes) {
		const searchButtonContainer = document.querySelector(".searchButtonContainer");
		const searchButton = new SearchButton(recipes);
		searchButtonContainer.innerHTML += searchButton.render("Ingredients", "ingredients");
		searchButtonContainer.innerHTML += searchButton.render("Appareil ", "appliance");
		searchButtonContainer.innerHTML += searchButton.render("Ustensiles", "ustensils");
		searchButton.workingSearchButton();
	}

	displayTag() {
		const tagContainer = document.querySelector(".tagContainer");
		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "result") {
				const type = e.target.dataset.type;
				const content = e.target.textContent.trim();
				const tag = new Tag(type, content);
				// type = define class, content = define data-id and content - see Tag.js
				tagContainer.innerHTML += tag.render();
				e.target.style.display = "none";
				//if <li> clicked and transformed to tag, remove the <li> selected from the list of results (= a tag is unique)
				this.sortRecipeTag();
			}
		});
	}

	removeTag() {
		document.addEventListener("click", (e) => {
			//delete tag if click on the div containing icon and span (text)
			if (e.target.dataset.trigger === "tag") {
				e.target.remove();
				this.displayBackResult(e);
				this.sortRecipeTag();
			}
			//delete tag if click on icon and span (text)
			if (e.target.dataset.trigger === "tagDelete" || e.target.dataset.trigger === "tagContent") {
				e.target.parentNode.remove();
				this.displayBackResult(e);
				this.sortRecipeTag();
			}
		});
	}

	//if tag deleted, display back the corresponsing <li> result in the list of results
	displayBackResult(e) {
		const contentTag = e.target.dataset.id;
		const results = document.querySelectorAll(".searchButton__result");
		results.forEach((result) => {
			if (result.textContent.trim() === contentTag) {
				result.style.display = "block";
			}
		});
	}

	sortRecipeTag() {
		this.filteredRecipes = this.recipes;
		const tags = document.querySelectorAll(".tag");
		tags.forEach((tag) => {
			// if tag ingredient, filter all the recipes by this ingredient. return filteredRecipes filtered
			if (tag.classList.contains("tag-ingredients")) {
				const contentTag = tag.dataset.id;
				this.filteredRecipes = this.filteredRecipes.filter((recipe) => {
					return recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(contentTag));
				});
			}
			// if tag appliance, filter all the recipes by this apliance. return filteredRecipes filtered
			if (tag.classList.contains("tag-appliance")) {
				const contentTag = tag.dataset.id;
				this.filteredRecipes = this.filteredRecipes.filter((recipe) => {
					return recipe.appliance.toLowerCase().includes(contentTag);
				});
			}
			// if tag ustensils, filter all the recipes by this ustensils. return filteredRecipes filtered
			if (tag.classList.contains("tag-ustensils")) {
				console.log("red");
				const contentTag = tag.dataset.id;
				this.filteredRecipes = this.filteredRecipes.filter((recipe) => {
					return recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(contentTag));
				});
			}
		});
		// display new cards corresponding to the filter tags
		this.displayRecipeCard(this.filteredRecipes);
		// display message for "no result". remove message "no result" if results.
		const messageContainer = document.querySelector(".messageContainer");
		if (this.filteredRecipes.length == 0) {
			messageContainer.innerHTML = `
			<img src="./img/no_result.png" class="empty__image">
			<span class="empty__message">Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.</span>`;
		}else{
			messageContainer.innerHTML = "";
		}
	}
}

new Index();
