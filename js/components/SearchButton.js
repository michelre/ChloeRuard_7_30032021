export default class SearchButton {
	constructor(data) {
		this.data = data;
		this.ustensils = data.ustensils;
		this.appliance = data.appliance;
		this.ingredients = data.ingredients;
	}

	workingSearchButton() {
		//for ingredients
		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "button-ingredients" || e.target.dataset.trigger === "buttonIcon-ingredients") {
				this.openList("ingredients");
			}
			if (e.target.dataset.trigger === "listIcon-ingredients") {
				this.closeList("ingredients");
			}
		});

		//for appliance
		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "button-appliance" || e.target.dataset.trigger === "buttonIcon-appliance") {
				this.openList("appliance");
			}
			if (e.target.dataset.trigger === "listIcon-appliance") {
				this.closeList("appliance");
			}
		});

		//for ustensils
		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "button-ustensils" || e.target.dataset.trigger === "buttonIcon-ustensils") {
				this.openList("ustensils");
			}
			if (e.target.dataset.trigger === "listIcon-ustensils") {
				this.closeList("ustensils");
			}
		});
	}

	openList(nameEN) {
		const searchButton = document.querySelector(`.searchButton-${nameEN}`);
		searchButton.style.display = "none";
		const searchList = document.querySelector(`.searchButton__search-${nameEN}`);
		searchList.style.display = "block";
	}

	closeList(nameEN) {
		const searchButton = document.querySelector(`.searchButton-${nameEN}`);
		searchButton.style.display = "flex";
		const searchList = document.querySelector(`.searchButton__search-${nameEN}`);
		searchList.style.display = "none";
	}

	uniqueArrayUstensil() {
		const arrayUstenstils = this.data.map((recipe) => {
			return recipe.ustensils;
		});
		return (this.setUstensils = [...new Set(arrayUstenstils.flat())]);
	}

	uniqueArrayAppliance() {
		const arrayAppliances = this.data.map((recipe) => {
			return recipe.appliance;
		});
		return (this.setAppliances = [...new Set(arrayAppliances)]);
	}

	uniqueArrayIngredient() {
		const arrayIngredients = this.data.map((recipe) => {
			return recipe.ingredients.map((ingredient) => {
				return ingredient.ingredient;
			});
		});
		return (this.setIngredients = [...new Set(arrayIngredients.flat())]);
	}

	renderResult(nameEN) {
		this.uniqueArrayUstensil();
		this.uniqueArrayAppliance();
		this.uniqueArrayIngredient();
		if (nameEN == "ingredients") {
			return this.setIngredients
				.map((ingredient) => {
					return `
					<li class="searchButton__result">
						<span class="result__name">${ingredient}</span>
					</li>`;
				})
				.join("");
		}
		if (nameEN == "appliance") {
			return this.setAppliances
				.map((appliance) => {
					return `
					<li class="searchButton__result">
						<span class="result__name">${appliance}</span>
					</li>`;
				})
				.join("");
		}
		if (nameEN == "ustensils") {
			return this.setUstensils
				.map((ustensil) => {
					return `
					<li class="searchButton__result">
						<span class="result__name">${ustensil}</span>
					</li>`;
				})
				.join("");
		}
	}

	render(name, nameEN) {
		const nameLowerCase = name.toLowerCase().slice(0, -1);
		//met le nom du bouton en minuscule et enlève le dernier caractère pour mettre le mot au singulier
		return `
			<button type="button" class="searchButton searchButton-${nameEN}" data-trigger="button-${nameEN}">
			${name}
				<img src="./img/arrow_icon.svg" class="searchButton__icon" alt="" data-trigger="buttonIcon-${nameEN}">
			</button>
			<div class="searchButton__search searchButton__search-${nameEN}" data-trigger="list-${nameEN}">
				<div class="searchButton__inputContainer">
					<input type="search" class="searchButton__input" placeholder="Rechercher un ${nameLowerCase}" name="${nameLowerCase}">
					<img src="./img/arrow_icon.svg" class="searchButton__icon" alt="" data-trigger="listIcon-${nameEN}">
				</div>
				<ul class="searchButton__results">${this.renderResult(nameEN)}</ul>
			</div>`;
	}
}
