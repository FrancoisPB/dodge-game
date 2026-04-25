import Phaser from "phaser";
//import * as SpinePlugin from "@esotericsoftware/spine-phaser";
import { SpinePlugin } from "@esotericsoftware/spine-phaser/dist/SpinePlugin.js";
import GameScene from "./src/scenes/GameScene"

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [GameScene],
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