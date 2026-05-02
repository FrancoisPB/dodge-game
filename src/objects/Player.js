import { GAME_CONFIG } from "../config/GameConfig";

export default class Player{
    moving = false;

    constructor(scene, x, y) {
        this.scene = scene;
        if(!this.scene.physics){
            console.error("Physics not enables in scene!");
            return;
        }
        
        this.player = this.scene.add.spine(
            x,
            y,
            "spineboy-json",
            "spineboy-atlas"
        );

        // Hitbox
        this.body = scene.physics.add.image(x, y, null);
        this.body.setSize(40,80);
        this.body.setCollideWorldBounds(true);
        this.body.setVisible(false);
        
        // Adapt scale
        this.scale = GAME_CONFIG.PLAYER.SCALE;
        this.player.setScale(this.scale);

        this.speed = GAME_CONFIG.PLAYER.SPEED;
        this.cursors = scene.input.keyboard.createCursorKeys();

        this.state = "";
        this.setState("idle");
    }

    setState(newState){
        if(this.state === newState){
            return;
        }

        this.state = newState;

        switch(newState){
            case "idle":
                this.player.animationState.setAnimation(0, "idle", true);
                this.scene.sound.stopByKey("run");
                break;
            case "run":
                this.player.animationState.setAnimation(0, "run", true);
                this.scene.sound.play("run", {loop: true, seek: 0.4});
                break;
            case "death":
                this.player.animationState.setAnimation(0, "death", true);
                this.scene.sound.play("hit", {seek: 1});
                break;
        }
    }

    update(delta) {
        let moving = false;

        if(this.cursors.left.isDown){
            this.player.x -= this.speed * delta;
            this.player.scaleX = -this.scale;
            moving = true;
        }

        if(this.cursors.right.isDown){
            this.player.x += this.speed *delta;
            this.player.scaleX = this.scale;
            moving = true;
        }

        if (this.state !== "death") {

            moving ? this.setState("run") : this.setState("idle");
        }

        // Sync Spine with hitbox
        this.body.x = this.player.x;
        this.body.y = this.player.y;
    }
}