   let cardElementsArray = document.querySelector('.card');
let ticker = document.getElementById('moves')
let openedCards = [];
let matchedCards =  [];
let moves = 0;




function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !==0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    console.log('shuffle')
    return array;
}

function flipCard(cardDiv) {
    cardDiv.children[0].classList.toggle('show-img');
    cardDiv.classList.toggle("open");
    cardDiv.classList.toggle("flip");
    cardDiv.classList.toggle("disabled");
    cardOpen(cardDiv);
}

function cardOpen(card) {
    openedCards.push(card);
    let len = openedCards.length;
    if(len === 2) {
       /* moveCounter();*/
       if(openedCards[0].children[0].src === openedCards[1].children[0].src) {
            matched();
            console.log('matched')
        } else {
            unmatched();
            console.log('unmatched')
        }
    }
}

function matched() {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    matchedCards.push(openedCards[0]);
    matchedCards.push(openedCards[1]);
    openedCards = [];
    if(matchedCards.length == 16) {
        endGame();
    }
}


function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable(openedCards[0]);
    disable(openedCards[1])
    setTimeout(function() {
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        openedCards[0].children[0].classList.remove('show-img');
        openedCards[1].children[0].classList.remove('show-img');
        openedCards = [];
        
    }, 1100)
}


function disableCards() {
   card.classList.add('disabled');
}

function enable() {
    cardElementsArray.filter((card, cardElementsArray) => {
        card.classList.remove('disabled');
        for(let i=0; i<matchedCards.length; i++) {
            matchedCards[i].classList.add('disabled');
        }
    })
}

 function flipCards() {
   setTimeout(() => {
     openedCards[0].classList.add('flip');
     openedCards[1].classList.add('flip');
   }, 1500);
 }
