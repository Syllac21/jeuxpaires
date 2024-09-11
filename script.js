const listCarte =["/images/Hulk1.jpg", "/images/Hulk2.jpg","/images/HumanTorch1.jpg", "images/HumanTorch2.jpg", "images/ScarletWitch1.jpg", "images/ScarletWitch2.jpg", "images/Spiderman1.jpg", "images/Spiderman2.jpg", "images/Thor1.jpg", "images/Thor2.jpg", "images/Vision1.jpg", "images/Vision2.jpg"]
let clicCarte = document.querySelectorAll(".carte")
const chronoElement = document.getElementById("chrono")
let recommencer =document.getElementById("recommencer")
let compteur = 0
let carte1 = ""
let carte2 = ""
let score = 0
let id1 =""
let id2 =""
let premierClick = true
let gagne = false
let time = "0"
let monChrono =""
let level = document.getElementsByName("level")
let zoneJeux = document.getElementById("zoneJeux")
let nbPaire = 6
let scoreFinal = 0

let listClassementExpert = [
    [100, "Zack"],
    [150, "Cloud"],
    [200, "Sephiroth"],
    [250, "Rorora"],
    [300, "Lulu"]]

let listClassementIntermediate = [
    [100, "pif"],
    [150, "paf"],
    [200, "pouf"],
    [250, "plof"],
    [300, "pluf"]]

let listClassementBeginner = [
    [100, "a"],
    [150, "b"],
    [200, "c"],
    [250, "d"],
    [300, "e"]]

let listClassement = listClassementExpert

/**
 * la fonction ajouterScore permet de comparer le score du joueur au meilleurs score enregistrés et de l'ajouter si il est meilleur
 * @param {int} scoreFinal 
 */
function ajouterScore(scoreFinal){
    if(score < listClassement[4][0]){
        let nom = prompt("votre nom")
        listClassement[4][1] = nom
        listClassement[4][0] = parseInt(scoreFinal)
        listClassement.sort(function(a,b) {return a[0]-b[0]})
        tableauScore(nbPaire)
        console.log(listClassement)
        };
    }

/**
 * la fonction tableauScore rempli le tableau des meilleurs scores
 * @param {*} lvl 
 */
function tableauScore(lvl){
    switch(lvl){
        case "2" :
            listClassement = listClassementBeginner
            break
        case "4" :
            listClassement = listClassementIntermediate
            break
        case "6" :
            listClassement = listClassementExpert
            break
    }

    let classementNom = document.querySelectorAll(".classementNom")
    let classementScore = document.querySelectorAll(".classementScore")
    
    for(let scorei = 0 ; scorei<classementNom.length; scorei++){
        classementNom[scorei].innerHTML = listClassement[scorei][1]
        classementScore[scorei].innerHTML = listClassement[scorei][0]
    }
    
    
}


// écoute les changements dans les bouton radio qui permmettent de définir le niveau du jeu
for(itemLevel=0; itemLevel<level.length ; itemLevel++){
    level[itemLevel].addEventListener("change", (event)=>{
        nbPaire = event.target.value
        
        switch(nbPaire){
            case "2" :
                zoneJeux.classList.remove("expert")
                zoneJeux.classList.remove("intermediate")
                zoneJeux.classList.add("beginner")
                nbcartes(nbPaire)
                list =[]
                list = shuffle(listCarte)
                init()
                
                
                break
            case "4" :
                zoneJeux.classList.remove("expert")
                zoneJeux.classList.remove("beginner")
                zoneJeux.classList.add("intermediate")
                nbcartes(nbPaire)
                list =[]
                list = shuffle(listCarte)
                init()
                break
            case "6" :
                zoneJeux.classList.remove("intermediate")
                zoneJeux.classList.remove("beginner")
                zoneJeux.classList.add("expert")
                nbcartes(nbPaire)
                list =[]
                list = shuffle(listCarte)
                init()
                break
        }
    })
}

/**
 * définie le nombre de paires en fonction du niveau de jeu choisi et cache les cartes inutiles
 * @param {int} nbPaire 
 */
function nbcartes(nbPaire){
    for(let carte = 0 ; carte<clicCarte.length ; carte++){
        clicCarte[carte].classList.add("hidden")

    }
    for(let carte = 0 ; carte < nbPaire * 2 ; carte++){
        clicCarte[carte].classList.remove("hidden")
    }
}

/**
 * écoute le bouton recommencer et lance l'initialisation
 */
recommencer.addEventListener('click', ()=>{
    init()
})

/**
 * réinitialise le jeu
 */
function init(){
    for(let cr = 0; cr<clicCarte.length; cr++){
        let carteEnCours = clicCarte[cr].querySelector("img")
        carteEnCours.src="/images/verso.jpg"
    }
    list = shuffle(listCarte)
    tableauScore(nbPaire)
    compteur = 0
    carte1 = ""
    carte2 = ""
    score = 0
    id1 = ""
    id2 = ""
    premierClick = true
    chronoElement.innerHTML = "0"

}
/**
 * la fonction comparaison vérifie si les deux chaines string carte1 et carte2 sont identiques. si elle sont identique le score augmente, sinon les sources des images sont modifiées pour affihcer le verso
 * @param {string} carte1
 * @param {string} carte2
 * @param {string} id1
 * @param {string} id2
 */
function comparaison(carte1, carte2, id1, id2){
    if(carte1 === carte2){
        score++
        if(score === parseInt(nbPaire)){
            let timeFinal = time
            clearInterval(monChrono)
            scoreFinal = timeFinal
            ajouterScore(scoreFinal)
            
        }
    }else{
        setTimeout(()=> {let idCarte1 = document.getElementById(id1)
        let imgCarte1 = idCarte1.querySelector("img")
        let idCarte2 = document.getElementById(id2)
        let imgCarte2 = idCarte2.querySelector("img")
        imgCarte1.src = "/images/verso.jpg"
        imgCarte2.src = "/images/verso.jpg"}
        , 50)
    }
    compteur = 0
}

/** écoute l'événement click sur les div de classe carte et retourne les cartes */
for(let index=0 ; index < clicCarte.length ; index++){
    clicCarte[index].addEventListener('click', ()=>{
        let verso = document.getElementById(`verso${index}`)
        if(premierClick){
            monChrono = setInterval(()=>{
                time = chronoElement.innerHTML
                time++
                chronoElement.innerHTML = time
            }, 1000)
            premierClick = false
        }
        compteur++
        switch (compteur) {
            case 1 :
                verso.src = `${list[index]}`
                carte1 = verso.src.slice(0,-5)
                id1 = index
                
                break
            case 2 :
                id2 = index
                if(id1 === id2){
                    compteur--
                    id2 = ""
                    break
                }
                verso.src = `${list[index]}`
                carte2 = verso.src.slice(0,-5)
                setTimeout(() => {comparaison(carte1, carte2, id1, id2)
                    
                }, 500);
                
                
                break
            default :
                break
        }
                
    })
}

/**
 * créé une liste de string de manière aléatoire pour mélanger les cartes
 * @param {array} listCarte 
 * @returns 
 */
function shuffle(listCarte){
    let list = []
    for(let item =0 ; item < nbPaire*2 ; item++){
        list[item] = listCarte[item]
    }
    
    let currentIndex = list.length
    while(currentIndex !=0){
        let randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [list[currentIndex], list[randomIndex]]= [list[randomIndex], list[currentIndex]]
    }
    return list
}

function lancerJeu(){
    list = shuffle(listCarte)
    tableauScore(nbPaire)
    level[2].checked = true
    
}


