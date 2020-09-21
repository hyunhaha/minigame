'use strict';
import * as sound from './sound.js';

const CARROT_SIZE = 80;
export default class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.field = document.querySelector('.game-field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', this.onClick);
    }
    init() {
        this.field.innerHTML = '';
        this._additem('carrot', 'img/clover.png', this.carrotCount);
        this._additem('bug', 'img/bug2.png', this.bugCount);
    }
    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }
    _additem(className, img, count) {
        const x1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y1 = 0;
        const y2 = this.fieldRect.height - CARROT_SIZE;
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
            this.field.appendChild(item);
        }
    }

    onClick = (event) => {
        const target = event.target;
        if (target.matches('.carrot')) {
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick('carrot');
        } else if (target.matches('.bug')) {
            this.onItemClick && this.onItemClick('bug');
        }
    };
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}