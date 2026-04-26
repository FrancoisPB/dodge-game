export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    init(data){
        this.score = data.score;
    }

    create() {
        this.add.text(300,250, "Game Over");
        this.add.text(300,300,"Score: "+this.score);
        this.add.text(300,350, "Click to restart");

        this.input.once("pointerdown", () => {
            this.scene.start("GameScene");
        });
    }
}