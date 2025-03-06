window.onload = () => {
    window.addEventListener("scroll", () => {
        // calcul de la hauteur "utile" du document
        let hauteur = document.documentElement.scrollHeight - window.innerHeight

        // récupération position verticale
        let position = window.scrollY

        // récupère la largeur de la fenêtre
        let largeur = document.documentElement.clientWidth

        // calcul largeur de la barre
        let barre = position / hauteur * largeur

        // modification css de la barre
        document.getElementById("progress").style.width = barre+"px"
    })
}