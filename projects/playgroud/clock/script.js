// fonction qui affiche l'heure
function showHours() {
    let now = new Date() // créer l'objet date
    let hours = now.getHours() // selectionne l'heure
    let minutes = now.getMinutes() // selectionne les minutes
    let seconds = now.getSeconds() // selectionne les secondes

    // selectionne la div clock dans le html
    let clock = document.getElementById('clock')
    // afiche le message avec l'heure actuelle
    clock.textContent = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}

// utilise la fonction qui affiche l'heure actuelle et rafraichi toutes les secondes
setInterval(showHours, 1000)