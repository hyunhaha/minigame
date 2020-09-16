'use strict';
import PopUp from './popup.js';
import Game from './game.js';

const gameFinishedBanner = new PopUp();
const game = new Game(5, 5, 5);
game.setGameStopListener(reason => {
    console.log(reason);
    let message;
    switch (reason) {
        case 'lose':
            message = 'YOU LOST';
            break;
        case 'win':
            message = 'YOU WIN!';
            break;
        case 'cancel':
            message = 'REPLAY?';
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishedBanner.showWithText(message);
})

gameFinishedBanner.setClickListener(() => {
    game.start();
});


