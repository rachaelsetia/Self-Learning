import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";

// window.addEventListener(type, listener, options); allows us to execute the specified function whenever a particular event occurs on the browser window
// the load event fires when the whole page has finished loading; we want to make sure that everything is loaded before we do anything with it
    // JS will wait for all dependent resources (such as stylesheets and images) to be fully loaded and available before it runs
window.addEventListener('load', function(){
    const canvas = this.document.getElementById("main-canvas");
    const ctx = canvas.getContext("2d"); // putting "2d" --> reates a CanvasRenderingContext2D object representing a two-dimensional rendering context

    // canvas.width = this.window.innerWidth;
    // canvas.height = this.window.innerHeight;
        // I wanted the game to cover the entire tab, but the problem with doing it this way is that it takes the dimensions of the window at the time you load the page
        // so if you splitscreen, the dimensions will be more like a square and the aspect ratio can be inconsistent

    canvas.width = 1000;
    canvas.height = 500;

    class Game {
        constructor(width, height){ // constructors get auto executed when the class is called
            this.width = width;
            this.height = height;
            this.groundMargin = 83;
            this.speed = 0; // in pixels per frame; set to 0 bc player sits at beginning of game
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this); // Player class takes the Game Object as an arg, so you can pass "this"
            this.input = new InputHandler();
        }

        update(deltaTime){
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
        }

        draw(context){
            this.background.draw(context); // need to draw the background before the player!
            this.player.draw(context); // calls the draw function from player.js (not this one!)
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    // changing the frame rate for the player animation (but game will still run in 60 fps)
    let lastTime = 0; // holds the value of the timestamp from the prev animation loop

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime; // deltaTime should be about 16 sec if the display is 60Hz
        lastTime = timeStamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas each frame before drawing more things
        game.update(deltaTime);
        game.draw(ctx);

        requestAnimationFrame(animate); // requests the browser to call a user-supplied callback function (animate() in this case) before the next repaint
            // auto adjusts the screen refresh rate (most people will get 60 frames/sec)
            // auto-generates a timestamp value each frame and passes it as an argument to the function it calls (in this case animate()); we will label it timeStamp
    }

    animate(0); // we have to pass 0 as the timeStamp the first time because we haven't run requestAnimationFrame yet to get a timestamp from there
});