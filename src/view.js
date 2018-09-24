import { addEvent } from "./helpers";

import './styles/main.scss';

export default class View {
	constructor() {
		console.log("View loaded");

		this.guessInput = document.getElementById('guessInput');
		this.guessSubmit = document.getElementById('guess-submit');
		this.secretWordContainer = document.getElementById('secret-word-container');
		this.gameViewContainer = document.getElementById('game-view-container');
		this.userGuesses = document.getElementById('user-guesses');
		this.gameMessage = document.getElementById('game-message');
		this.pre = [];

	}

	/**
	 * Sets the game view, should also set the correct pieces of the hangman
	 */
	setGameView() {
		let img = document.createElement('img');
		img.id = 'game-view';
		this.gameViewContainer.appendChild(img);
		this.guessInput.maxLength = 1;

	}
	/**
	 * This displays the secret word as underscores. One underscore per letter.
	 * @param {Array} secretWord
	 */
	setSecretWordDisplay(secretWord) {
		let letterPlaces = '_';

		for (let i = 1; i < secretWord.length; i++) {
			letterPlaces += ' _';
		}

		this.secretWordContainer.innerHTML = letterPlaces;
	}

	/**
	 *
	 * @param {string} secretWordUpdate - A string containing correct user guesses and remaining letters as underscores
	 * @param {Object} gameUpdate - Contains information on the current status of the game
	 * @param {string} gameUpdate.remainingGuesses - How many more times user can guess
	 * @param {Array} gameUpdate.userGuesses - Contains all of the user guesses
	 */
	updateSecretWordDisplay(secretWordUpdate, gameUpdate) {
		this.secretWordContainer.innerHTML = secretWordUpdate;
		console.log("and the game status is..", gameUpdate);
		this.updateUserGuessDisplay(gameUpdate.userGuesses);
	}

	/**
	 * Displays and updates the user guesses on screen
	 * @param userGuesses
	 */
	updateUserGuessDisplay(userGuesses) {
		if (this.pre.length === 0 || userGuesses.length > this.pre.length) {
			if(this.userGuesses.classList.contains('animated','wobble')){
				this.userGuesses.classList.remove('animated','wobble');	
			}
			setTimeout(()=>{
			this.userGuesses.innerHTML = `Your guesses so far: <span class='bold'>${userGuesses}</span>`;
			this.pre.push(userGuesses);
			this.userGuesses.classList.add('animated', 'wobble');
			},200)
		}

	}

	/**
	 * Adds event listener to the submit button. Checks for input then tells controller to add guess
	 * @param {Function} handler
	 */

	bindSaveUserGuess(handler) {
		addEvent(this.guessSubmit, 'click', (e) => {
			const guessedLetter = this.guessInput.value.trim();
			if (guessedLetter) {
				handler(this.guessInput.value);
			} else {
				console.log("no value submitted");
			}
			this.guessInput.value = "";
		});

		//listens for the enter key
		document.addEventListener('keypress', (e) => {
			if (e.which == 13) {
				this.guessSubmit.click();
			}
		});
	}

	/*
	 * The game is won
	 */
	SetVictory() {
		this.gameMessage.innerHTML = `<p class="correct">Congratulations! You WIN :)</p>`;
		document.getElementById('secret-word-container').className += 'correct';
		document.getElementById("guessInput").disabled = true;
		document.getElementById("guess-submit").disabled = true;
	}
	
	/*
	 * The loser lost
	 */
	SetLoss() {
		console.log('no more guesses remaining');
		document.getElementById("guessInput").disabled = true;
		document.getElementById("guess-submit").disabled = true;
		this.gameMessage.innerHTML = `<p class="error">You are dead!!! Correct word was <strong>`+this.secretWord.join("")+`</strong></p>`;
		document.getElementById('secret-word-container').className += 'error';
	}

	SetIncorrectAnswer() {
		// Add a body part, add text
	}
}