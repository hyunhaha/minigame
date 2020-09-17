'use strict';
import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';

const gameFinishedBanner = new PopUp();
const game = new GameBuilder()
    .carrotCount(5)
    .bugCount(5)
    .gameDuration(5)
    .build();

game.setGameStopListener(reason => {
    console.log(reason);
    let message;
    switch (reason) {
        case Reason.lose:
            message = 'YOU LOST';
            sound.playBug();
            break;
        case Reason.win:
            message = 'YOU WIN!';
            sound.playWin();

            break;
        case Reason.cancel:
            message = 'REPLAY?';
            sound.playAlert();
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishedBanner.showWithText(message, reason);
})

gameFinishedBanner.setClickListener(() => {
    game.start();
});


