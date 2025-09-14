import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit } from "./playerStates.js";

export class Player { // must export this class so it can be used in a different module or file; each file can have unlimited amount of exports
    constructor(game){ // takes the entire game Object as an arg (from main.js)
        this.game = game;
        this.width = 100; // this width and height are based off of the provided sprite sheet (from Franks laboratory tutorial); custom sprite sheet = new width and height
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;

        this.image = document.getElementById("player");
            // JS auto creates references to all elements with IDs into the gloabl namespace and uses the ID as the variable name
            // so this line: this.image = player; would also work

        this.speed = 0;
        this.maxspeed = 10; // in pixels/second (for x-movement)
        this.vy = 0; // vertical speed
        this.weight = 1;

        this.frameX = 0; // frameX and frameY refer to which sprite on the grid we want to display
        this.frameY = 0; // the values are the column and row numbers
        this.maxFrame;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0; // cycles between 0 and frameInterval; increases by deltaTime each frame

        this.states = [ new Sitting(this),
                        new Running(this),
                        new Jumping(this),
                        new Falling(this),
                        new Rolling(this),
                        new Diving(this),
                        new Hit(this)];
        this.currentState = this.states[0];
        this.currentState.enter(); // activates initial default state
    }

    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input); // reminder that input is an array of keys being pressed

        // horizontal movement
        this.x += this.speed;

        // .includes() determines whether an array includes a certain value among its entries; returns true or false
        if(input.includes("ArrowRight")) this.speed = this.maxspeed;
        else if (input.includes("ArrowLeft")) this.speed = -this.maxspeed;
        else {
            // I added this so that when in the air, momentum from x-movement will create an arc when jumping
            if(this.speed > 0 && !this.onGround()) this.speed -= this.weight/3; // weight/3 is arbitrary tbh
            else if(this.speed < 0 && !this.onGround()) this.speed += this.weight/3;
            else this.speed = 0;
        }

        // preventing player from leaving the canvas
        if(this.x < 0) this.x = 0;
        if(this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        // vertical movement (jumping)
        // if(input.includes("ArrowUp") && this.onGround()) this.vy -= 30; --- commented out bc jumping is refactored in the playerStates.js file
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0; // so the player cannot keep falling past the canvas

        // sprite animation
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime; // we add to the timer the amount (deltaTime) in each new frame to get the millisecond count/timer
        }
    }

    draw(context){ // takes context as an arg so we know what canvas we want to draw on
        // .strokeRect() is a method of the Canvas 2D API that draws a rectangle that is stroked/outlined; .fillRect() will draw a filled rectangle
        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height); // draws the player hitbox

        // drawImage(img, sx, sy, swidth, sheight, x, y, width, height) where s-values are where you start clipping/cropping the img
        // a special HTML canvas method that you can use to draw (and even animate) an image
        context.drawImage(this.image, (this.frameX * this.width), (this.frameY * this.height), this.width, this.height, this.x, this.y, this.width, this.height)
    }

    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    setState(state, speedMod){ // state arg is a number that is the index of the state in the this.states array
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speedMod;
        this.currentState.enter();
    }

    checkCollision(){
        this.game.enemies.forEach(enemy => {
            if(
                // these might work, but it's a lot more complicated than what the tutorial tells me to do
                // ((enemy.x < this.x + this.width && enemy.x > this.x) ||
                // (enemy.x + enemy.width < this.x + this.width && enemy.x + enemy.width > this.x)) &&
                // ((enemy.y < this.y + this.height && enemy.y > this.y) ||
                // (enemy.y + enemy.height < this.y + this.height && enemy.y + enemy.height > this.y))

                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.width &&
                enemy.y + enemy.height > this.y
            ){
                // collision detected
                console.log(this.currentState);
                if(this.currentState.state == "ROLLING"){
                    enemy.markedForDeletion = true;
                    this.game.score++;
                }
            } else {
                // no collision
            }
        });
    }
}
