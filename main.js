import Phaser, { Physics } from "phaser";
//import * as SpinePlugin from "@esotericsoftware/spine-phaser";
import { SpinePlugin } from "@esotericsoftware/spine-phaser/dist/SpinePlugin.js";
import GameScene from "./src/scenes/GameScene"
import StartScene from "./src/scenes/StartScene";
import GameOverScene from "./src/scenes/GameOverScene";
import { GAME_CONFIG } from "./src/config/GameConfig";

const config = {
    type: Phaser.AUTO,
    width: GAME_CONFIG.WORLD.WIDTH,
    height: GAME_CONFIG.WORLD.HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [StartScene, GameScene, GameOverScene],
    plugins: {
        scene: [
            {
                key: "spine.SpinePlugin",
                plugin: SpinePlugin,
                mapping: "spine"
            }
        ]
    }
};

new Phaser.Game(config);