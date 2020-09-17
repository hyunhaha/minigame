'use strict';
import { GameBuilder, Reason } from './game.js';

export default class PopUp {
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up-message');
        this.popUpRefresh = document.querySelector('.pop-up-refresh');
        this.popUpNext = document.querySelector('.pop-up-next');
        this.popUpRefresh.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
        })
    }
    setClickListener(onClick) {
        this.onClick = onClick;
    }
    showWithText(text, reason) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up-hide');
        if (reason === Reason.win) {
            this.showPopUpNext();
        } else {
            this.hidePopUpNext();
        }

    }
    hide() {
        this.popUp.classList.add('pop-up-hide');
    }
    showPopUpNext() {
        this.popUpNext.classList.add('pop-up-next_active');
    }
    hidePopUpNext() {
        this.popUpNext.classList.remove('pop-up-next_active');

    }
}