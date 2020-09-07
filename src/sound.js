'use strict';

const carrot__sound = new Audio('../sound/carrot_pull.mp3');
const alert__sound = new Audio('../sound/alert.wav');
const bg__sound = new Audio('../sound/bg.mp3');
const bug__sound = new Audio('../sound/bug_pull.mp3');
const win__sound = new Audio('../sound/game_win.mp3');

export function playCarrot() {
    play_sound(carrot__sound);
}
export function playBug() {
    play_sound(bug__sound);
}
export function playAlert() {
    play_sound(alert__sound);
}
export function playWin() {
    play_sound(win__sound);
}
export function playBackground() {
    play_sound(bg__sound);
}
export function stopBackground() {
    stop_sound(bg__sound);
}

function play_sound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stop_sound(sound) {
    sound.pause();
}