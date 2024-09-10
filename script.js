const listCarte =["/images/Hulk1.jpg", "/images/Hulk2.jpg","/images/HumanTorch1.jpg", "images/HumanTorch2.jpg", "images/ScarletWitch1.jpg", "images/ScarletWitch2.jpg", "images/Spiderman1.jpg", "images/Spiderman2.jpg", "images/Thor1.jpg", "images/Thor2.jpg", "images/Vision1.jpg", "images/Vision2.jpg"]
let clicCarte = document.querySelectorAll(".carte")
let recommencer =document.getElementById("recommencer")
let compteur = 0
let carte1 = ""
let carte2 = ""
let score = 0
let id1 =""
let id2 =""

recommencer.addEventListener('click', ()=>{
    for(let cr = 0; cr<clicCarte.length; cr++){
        let carteEnCours = clicCarte[cr].querySelector("img")
        carteEnCours.src="/images/verso.jpg"
    }
    shuffle(listCarte)
    compteur = 0
    carte1 = ""
    carte2 = ""
    score = 0
    id1 = ""
    id2 = ""
})

function comparaison(carte1, carte2, id1, id2){
    if(carte1 === carte2){
        score++
        if(score === 6){
            console.log("gagné")
        }
    }else{
        setTimeout(()=> {let idCarte1 = document.getElementById(id1)
        let imgCarte1 = idCarte1.querySelector("img")
        let idCarte2 = document.getElementById(id2)
        let imgCarte2 = idCarte2.querySelector("img")
        imgCarte1.src = "/images/verso.jpg"
        imgCarte2.src = "/images/verso.jpg"}
        , 1000)
    }
    compteur = 0
}


for(let index=0;index<clicCarte.length;index++){
    clicCarte[index].addEventListener('click', ()=>{
        let verso = document.getElementById(`verso${index}`)
        compteur++
        switch (compteur) {
            case 1 :
                verso.src = `${list[index]}`
                carte1 = verso.src.slice(0,-5)
                id1 = index
                break
            case 2 :
                verso.src = `${list[index]}`
                carte2 = verso.src.slice(0,-5)
                id2 = index
                comparaison(carte1, carte2, id1, id2)
                
                break
            default :
                break
        }
                
    })
}

function shuffle(listCarte){
    let list = []
    for(let item in listCarte){
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



function placerCartes(){
    let table = [carte1, carte2, ]
}

function lancerJeu(){
    list = shuffle(listCarte)
}


