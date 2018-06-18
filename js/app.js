let card = document.getElementsByClassName("card");
let cards = [...card];

const deck = document.getElementById('deck');

let moves = 0;
let counter = document.querySelector('.moves');

const rating = document.getElementById('rating');
let starList = document.querySelectorAll('.stars li');

let matched = document.getElementsByClassName('matched');

var openedCards = [];

function shuffle(array) {
	var indexNumber = array.length, tempNumber, randomNumber;
	
	while (indexNumber !== 0) {
		randomNumber = Math.floor(Math.random()*indexNumber)
		indexNumber -= 1;
		tempNumber = array[indexNumber];
		array[indexNumber] = array[randomNumber];
		array[randomNumber] = tempNumber;
	}

	return array;
};

document.body.onload = start();

function start() {
	cards = shuffle(cards);

    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("open", "match", "disabled");
    }

    moves = 0;
    counter.innerHTML = moves;
 
    for (var i= 1; i < starList.length; i++){
        starList[i].classList.toggle('star-fill');
        starList[i].classList.toggle('star-unfill');
    }

    var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("face-down");
    this.classList.toggle("disabled");
	}
};

