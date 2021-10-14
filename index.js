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
				const content = e.target.textContent;
				const tag = new Tag(type, content);
				tagContainer.innerHTML += tag.render();
				e.target.style.display = "none";
				//if <li> clicked and transformed to tag, remove the <li> selected from the list of results (= a tag is unique)
				this.sortRecipeTag();
			}
		});
	}

	removeTag() {
		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "tag") {
				e.target.remove();
				this.displayBackResult(e);
			}
			if (e.target.dataset.trigger === "tagDelete" || e.target.dataset.trigger === "tagContent") {
				e.target.parentNode.remove();
				this.displayBackResult(e);
			}
		});
	}

	//if tag deleted, display back the corresponsing <li> result in the list of results
	displayBackResult(e) {
		const content = e.target.dataset.id;
		const results = document.querySelectorAll(".searchButton__result");
		results.forEach((result) => {
			if (result.textContent === content) {
				result.style.display = "block";
			}
		});
	}

	sortRecipeTag() {
		const tagIngredients = [...document.querySelectorAll(".tag-ingredients")];
		console.log(tagIngredients);
		tagIngredients.forEach((tag) => {
			console.log(tag.dataset.id);
		});
		const tagAppliance = document.querySelectorAll(".tag-appliance");
		tagAppliance.forEach((tag) => {
			console.log(tag.dataset.id);
		});
		const tagUstensils = document.querySelectorAll(".tag-ustensils");
		tagUstensils.forEach((tag) => {
			console.log(tag.dataset.id);
		});
		//
		//let filteredRecipes = this.recipes.filter((recipe)=>
		// { recipe.
		//
		// })
		//this.displayRecipeCard(filteredRecipes);
		//this.displayButtons(filteredRecipes);
	}
}

new Index();
