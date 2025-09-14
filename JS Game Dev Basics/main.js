import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies.js";
import { UI } from "./UI.js";

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
            this.maxSpeed = 4;
            this.background = new Background(this);
            this.player = new Player(this); // Player class takes the Game Object as an arg, so you can pass "this"
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = []; // will hold all currently active enemy objects
            this.enemyTimer = 0; // increases until it hits the "enemy interval," when the game will add a new enemy in and reset timer
            this.enemyInterval = 1000; // will add a new enemy every 1000 milliseconds
            this.debug = true;
            this.stop = false;
            this.score = 0;
            this.fontColor = "black";
        }

        update(deltaTime){
            this.background.update();
            this.player.update(this.input.keys, deltaTime);

            // handling enemies
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime
            }
            this.enemies.forEach(enemy => { // .forEach() method executes a provided function once for each array element
                enemy.update(deltaTime);
                if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });
        }

        draw(context){
            this.background.draw(context); // need to draw the background before the player!
            this.player.draw(context); // calls the draw function from player.js (not this one!)
            this.UI.draw(context);

            // drawing enemies
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
        }

        addEnemy(){
            this.enemies.push(new FlyingEnemy(this));
            if(this.speed > 0 && Math.random() < 0.5){
                this.enemies.push(new GroundEnemy(this));
            } else if(this.speed > 0){
                this.enemies.push(new ClimbingEnemy(this));
            }
            console.log(this.enemies);
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
        if(!game.stop) game.update(deltaTime);
        game.draw(ctx);

        requestAnimationFrame(animate); // requests the browser to call a user-supplied callback function (animate() in this case) before the next repaint
            // auto adjusts the screen refresh rate (most people will get 60 frames/sec)
            // auto-generates a timestamp value each frame and passes it as an argument to the function it calls (in this case animate()); we will label it timeStamp
    }

    animate(0); // we have to pass 0 as the timeStamp the first time because we haven't run requestAnimationFrame yet to get a timestamp from there
});
