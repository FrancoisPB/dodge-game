export default class StartScene extends Phaser.Scene {
    constructor() {
        super("StartScence");
    }

    create() {
        this.add.text(300,250, "Dodge Game", {
            fontSize: "32px"
        });
        this.add.text(300,300, "Click to Start");

        this.input.once("pointerdown", () => {
            this.scene.start("GameScene");
        });
    }
}