'use strict';
import Field from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    lose: 'lose',
    win: 'win',
    cancel: 'cancel',
});

//빌더 패턴 
export class GameBuilder {
    gameDuration(Duration) {
        this.gameDuration = Duration;
        return this;//클래스 자체를 리턴해줘서 체이닝하여 계속 클래스를 호출 할 수 있게
    }
    carrotCount(count) {
        this.carrotCount = count;
        return this;
    }
    bugCount(count) {
        this.bugCount = count;
        return this;
    }
    build() {
        return new Game(
            this.carrotCount,//
            this.bugCount,
            this.gameDuration
        );
    }
}

class Game {
    constructor(carrotCount, bugCount, gameDuration) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.gameDuration = gameDuration;

        this.gameStartButton = document.querySelector('.game-play');
        this.gameTimer = document.querySelector('.game-time');
        this.gameScore = document.querySelector('.game-score');
        this.gameStartButton.addEventListener('click', (event) => {

            if (this.started) {
                this.stop(Reason.cancel);
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
                this.stop(Reason.win);
            }
        } else if (item === 'bug') {
            this.stop(Reason.lose);
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
    stop(reason) {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(reason);
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
                this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose)
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