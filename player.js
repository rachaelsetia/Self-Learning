export class Player { // must export this class so it can be used in a different module or file; each file can have unlimited amount of exports
    constructor(game){ // takes the entire game Object as an arg (from main.js)
        this.game = game;
        this.width = 100; // this width and height are based off of the provided sprite sheet (from Franks laboratory tutorial); custom sprite sheet = new width and height
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height;

        this.image = document.getElementById("player");
            // JS auto creates references to all elements with IDs into the gloabl namespace and uses the ID as the variable name
            // so this line: this.image = player; would also work

        this.speed = 0;
        this.maxspeed = 10; // in pixels/second (for x-movement)
        this.vy = 0; // vertical speed
        this.weight = 1; 
    }

    update(input){
        // horizontal movement
        this.x += this.speed;
        // .includes() determines whether an array includes a certain value among its entries; returns true or false
        if(input.includes("ArrowRight")) this.speed = this.maxspeed;
        else if (input.includes("ArrowLeft")) this.speed = -this.maxspeed;
        else this.speed = 0;

        // preventing player from leaving the canvas
        if(this.x < 0) this.x = 0;
        if(this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        //vertical movement (jumping)
        if(input.includes("ArrowUp") && this.onGround()) this.vy -= 30;
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0; // so the player cannot keep falling past the canvas
    }

    draw(context){ // takes context as an arg so we know what canvas we want to draw on
        // this was only used for demonstrating the basic draw function
        // context.fillStyle = "red";
        // context.fillRect(this.x, this.y, this.width, this.height);

        // drawImage(img, sx, sy, swidth, sheight, x, y, width, height) where s-values are where you start clipping/cropping the img
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height) // a special HTML canvas method that you can use to draw (and even animate) an image
    }

    onGround(){
        return this.y >= this.game.height - this.height;
    }
}