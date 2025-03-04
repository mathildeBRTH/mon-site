// _______FR/EN button_______

// Sélectionne le bouton de changement de langue
const languageToggle = document.getElementById('language-toggle');

// Fonction pour charger un fichier JSON
async function loadLanguage(lang) {
  // Charge le fichier JSON correspondant à la langue
  try {
    const response = await fetch(`/mon-site/lang/${lang}.json`);
    if (!response.ok) throw new Error('Fichier JSON non trouvé');
    const texts = await response.json();
    updateTexts(texts); // Met à jour les textes de la page
  } catch (error) {
    console.error('Erreur de chargement de la langue :', error);
  }
};

// Fonction pour mettre à jour les textes de la page
function updateTexts(texts) {
  const elements = ['dev', 'about', 'projectH', 'languages', 'skills', 'enCv', 'office', 'softSkills', 'workT', 'crea', 'obsv', 'minu', 'bene', 'pro', 'job', 'jobSkill', 'jobPlace', 'train', 'DWWM', 'online', 'clas', 'passerelle', 'l2', 'logic', 'ub', 'bac', 'spe', 'school', 'hobbies', 'draw', 'art', 'internet', 'philo', 'puzzle', 'game', 'dlCV', 'dlCL', 'dlRL', 'website', 'play', 'illustrator', 'aboutIllu' ];
  elements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = texts[id]; // Met à jour uniquement si l'élément existe
    }
  })
};

// Écouteur d'événement pour le bouton de changement de langue
languageToggle.addEventListener('click', () => {
  const currentLang = document.documentElement.lang; // Récupère la langue actuelle
  const newLang = currentLang === 'fr' ? 'en' : 'fr'; // Alterne entre français et anglais
  document.documentElement.lang = newLang; // Met à jour l'attribut lang de la balise <html>
  loadLanguage(newLang); // Charge la nouvelle langue

  // Met à jour le texte du bouton
  languageToggle.textContent = newLang === 'fr' ? 'EN' : 'FR';

  // Sauvegarde la langue choisie dans le localStorage
  localStorage.setItem('language', newLang);
});


// Charge la langue par défaut au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  // Récupère la langue sauvegardée dans le localStorage, ou utilise 'fr' par défaut
  const savedLang = localStorage.getItem('language') || 'fr';
  document.documentElement.lang = savedLang; // Définit l'attribut lang de la balise <html>
  loadLanguage(savedLang); // Charge les textes dans la langue sauvegardée

  // Met à jour le texte du bouton en fonction de la langue
  languageToggle.textContent = savedLang === 'fr' ? 'EN' : 'FR';
});

// _________light/dark theme button_______

let lightmode = localStorage.getItem('lightmode')
const themeSwitch = document.getElementById('theme-switch')

const enableLightmode = () => {
    document.body.classList.add('lightmode')
    localStorage.setItem('lightmode', 'active')
};

const disableLightmode = () => {
    document.body.classList.remove('lightmode')
    localStorage.setItem('lightmode', null)
};

if(lightmode === "active") enableLightmode()

themeSwitch.addEventListener("click", () => {
    lightmode = localStorage.getItem('lightmode')
    lightmode !== "active" ? enableLightmode() : disableLightmode()
});

// _________pic on click_______

function showOriginalImage() {
  const originalImageContainer = document.getElementById('original-image-container');
  originalImageContainer.style.display = 'flex'; // Affiche l'image en taille réelle

  // Clic pour fermer l'image en taille réelle
  originalImageContainer.addEventListener('click', () => {
    originalImageContainer.style.display = 'none'; // Cache l'image en taille réelle
  });
}

function showOriginalImageBis() {
  const originalImageContainer = document.getElementById('original-image-container-bis');
  originalImageContainer.style.display = 'flex'; // Affiche l'image en taille réelle

  // Clic pour fermer l'image en taille réelle
  originalImageContainer.addEventListener('click', () => {
    originalImageContainer.style.display = 'none'; // Cache l'image en taille réelle
  });
}

// _________carousel_______

document.addEventListener('DOMContentLoaded', () => {
  function moveCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const items = carousel.querySelectorAll('.carousel-item');
    const itemWidth = items[0]?.offsetWidth || 0;
    const totalWidth = carousel.scrollWidth; // Largeur totale du défilement

    const currentScroll = carousel.scrollLeft;
    const maxScroll = totalWidth - carousel.clientWidth; // Valeur max de scroll

    if (direction === 1) { // Flèche droite
      if (currentScroll >= maxScroll - 1) { 
        // Si on est à la fin, revenir au début
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Sinon, avancer normalement
        carousel.scrollBy({ left: itemWidth, behavior: 'smooth' });
      }
    } else { // Flèche gauche
      if (currentScroll <= 0) {
        // Si on est au début, aller à la fin
        carousel.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        // Sinon, reculer normalement
        carousel.scrollBy({ left: -itemWidth, behavior: 'smooth' });
      }
    }
  }

  // Attacher les événements aux boutons
  document.querySelectorAll('.carousel-control').forEach(button => {
    button.addEventListener('click', function () {
      const direction = this.dataset.direction === 'next' ? 1 : -1;
      const carouselId = this.dataset.target;
      moveCarousel(carouselId, direction);
    });
  });
});
