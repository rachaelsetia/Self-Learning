const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
}

class State {
    constructor(state){
        this.state = state;
    }
}

export class Sitting extends State {
    constructor(player){
        super("SITTING"); // runs the State constructor, allows us to use the "this" keyword
        this.player = player;
    }

    enter(){ // will run once when this state is entered
        this.player.frameX = 0; // to prevent blinking in case we switch states while we are on RUNNING frame 8 for example
        this.player.maxFrame = 4;
        this.player.frameY = 5; // the row of sitting sprites
    }

    handleInput(input){ // will run 60 times a second waiting for keys to be pressed to switch the player into a diff state
        if(input.includes("ArrowLeft") || input.includes("ArrowRight")){
            this.player.setState(states.RUNNING);
        }
    }
}

export class Running extends State {
    constructor(player){
        super("RUNNING");
        this.player = player;
    }

    enter(){
        this.player.frameX = 0;
        this.player.maxFrame = 8;
        this.player.frameY = 3;
    }

    handleInput(input){
        if(input.includes("ArrowDown")){
            this.player.setState(states.SITTING);
        } else if(input.includes("ArrowUp")){
            this.player.setState(states.JUMPING);
        }
    }
}

export class Jumping extends State {
    constructor(player){
        super("JUMPING");
        this.player = player;
    }

    enter(){
        this.player.frameX = 0;
        if(this.player.onGround()) this.player.vy -= 30;
        this.player.maxFrame = 6;
        this.player.frameY = 1;
    }

    handleInput(input){
        if(this.player.vy > this.player.weight){ //checks if player has hit the peak of the jump
            this.player.setState(states.FALLING);
        }
    }
}

export class Falling extends State {
    constructor(player){
        super("FALLING");
        this.player = player;
    }

    enter(){
        this.player.frameX = 0;
        this.player.maxFrame = 6;
        this.player.frameY = 2;
    }

    handleInput(input){
        if(this.player.onGround()){
            this.player.setState(states.RUNNING);
        }
    }
}