const cardsColor = ["green", "green", "blue", "blue", "red", "red", "brown", "brown",
                    "violet", "violet", "yellow", "yellow", "darkslategray", "darkslategray",
                    "yellowgreen", "yellowgreen", "cyan", "cyan", "coral", "coral", "purple", "purple", 
                    "darkolivegreen", "darkolivegreen", "maroon", "maroon", "tan", "tan", "khaki", "khaki",
                    "navy", "navy", "mediumpurple", "mediumpurple", "lightsteelblue", "lightsteelblue"];

let cards = document.querySelectorAll("div");
cards = [...cards];

const startTimer = new Date().getTime();

let activeCard = "";
const activeCards = [];

const pairs = cards.length/2;
let result = 0;


const clickCard = function () {
    activeCard = this;

    if(activeCard == activeCards[0]) return;

    activeCard.classList.remove("hidden");

    if(activeCards.length === 0) {
        activeCards[0] = activeCard;
        return;
    }

    else {
        cards.forEach(card => 
            card.removeEventListener("click", clickCard))
        activeCards[1] = activeCard;
        setTimeout(function(){
        if(activeCards[0].className === activeCards[1].className) {
            activeCards.forEach(card => card.classList.add("off"))
            result++;
            cards = cards.filter(card => !card.classList.contains("off"))
            if(result == pairs) {
                const endTimer = new Date().getTime();
                const timerResult = (endTimer - startTimer)/1000
                alert(`Wygrana! Gra zajęła Ci ${timerResult} sekund`)
                history.go(-1)
            }
        }
        else {
            activeCards.forEach(card => card.classList.add("hidden"))
        }
        activeCard = "";
        activeCards.length = 0;
        cards.forEach(card => card.addEventListener("click", clickCard))
    }, 420)
}
}
const init = function()
{
    cards.forEach(card => {
        const position = Math.floor(Math.random()*cardsColor.length);
        card.classList.add(cardsColor[position]);
        cardsColor.splice(position, 1);
    })

    setTimeout(function(){
        cards.forEach(card => {
            card.classList.add("hidden")
            card.addEventListener("click", clickCard)
        })
    }, 2000)
}

init()