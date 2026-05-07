import { GAME_CONFIG } from "../config/GameConfig";
export default class Enemy {
    constructor(scene, x, y) {
        this.scene = scene;
        if (!this.scene.physics) {
            console.error("Physics not enables in scene!");
            return;
        }

        this.sprite = this.scene.add.spine(
            x,
            y,
            "spineboy-json",
            "spineboy-atlas"
        );
        this.sprite.setScale(-GAME_CONFIG.ENEMY.SCALE);
        this.speed = GAME_CONFIG.ENEMY.SPEED;

        // Hitbox
        this.body = scene.physics.add.image(x, y, null);
        this.body.setSize(40, 80);
        this.body.setCollideWorldBounds(true);
        this.body.setVisible(false);

        this.sprite.animationState.setAnimation(0, "shoot", true);

        // Rotate to fire down
        const gunBone = this.sprite.skeleton.findBone("gun");
        gunBone.data.rotation = 90 ;
    }

    update(delta) {
        this.sprite.y += delta * this.speed;

        // Sync Spine with hitbox
        this.body.x = this.sprite.x;
        this.body.y = this.sprite.y;
    }
}