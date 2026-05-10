import { GAME_CONFIG } from "../config/GameConfig";

export default class StartScene extends Phaser.Scene {
    constructor() {
        super("StartScence");
    }

    create() {
        this.add.text(GAME_CONFIG.START_TEXT.X, GAME_CONFIG.START_TEXT.Y_DOGDE_GAME, "Dodge Game", {
            fontSize: "32px"
        });
        this.add.text(GAME_CONFIG.START_TEXT.X, GAME_CONFIG.START_TEXT.Y_INSTRUCTIONS, "Use left and right arrows \nto move the player", {
            fontSize: "16px"
        });
        this.add.text(GAME_CONFIG.START_TEXT.X, GAME_CONFIG.START_TEXT.Y_CLICK, "Click to Start");

        this.input.once("pointerdown", () => {
            this.scene.start("GameScene");
        });
    }
}