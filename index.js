/* bouton: input qui disparait + div qui contient plein de div en flex
cartes plats: image vide + div titre + temps + div liste (plein de div) + instruction
Champ de recherche avec icon bouton
header
tag avec bouton de suppression
Afficher toutes les cartes
Afficher tout les boutons avec toutes les options 
Créer un tag quand option sélectionnée
Créer un tag quand tape quelque chose dans la barre de recherche
Supprimer un tag quand clique croix
Tri contenu bouton quand tape (youtube)
ATTENTION ! Tri des cartes: 2 algo à faire*/

import Header from "./js/components/Header.js";
import Search from "./js/components/Search.js";
import RecipeCard from "./js/components/RecipeCard.js";
import SearchButton from "./js/components/SearchButton.js";
import recipes from "./recipes.js";

class Index {
	constructor() {
		this.recipes = recipes;
		this.displayHeader();
		this.displaySearch();
		this.displayRecipeCard(recipes);
		this.displayIngredientButton(recipes);
		this.displayApplianceButton(recipes);
		this.displayUstensilsButton(recipes);
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

	displayIngredientButton(recipes) {
		const searchButtonContainer = document.querySelector(".searchButtonContainer");
		const searchButton = new SearchButton(recipes);
		searchButtonContainer.innerHTML += searchButton.render("Ingredients", "ingredients");
	}

	displayApplianceButton(recipes) {
		const searchButtonContainer = document.querySelector(".searchButtonContainer");
		const searchButton = new SearchButton(recipes);
		searchButton.workingSearchButton();
		searchButtonContainer.innerHTML += searchButton.render("Appareil ", "appliance");
	}

	displayUstensilsButton(recipes) {
		const searchButtonContainer = document.querySelector(".searchButtonContainer");
		const searchButton = new SearchButton(recipes);
		searchButtonContainer.innerHTML += searchButton.render("Ustensiles", "ustensils");
	}
}

new Index();
