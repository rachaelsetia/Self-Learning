class Layer {
    constructor(game, width, height, speedModifier, image){
        this.game = game;
        this.width = width; //these are the width and height of the bg image
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }

    update(){
        if(this.x < -this.width) this.x = 0;
        else this.x -= this.game.speed * this.speedModifier;
    }

    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height); // drawImage() is a built-in canvas function
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height); // we never use all of img2
            // once img1 is fully out of frame, it moves back to x = 0 and img2 will be out of frame again
    }
}

export class Background {
    constructor(game){
        this.game = game;
        this.width = 1667;
        this.height = 500;

        this.layer1image = document.getElementById("layer1"); // sky
        this.layer2image = document.getElementById("layer2"); // far buildings
        this.layer3image = document.getElementById("layer3"); // clouds
        this.layer4image = document.getElementById("layer4"); // close buildings
        this.layer5image = document.getElementById("layer5"); // ground
        this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1image);
        this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2image);
        this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3image);
        this.layer4 = new Layer(this.game, this.width, this.height, 0.7, this.layer4image);
        this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5image);
        
        this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];
    }

    update(){
        this.backgroundLayers.forEach(layer => {
            layer.update();
        });
    }

    draw(context){
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        });
    }
}
