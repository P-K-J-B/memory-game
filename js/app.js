// ___________________________________________________
// VARIABLES

let card = document.getElementsByClassName("card");
let cards = [].slice.call(document.querySelectorAll('.card'));

const deck = document.getElementById('deck');

let starList = document.querySelectorAll('.stars li');
let rating = document.querySelectorAll('.rating li');

let moves = 0;
let counter = document.querySelector('.moves');

let second = 0, minute = 0; hour = 0;
let interval;
let mins = document.querySelector('.minutes');
let secs = document.querySelector('.seconds');

const restart = document.querySelector('.restart');
const playAgain = document.querySelector('.play-again');

let matchedCard = document.getElementsByClassName('matched');

let openedCards = [];

const popup = document.getElementById('end');

// ___________________________________________________
// SHUFFLING CARDS

function shuffle(array) {
	let indexNumber = array.length, tempNumber, randomNumber;
	
	while (indexNumber !== 0) {
		randomNumber = Math.floor(Math.random()*indexNumber)
		indexNumber -= 1;
		tempNumber = array[indexNumber];
		array[indexNumber] = array[randomNumber];
		array[randomNumber] = tempNumber;
	};

	return array;
};

// ___________________________________________________
// SET/RESET GAME BOARD ON START UP

document.body.onload = start();

function start() {
	cards = shuffle(cards);

    for (var i = 0; i < cards.length; i++) {
        deck.innerHTML = '';
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove('open', 'matched', 'disabled');
        cards[i].classList.add('face-down');
    };

    moves = 0;
    counter.innerHTML = moves;
 
    for (var i= 0; i < starList.length; i++) {
        starList[i].classList.add('star-fill');
        starList[i].classList.remove('star-unfill');
        rating[i].classList.add('star-fill');
        rating[i].classList.remove('star-unfill');
    };

	second = 0;
    minute = 0; 
    hour = 0;
    mins.innerHTML = 0;
    secs.innerHTML = 0;
    clearInterval(interval);
};

const displayCard = function() {
	this.classList.toggle('face-down');
	this.classList.toggle('open');
	this.classList.toggle('disabled');
};

// ___________________________________________________
// MATCHING & UNMATCHING CARDS

function cardOpen() {
	openedCards.push(this);
	var length = openedCards.length;
	if(length === 2){
		moveCounter();
		if(openedCards[0].classList[1] === openedCards[1].classList[1]){
			matched();
		} else {
			unmatched();
		};
	};
};

function matched() {
	openedCards[0].classList.add('matched', 'disabled');
	openedCards[1].classList.add('matched', 'disabled');
	openedCards[0].classList.remove('open');
    openedCards[1].classList.remove('open');
    openedCards = [];
};

function unmatched() {
	openedCards[0].classList.add('unmatched');
	openedCards[1].classList.add('unmatched');
	disable();
	setTimeout(function() {
		openedCards[0].classList.add('face-down');
		openedCards[1].classList.add('face-down');
		openedCards[0].classList.remove('open', 'unmatched');
    	openedCards[1].classList.remove('open', 'unmatched');
    	enable();
    	openedCards = [];
	}, 1000);
};

function disable() {
	Array.prototype.filter.call(cards, function(card){
   		card.classList.add('disabled');
   		}
	);
};

function enable() {
	Array.prototype.filter.call(cards, function(card){
   		card.classList.remove('disabled');
   		for (let i = 0; i < matchedCard.length; i++) {
   			matchedCard[i].classList.add('disabled');
   		};
   	});
};

// ___________________________________________________
// MOVE COUNTER, TIMER & STAR RATING

function moveCounter() {
	moves++;
	counter.innerHTML = moves;
    if(moves == 1) {
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
	if (moves > 12 && moves < 14) {
		starList[2].classList.remove('star-fill');
		starList[2].classList.add('star-unfill');
		rating[2].classList.remove('star-fill');
		rating[2].classList.add('star-unfill');
	} else if (moves > 15) {
		starList[1].classList.remove('star-fill');
		starList[1].classList.add('star-unfill');
		rating[1].classList.remove('star-fill');
		rating[1].classList.add('star-unfill');
	};
};

function startTimer() {
	interval = setInterval(function() {
		mins.innerHTML = minute;
		secs.innerHTML = second;
		second++;
		if (second == 60) {
			minute++;
			second = 0;
		};
		if (minute == 60) {
			hour++;
			minute = 0;
		};
	}, 1000);
};

// ___________________________________________________
// SHOW ENDGAME OVERLAY

function end() {
	if (matchedCard.length == 16) {
		clearInterval(interval);
		popup.style.cssText = 'visibility: visible; opacity: 1';
		document.getElementById('total-moves').innerHTML = moves;
		document.getElementById('total-time').innerHTML = minute+' mins '+second+' secs';
	}
};

// ___________________________________________________
// EVENT LISTENERS

for (let i = 0; i < cards.length; i++) {
	card = cards[i];
	card.addEventListener('click', displayCard);
	card.addEventListener('click', cardOpen);
	card.addEventListener('click', end);
};

restart.addEventListener('click', function() {
	start();
	openedCards = [];
});

playAgain.addEventListener('click', function() {
	popup.style.cssText = 'visibility: hidden; opacity: 0';
	start();
	openedCards = [];
});