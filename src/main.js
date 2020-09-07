'use strict';
import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const CARROT_COUNT = 5;
const BUG__COUNT = 5;
const SET_TIME = 5;

const start__button = document.querySelector('.game-play');
const timer = document.querySelector('.game-time');
const game_score = document.querySelector('.game-score');





let started = false;
let timer__function = undefined;
let score = 0;

const gameFinishedBanner = new PopUp();
gameFinishedBanner.setClickListener(() => {
    start_game();
});

const gamefield = new Field(CARROT_COUNT, BUG__COUNT);
gamefield.setClickListener(onItemClick);


function onItemClick(item) {
    if (!started) {
        return;
    }
    const target = event.target;
    if (item === 'carrot') {
        score++;
        update_score_board();
        if (score === CARROT_COUNT) {
            finish_game(true);
        }
    } else if (item === 'bug') {
        finish_game(false);
    }
}


start__button.addEventListener('click', (event) => {

    if (started) {
        stop_game();
    } else {
        start_game();
    }

});

function init() {
    game_score.innerHTML = CARROT_COUNT;
    timer.innerHTML = `0:${SET_TIME}`;
    gamefield.init();
    score = 0;


}



function start_game() {
    started = true;
    init();
    show_timer_score();
    show_stop_button();
    start_game_timer();
    sound.playBackground();
}

function stop_game() {
    started = false;
    stop_game_timer();
    hide_game_button();
    gameFinishedBanner.showWithText('Do it again ?');
    sound.playAlert();
    sound.stopBackground();
}

function finish_game(win) {
    started = false;
    hide_game_button();
    if (win) {
        sound.playWin();
    } else {
        sound.playBug();
    }
    stop_game_timer();
    sound.stopBackground();
    gameFinishedBanner.showWithText(win ? 'you won' : 'you lost');
}

function show_timer_score() {
    game_score.style.visibility = "visible";
    timer.style.visibility = "visible";
}
function start_game_timer() {
    let number = SET_TIME;
    update_timer_text(number);
    timer__function = setInterval(() => {
        if (number <= 0) {
            clearInterval(timer__function);
            finish_game(CARROT_COUNT === score)
            return;
        } update_timer_text(--number);
    }, 1000);
    console.log(number);
}

function stop_game_timer() {
    clearInterval(timer__function);
}

function update_timer_text(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timer.innerHTML = `${minutes}:${seconds}`;
}
function show_stop_button() {
    const icon = document.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    start__button.style.visibility = 'visible'
}


function hide_game_button() {
    start__button.style.visibility = 'hidden'
}




function update_score_board() {
    game_score.innerHTML = CARROT_COUNT - score;
}

