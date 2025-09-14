export class InputHandler {
    constructor(game){
        this.game = game;
        this.keys = []; // keys pressed down will be added to the array, and keys released will be removed

        window.addEventListener("keydown", e => { // keydown event is fired when any key is pressed (even ones that don't produce characters)
            // in this case, the e refers to the Event object itself (not the letter/key)
            // e.key provides the string value of the key pressed during a keyboard event
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event for more about the keydown event

            //this makes sure that we can only add each type of key once to our array (index of -1 means it doesn't exist in the array)
            // === is strict equality (while == is loose); strict equality operator always considers operands of different types to be different (while loose can try to convert)
            // BE CAREFUL!!! if you want to use alt or ctrl, be aware that mac and windows code these two keys differently! (use console.log(e.key) and press them to see what your machine uses)
            if((    e.key === "ArrowDown" ||
                    e.key === "ArrowUp" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight" ||
                    e.key === "Enter"
                ) && this.keys.indexOf(e.key) === -1){ 
                this.keys.push(e.key);
            } else if(e.key === "d"){
                this.game.debug = !this.game.debug; // adding a debug mode where we can see the hitboxes of all enemies and the player
            }
            else if(e.key === "s"){
                this.game.stop = !this.game.stop;
            }

        });

        window.addEventListener("keyup", e => {
            if(    e.key === "ArrowDown" ||
                    e.key === "ArrowUp" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight" ||
                    e.key === "Enter"){
                // splice(startIndex, removeCount) where startIndex is the first index of the section you want to remove and removeCount is how many total you want to remove
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}