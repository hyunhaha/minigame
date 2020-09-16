'use strict';
import Field from './field.js';
import * as sound from './sound.js';


export default class Game {
    constructor(carrotCount, bugCount, gameDuration) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.gameDuration = gameDuration;

        this.gameStartButton = document.querySelector('.game-play');
        this.gameTimer = document.querySelector('.game-time');
        this.gameScore = document.querySelector('.game-score');
        this.gameStartButton.addEventListener('click', (event) => {

            if (this.started) {
                this.stop();
            } else {
                this.start();
            }

        });

        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);

        this.gameStarted = false;
        this.score = 0;
        this.timerFunction = undefined;

    }

    onItemClick = (item) => {
        if (!this.started) {
            return;
        }
        const target = event.target;
        if (item === 'carrot') {
            this.score++;
            this.updateScoreBoard();
            if (this.score === this.carrotCount) {
                this.finish(true);
            }
        } else if (item === 'bug') {
            this.finish(false);
        }
    }

    start() {
        this.started = true;
        this.init();
        this.showTimerScore();
        this.showStopButton();
        this.startGameTimer();
        sound.playBackground();
    }
    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;

    }
    stop() {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.playAlert();
        sound.stopBackground();
        this.onGameStop && this.onGameStop('cancel');
    }
    finish(win) {
        this.stopGameTimer();
        this.hideGameButton();
        this.started = false;
        if (win) {
            sound.playWin();
        } else {
            sound.playBug();
        }
        sound.stopBackground();
        this.onGameStop && this.onGameStop(win ? 'win' : 'lose');

    }
    showTimerScore() {
        this.gameScore.style.visibility = "visible";
        this.gameTimer.style.visibility = "visible";
    }
    startGameTimer(SET_TIME) {
        let number = this.gameDuration;
        this.updateTimerText(number);
        this.timerFunction = setInterval(() => {
            if (number <= 0) {
                clearInterval(this.timerFunction);
                this.finish(this.carrotCount === this.score)
                return;
            } this.updateTimerText(--number);
        }, 1000);
        console.log(number);
    }
    stopGameTimer() {
        clearInterval(this.timerFunction);

    }
    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerHTML = `${minutes}:${seconds}`;
    }
    init() {
        this.gameScore.innerHTML = this.carrotCount;

        this.gameField.init();
        this.score = 0;


    }
    showStopButton() {
        const icon = document.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameStartButton.style.visibility = 'visible'
    }
    hideGameButton() {
        this.gameStartButton.style.visibility = 'hidden'
    }

    updateScoreBoard() {
        this.gameScore.innerHTML = this.carrotCount - this.score;
    }


}