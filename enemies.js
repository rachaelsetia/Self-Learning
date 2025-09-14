class Enemy {
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }

    update(deltaTime){
        // movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        // check if enemy is off-screen
        if(this.x + this.width < 0) this.markedForDeletion = true;
    }

    draw(context) {
        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        
        // sy is set to 0 because these enemies only have one line for their sprite sheet
        context.drawImage(this.image, (this.frameX * this.width), 0, this.width, this.height, this.x, this.y, this.width, this.height)
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game){
        super(); // runs the constructor
        this.game = game;
        this.width = 60;
        this.height = 44;
        this.x = game.width;
        this.y = Math.random() * (game.height * 0.5);
        this.speedX = Math.random() + 1; // rand num between 1 and 2
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = document.getElementById("flying-enemy");
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1; // velocity of angle
    }

    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle * 0.5) * 2; // passing a slowly increasing angle to Math.sin() will map positions along sine wave
            // I added multipliers to increase the amplitude and the wavelength of the path
    }

    draw(context){
        super.draw(context);
    }
}

export class GroundEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 60;
        this.height = 87;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById("plant-enemy");
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 1;
    }

    // if no update or draw methods are explicitly written, update() and draw() function calls to a ground enemy object will use the update() and draw() functiosn of the parent class
}

export class ClimbingEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 120;
        this.height = 144;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.image = document.getElementById("spider-enemy");
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 1 : -1; // a TERNARY OPERATOR; has 3 operands, can be used as a simple 1 line if/else statement
            // if Math.random() is greater than 0.5, set value to 1; else set value to -1
        this.maxFrame = 5;
    }

    update(deltaTime){
        super.update(deltaTime);
        if(this.y > this.game.height - this.height - this.game.groundMargin){
            this.speedY *= -1;
        }
        if(this.y < -this.height){
            this.markedForDeletion = true;
        }
    }

    draw(context){
        super.draw(context);

        // creating the spider web
        context.beginPath(); // starts a line
        context.moveTo((this.x + this.width * 0.5), 0);
        context.lineTo((this.x + this.width * 0.5), (this.y + 50));
        context.stroke();
    }
}