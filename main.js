import Phaser from "phaser";
import GameScene from "./src/scenes/GameScene"

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [GameScene]
};

new Phaser.Game(config);