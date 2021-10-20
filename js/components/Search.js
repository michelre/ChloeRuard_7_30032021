export default class Search {

	constructor(searchAction){
		this.searchAction = searchAction;
	}

	createEvents(){
		const form = document.querySelector('form')
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			this.searchAction(e.target.search.value)
		});
	}

	render() {
		return `
		<form>
			<div class="search">
				<input type="search" class="search__input" placeholder="Rechercher un ingrédient, appareil, ustensiles ou une recette" name="search">
				<input type="image" name="submit" class="search__submit" src="img/search_icon.svg" alt="search">
			</div>
		</form>`;
	}
}
