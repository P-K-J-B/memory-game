let card = document.getElementsByClassName("card");
let cards = [...card];

const deck = document.getElementById('deck');

let moves = 0;
let counter = document.querySelector('.moves');

const rating = document.getElementById('rating');
let starList = document.querySelectorAll('.stars li');

let matchedCard = document.getElementsByClassName('matched');

var openedCards = [];

function shuffle(array) {
	var indexNumber = array.length, tempNumber, randomNumber;
	
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
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("open", "match", "disabled");
    }

    moves = 0;
    counter.innerHTML = moves;
 
    for (var i= 1; i < starList.length; i++) {
        starList[i].classList.toggle('star-fill');
        starList[i].classList.toggle('star-unfill');
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
		if(openedCards[0].type === openedCards[1].type){
			matched();
		} else {
			unmatched();
		}
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
   		}
   	});
};


for (let i = 0; i < cards.length; i++) {
	card = cards[i];
	card.addEventListener('click', displayCard);
	card.addEventListener('click', cardOpen);
};