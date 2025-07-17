import { Player } from "./player.js";
import { InputHandler } from "./input.js";

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

    canvas.width = 1920;
    canvas.height = 1080

    class Game {
        constructor(width, height){ // constructors get auto executed when the class is called
            this.width = width;
            this.height = height;
            this.player = new Player(this); // Player class takes the Game Object as an arg, so you can pass "this"
            this.input = new InputHandler();
        }

        update(){
            this.player.update(this.input.keys);
        }

        draw(context){
            this.player.draw(context); // calls the draw function from player.js (not this one!)
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas each frame before drawing more things
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate); // requests the browser to call a user-supplied callback function (animate() in this case) before the next repaint
    }

    animate();
});