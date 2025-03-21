"use strict";

const listeElements = [
	{
		compositeur: 'Anton Brückner',
		oeuvre: 'Symphonie n°1 en do mineur'
	},
	{
		compositeur: 'Anton Brückner',
		oeuvre: 'Symphonie n°4 en mi bémol majeur'
	},
	{
		compositeur: 'Gustav Mahler',
		oeuvre: 'Symphonie n°2 "Résurrection" en ut mineur'
	},
	{
		compositeur: 'Johannes Brahms',
		oeuvre: 'Symphonie n°2 en ré majeur'
	},
	{
		compositeur: 'Ludwig Van Beethoven',
		oeuvre: 'Symphonie n°6 en fa majeur'
	},
	{
		compositeur: 'Félix Mendelsohn',
		oeuvre: 'Symphonie n°3 en la mineur'
	}
];
// fonction pour créer les articles et leurs contenus dans le html
function createArticles(listeArticles) {
	const listEnvie = document.getElementById('liste-envie')
	
	for (const element of listeArticles) {
		// const pour chaque element du html
		const article = document.createElement('article')
		const hgroup = document.createElement('hgroup')
		const h3 = document.createElement('h3')
		const p = document.createElement('p')

		// ajout des éléments (article + hgroup) dans la section list-envie
		listEnvie.appendChild(article)
		article.appendChild(hgroup)
		h3.innerText = element.compositeur
		hgroup.appendChild(h3)
		p.innerText = element.oeuvre
		hgroup.appendChild(p)

		// ajouts des boutons à chaques articles
		const btnList = document.createElement('div')
		const upBtn = document.createElement('button')
		const downBtn = document.createElement('button')
		const deleteBtn = document.createElement('button')

		article.appendChild(btnList)

		// ajout des class aux boutons
		upBtn.classList.add('moveUp')
		downBtn.classList.add('moveDown')
		deleteBtn.classList.add('remove')

		// ajout des svg dans les boutons
		upBtn.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`
		downBtn.innerHTML = `<i class="fa-solid fa-arrow-down"></i>`
		deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`

		// ajout des boutons dans la div qui est dans chaque article
		btnList.appendChild(upBtn)
		btnList.appendChild(downBtn)
		btnList.appendChild(deleteBtn)
	}
}
// fonction bouton déplacer élément à la place de celui du dessus
function moveUp() {
	const item = this.closest('article')
    const prevItem = item.previousElementSibling

    if(prevItem) {
        item.parentNode.insertBefore(item, prevItem)
    }
}
// fonction bouton déplacer élément à la place de celui du dessous
function moveDown() {
	const item = this.closest('article')
    const nextItem = item.nextElementSibling

    if(nextItem) {
        item.parentNode.insertBefore(nextItem, item)
    }
}
// fonction bouton supprimer
function removeElement() {
	const item = this.closest('article')
	item.remove()
}

document.addEventListener("DOMContentLoaded", function () {
	createArticles(listeElements);

	// ajout des écouteurs d'évènement pour chaques bouton/fonction
	const moveUpBtn = this.querySelectorAll('.moveUp')
    for (const element of moveUpBtn) {
        element.addEventListener('click', moveUp)
    }

    const moveDownBtn = this.querySelectorAll('.moveDown')
    for (const element of moveDownBtn) {
        element.addEventListener('click', moveDown)
    }

    const deleteBtn = this.querySelectorAll('.remove')
    for (const element of deleteBtn) {
        element.addEventListener('click', removeElement)
    }
});