// cards array
let card = document.getElementsByClassName("card");
let cards = [...card];

// deck of all cards in game
const deck = document.getElementById("card-deck");

// declaring move letiable
let moves = 0;
let counter = document.querySelector(".moves");

// star icons
const stars = document.querySelectorAll(".fa-star");

// matchedCards
let matchedCard = document.getElementsByClassName("match");

 // stars list
 let starsList = document.querySelectorAll(".stars li");

 // close icon
 let closeicon = document.querySelector(".close");

 // declare modal
 let modal = document.getElementById("popup2")

 // array for opened cards
let openedCards = [];

let sec=0;
let min =0;
let interval;

let MovesResult = document.getElementById('finalMove');
let TimeResult = document.getElementById('totalTime');
let RaitingResult = document.getElementById('starRating');
        


//shuffles cards

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

//document.body.onload = startGame();
   

function startGame(){

     openedCards = [];

    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (let i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (let i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    sec= 0;
    min = 0; 
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

flashCards();


function flashCards() {
   // console.log("RAAAAAAHAAAAAAAAAAAAAF");
    
    for(i=0; i<cards.length; i++) {
      //  console.log("RAAAAAAAAAF");
        cards[i].classList.add("show")
    }
    setTimeout(function(){
        for(i=0; i<cards.length; i++) {
           // console.log("mmmmmm");
            cards[i].classList.remove("show")
        }
    }, 3000)
}

// toggles 
let displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


//Matched or not
function cardOpen() {
    openedCards.push(this);
    let len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


// when cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// when cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1000);
}


// disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


//  enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(let i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}



// count moves

function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        sec= 0;
        min = 0; 
        startTimer();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// game timer

let timer = document.querySelector(".timer");

function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = "mins: "+ min +" secs:"+sec;
        sec++;
        if(sec == 60){
            min++;
            sec=0;
        }
    },1000);
}


// winners Function 
function winner(){
   
    if (matchedCard.length == 16){
        
        clearInterval(interval);
       let finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating letiable
        let starRating = document.querySelector(".stars").innerHTML;


        //console.log(starRating);
        //console.log(finalTime);

 

        
//show totalGameTime, moves and finalStarRating in Modal

MovesResult.innerHTML = moves;
TimeResult.innerHTML = finalTime;
RaitingResult.innerHTML = starRating;

        closeModal();
    };
}



// close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}


//if user wants to play Again 
function playAgain(){
  
    location.reload();
}

//help popup
const helpPage = document.getElementById('helpPopup');
function helpPopup() {
    helpPage.classList.add('show-popup');
}

function closeHelpPopup() {
    helpPage.classList.remove('show-popup');
}

// loop to add event listeners to each card
for (let i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",winner);
};

