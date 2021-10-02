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

class Index {
	constructor(){
		this.displayHeader();
	}

	displayHeader(){
		const headerContainer = document.querySelector(".headerContainer");
		const header = new Header();
		headerContainer.innerHTML += header.render();
	}
}

new Index();