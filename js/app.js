let card = document.getElementsByClassName("card");
let cards = [...card];

const deck = document.getElementById('deck');

const rating = document.getElementById('rating');
let starList = document.querySelectorAll('.stars li');

let moves = 0;
let counter = document.querySelector('.moves');

const restart = document.getElementById('restart');

let matchedCard = document.getElementsByClassName('matched');

let openedCards = [];

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
    };
};

const displayCard = function() {
	this.classList.toggle('face-down');
	this.classList.toggle('open');
	this.classList.toggle('disabled');
};

function cardOpen() {
	openedCards.push(this);
	var length = openedCards.length;
	if(length === 2){
		moveCounter();
		if(openedCards[0].type === openedCards[1].type){
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

function moveCounter() {
	moves++;
	counter.innerHTML = moves;
	if (moves > 8 && moves < 12) {
		starList[2].classList.remove('star-fill');
		starList[2].classList.add('star-unfill');
	} else if (moves > 13) {
		starList[1].classList.remove('star-fill');
		starList[1].classList.add('star-unfill');
	};
};

for (let i = 0; i < cards.length; i++) {
	card = cards[i];
	card.addEventListener('click', displayCard);
	card.addEventListener('click', cardOpen);
};

restart.addEventListener('click', function() {
	start();
	openedCards = [];
});