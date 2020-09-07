'use strict';
import PopUp from './popup.js';
//1.paly버튼이 눌러지면
//  -시간이 시작
//  -카운트 시작
//  -그림이 뿌러짐
//      -랜덤정수
//      -정수를 그림포지션에 넣기
//2.아이템들(벌레 당근)이 클릭되면
//  -클릭된것이 없어짐
//  -카운트 마이너스
//  -벌레클릭시 게임오버
//3. 당근이 모두 선택되면
//  -게임 클리어
const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG__COUNT = 5;
const SET_TIME = 5;
const field = document.querySelector('.game-field');
const field__rect = field.getBoundingClientRect();
const start__button = document.querySelector('.game-play');
const timer = document.querySelector('.game-time');
const game_score = document.querySelector('.game-score');


const carrot__sound = new Audio('../sound/carrot_pull.mp3');
const alert__sound = new Audio('../sound/alert.wav');
const bg__sound = new Audio('../sound/bg.mp3');
const bug__sound = new Audio('../sound/bug_pull.mp3');
const win__sound = new Audio('../sound/game_win.mp3');

const gameFinishedBanner = new PopUp();
gameFinishedBanner.setClickListener(start_game);

let started = false;
let timer__function = undefined;
let score = 0;
field.addEventListener('click', onField_clicked)
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
    field.innerHTML = '';
    score = 0;
    additem('carrot', 'img/carrot.png', CARROT_COUNT);
    additem('bug', 'img/bug.png', BUG__COUNT);

}

function additem(className, img, count) {
    const x1 = 0;
    const x2 = field__rect.width - CARROT_SIZE;
    const y1 = 0;
    const y2 = field__rect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', img);
        item.style.position = 'absolute';
        item.style.cursor = 'pointer';
        const x = getRandomIntInclusive(x1, x2);
        const y = getRandomIntInclusive(y1, y2);
        item.style.top = `${y}px`;
        item.style.left = `${x}px`;
        field.appendChild(item);
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}
function start_game() {
    started = true;
    init();

    show_timer_score();
    show_stop_button();
    start_game_timer();
    play_sound(bg__sound);
}

function stop_game() {
    started = false;
    stop_game_timer();
    hide_game_button();
    gameFinishedBanner.showWithText('Do it again ?');
    play_sound(alert__sound);
    stop_sound(bg__sound);
}

function finish_game(win) {
    started = false;
    hide_game_button();
    if (win) {
        play_sound(win__sound);
    } else {
        play_sound(bug__sound);
    }
    stop_game_timer();
    stop_sound(bg__sound);
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



function onField_clicked(event) {

    if (!started) {
        return;
    }
    const target = event.target;
    if (target.matches('.carrot')) {
        console.log('carrot')
        target.remove();
        score++;
        play_sound(carrot__sound);
        update_score_board();
        if (score === CARROT_COUNT) {

            finish_game(true);
        }
    } else if (target.matches('.bug')) {

        finish_game(false);

    }
}

function update_score_board() {
    game_score.innerHTML = CARROT_COUNT - score;
}

function play_sound(sound) {
    sound.currentTime = 0;
    sound.play();
}
function stop_sound(sound) {
    sound.pause();
}