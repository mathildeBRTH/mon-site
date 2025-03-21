"use stict"

// FERMER/OUVRIR LE PANIER
const cartIcon = document.getElementById('cart-icon')
const cart = document.getElementById('cart')
const cartClosedBtn = document.getElementById('close-btn')
// ouvre le panier
cartIcon.addEventListener('click', () => {
    cart.classList.remove('cart-closed')
})
// ferme le panier
cartClosedBtn.addEventListener('click', () => {
    cart.classList.add('cart-closed')
})

// AJOUTER DES ARTICLES AU PANIER
// récupère les éléments du panier depuis le localStorage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; //JSON.parse -> convertie des strings JSON en objet (car localStorage stock des strings) + || [] pour éviter que JSON.parse échoue => les articles restent dans le panier même après fermeture du navigateur
let total = 0
let itemsCount = 0

// fonction pour ajouter aux panier
function addToCart(productCart) {
const productTitle = productCart.querySelector('.product-title').textContent
const productPrice = productCart.querySelector('.product-price').textContent
const priceNumber = parseFloat(productPrice.replace('€', '')) //converti string en nombre flottant + enlève le symbole euro
const productImg = productCart.querySelector('.product-img').src

const existingItem = cartItems.find((items) => items.productTitle === productTitle)

// si le produit est déjà dans le panier, ajouté 1 à la quantité, sinon ajouter le produit complet
if (existingItem) {
    existingItem.quantity +=1
} else {
    cartItems.push({
        productTitle,
        priceNumber,
        quantity: 1,
        image: productImg,
    })
}
updateLocalStorage()
updateCart()
animateAddToCart(productCard);
}

// fonction pour retirer totalement l'article du panier
function removeItem(productTitle) {
    cartItems = cartItems.filter((item) => item.productTitle !== productTitle)
    updateLocalStorage()
    updateCart()
}

// fonction pour changer la quantité des articles dans le panier
function changeQuantity(productTitle, delta) {
    // trouve les article avec leur nom
    const item = cartItems.find((items) => items.productTitle === productTitle)
    // ajoute(ou retire) le delta à la quantité de l'article
    if (item) {
        item.quantity += delta; 
        // retire totalement l'article s'il arrive à 0 en quantité
        if (item.quantity <= 0) {
            cartItems = cartItems.filter((item) => item.productTitle !== productTitle)
        }
    }
    updateLocalStorage()
    updateCart()
}

// fonction pour afficher les articles dans le panier
function updateCart() {
    const cartList = document.getElementById('cart-items')
    const totalElement = document.getElementById('total-price')
    const countElement = document.getElementById('cart-count')

    cartList.innerHTML = ''
    total = cartItems.reduce((sum,item) => sum + item.priceNumber * item.quantity, 0)
    itemsCount = cartItems.reduce((count, item) =>  count + item.quantity, 0)

    cartItems.forEach((item) => {
        const li = document.createElement('li')
        li.classList = 'cart-item'
        li.innerHTML = `
        <div class="item-mini">
            <img src="${item.image}" alt="${item.productTitle}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.productTitle}</div>
                <div class="cart-item-price">${item.priceNumber}€ x ${item.quantity}</div>
            </div>
        </div>
            <div class="quantity-controls">
                <button onclick="changeQuantity('${item.productTitle}', -1)" class="quantity">
                    -
                </button>
                <button onclick="changeQuantity('${item.productTitle}', +1)" class="quantity">
                    +
                </button>
                <button class="remove" onclick="removeItem('${item.productTitle}')">
                    x
                </button>
            </div>
        `
        cartList.appendChild(li)
    });
    totalElement.textContent = total.toFixed(2)
    countElement.textContent = itemsCount
}

// met le panier dans le localStorage
function updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// charge le panier après refresh de la page
window.onload = function () {
    updateCart()
}
