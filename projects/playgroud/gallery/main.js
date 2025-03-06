"use strict";

// Tableau contenant les images
const imagesSet = [
	{
		src: "alpine-lake.jpg",
		alt: "Lac alpin"
	},
	{
		src: "lac-truebsee.jpg",
		alt: "Lac de Trübsee, Suisse"
	},
	{
		src: "normandie.jpg",
		alt: "La mer en Normandie"
	},
	{
		src: "paysage-montagne.jpg",
		alt: "Paysage de montagne"
	},
	{
		src: "parc.jpg",
		alt: "Jardin public"
	},
	{
		src: "keywest.jpg",
		alt: "Key west, Floride"
	},
	{
		src: "thailand.jpg",
		alt: "Thailande"
	},
	{
		src: "vietnam.jpg",
		alt: "Vietnam"
	}
];

document.addEventListener("DOMContentLoaded", function () {
	// 1ÈRE ÉTAPE
	// selectionner conteneur de miniature 
	const nav = document.getElementsByClassName("navigation");
	// boucle for qui créer des balises li contenant des img
	for (let i = 0; i < imagesSet.length; i++) {
		const li = document.createElement("li");
		const img = document.createElement("img");
		// on détermine le chemin src, l'alt et l'index pour chaque image
		img.src = `img/minis/${imagesSet[i].src}`;
		img.alt = imagesSet[i].alt;
		img.dataset.index = i;
		// ajout de la class "active" pour la première image
		if (i === 0) {
			li.classList.add("active");
		}
		// ajout de l'image dans la balise li, puis ajout de la balise li dans le conteneur d'image miniature (navigation)
		li.appendChild(img);
		nav[0].appendChild(li);
	}

	// 2ÈME ÉTAPE
	// selectionne les éléments du DOM
	const mainImg = document.querySelector('#galerie figure img')
	const mainCaption = document.querySelector('#galerie figure figcaption')
	// selectionne première image du tableau
	const firstImg = imagesSet[0]
	// défini les attributs et le contenu de la légende de l'image
	mainImg.src = `img/${firstImg.src}`
	mainImg.alt = firstImg.alt;
	mainCaption.textContent = firstImg.alt

	// 3ÈME ÉTAPE
	// définition de la fonction imageSelect()
	function imageSelect() {
		// selectionne l'élément qui a la classe "active"
		const activeElement = document.querySelector('.navigation li.active')
		// suprime la classe "active"
		if (activeElement) {
			activeElement.classList.remove('active')
		}
		// ajout de la class "active" à l'élément cliquer
		// ici this fait référence à l'élément clické
		this.classList.add('active')
		// récupère l'index de l'image selectionné
		const index = this.querySelector('img').dataset.index;
		// MAJ de l'image principale et sa légende
		const mainImg = document.querySelector('#galerie figure img')
		const mainCaption = document.querySelector('#galerie figure figcaption')
		// défini les attributs et le contenu de la légende de l'image
		mainImg.src = `img/${imagesSet[index].src}`
		mainImg.alt = imagesSet[index].alt
		mainCaption.textContent = imagesSet[index].alt
	}
	
	// selectionne toutes les miniatures
	const mini = document.querySelectorAll('.navigation li')
	// ajout d'écouteur click à chaque miniature
	mini.forEach((mini) => {
		mini.addEventListener('click', imageSelect)
	})
});