'use strict';
import PopUp from './popup.js';
import Gamebuilder from './game.js';

const gameFinishedBanner = new PopUp();
const game = new Gamebuilder()
    .carrotCount(5)
    .bugCount(5)
    .gameDuration(5)
    .build();
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


