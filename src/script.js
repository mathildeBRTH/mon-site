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
  // MAJ des aria-label des boutons
  const buttonsToUpdate = {
    'language-toggle': texts.languageToggle,
    'theme-switch': lightmode === 'active' ? texts.themeSwitchDark : texts.themeSwitchLight,
    'patch-preview': texts.patchPreview,
    'up-btn': texts.upButton
  };
  
  Object.entries(buttonsToUpdate).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if(element) element.setAttribute('aria-label', value);
  });

  // MAJ des textes visibles
  const elements = ['dev', 'about', 'projectH', 'languages', 'skills', 'enCv', 'office', 'softSkills', 'workT', 'crea', 'obsv', 'minu', 'bene', 'pro', 'job', 'jobSkill', 'jobPlace', 'train', 'DWWM', 'online', 'clas', 'passerelle', 'l2', 'logic', 'ub', 'bac', 'spe', 'school', 'hobbies', 'draw', 'art', 'internet', 'philo', 'puzzle', 'game', 'dlCV', 'dlCL', 'dlRL', 'website', 'play', 'illustrator', 'aboutIllu', 'languageToggle', 'themeSwitchLight', 'themeSwitchDark', 'patchPreview', 'upButton' ];
  elements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = texts[id]; // Met à jour uniquement si l'élément existe
    }
  })
};

// Fonction pour mettre à jour les liens des PDF en fonction de la langue
function updatePDFLinks(lang) {
  const frCV = "../style/contents/pdf/BERTHELIER-Mathilde-CV-fr.pdf";
  const enCV = "../style/contents/pdf/BERTHELIER-Mathilde-CV-en.pdf";

  const frCL = "../style/contents/pdf/BERTHELIER-Mathilde-LM-fr.pdf";
  const enCL = "../style/contents/pdf/BERTHELIER-Mathilde-CL-en.pdf";

  const frRL = "../style/contents/pdf/BERTHELIER-Mathilde-LR-fr.pdf";
  const enRL = "../style/contents/pdf/BERTHELIER-Mathilde-RL-en.pdf";

  if (lang === 'fr') {
    document.getElementById("dlCV").href = frCV;
    document.getElementById("dlCL").href = frCL;
    document.getElementById("dlRL").href = frRL;
  } else {
    document.getElementById("dlCV").href = enCV;
    document.getElementById("dlCL").href = enCL;
    document.getElementById("dlRL").href = enRL;
  }
}

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
  
  // Appel de la fonction pour mettre à jour les PDF
  updatePDFLinks(newLang);
});

// Charge la langue par défaut au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  // Récupère la langue sauvegardée dans le localStorage, ou utilise 'fr' par défaut
  const savedLang = localStorage.getItem('language') || 'fr';
  document.documentElement.lang = savedLang; // Définit l'attribut lang de la balise <html>
  loadLanguage(savedLang); // Charge les textes dans la langue sauvegardée

  // Met à jour le texte du bouton en fonction de la langue
  languageToggle.textContent = savedLang === 'fr' ? 'EN' : 'FR';
  
  // Appel de la fonction pour mettre à jour les PDF
  updatePDFLinks(savedLang);
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
    if(lightmode !== "active") {
      enableLightmode();
      themeSwitch.setAttribute('aria-label', texts.themeSwitchDark); // Utilisez votre objet texts ou récupérez-le depuis les JSON
  } else {
      disableLightmode();
      themeSwitch.setAttribute('aria-label', texts.themeSwitchLight);
  }
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

// _________up btn show on scroll_______

const upBtn = document.getElementById('up-btn');

let scrollFunc = function () {
  let y = window.scrollY;
  if (y >= 400) {
    upBtn.className = 'show-up-btn'
  } else {
    upBtn.className = 'hide-up-btn'
  }
};

window.addEventListener("scroll", scrollFunc);
