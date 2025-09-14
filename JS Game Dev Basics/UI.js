export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = "Ubuntu";
    }

    draw(context){
        context.font = this.fontSize + "px " + this.fontFamily; // usually looks something like this: context.font = "bold 48px serif"
        context.textAlign = "left";
        context.fillStyle = this.game.fontColor;

        // score
        // .fillText() method fraws filled text on the canvas; default color = black
        // .fillText(text, x, y, maxWidth)
        context.fillText("Score: " + this.game.score, 20, 40);
    }
}
