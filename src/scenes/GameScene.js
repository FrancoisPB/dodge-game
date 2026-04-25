import Player from "../objects/Player";
import Enemy from "../objects/Enemy";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.spineJson("spineboy-json", "assets/spine/spineboy.json");
        this.load.spineAtlas("spineboy-atlas", "assets/spine/spineboy.atlas");
    }

    create(){
        console.log(this.spine);

        this.player = new Player(this, 400, 500);

        this.enemies = [];

        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                const x = Phaser.Math.Between(50, 750);
                this.enemies.push(new Enemy(this, x, 0));
            }
        });

        this.score = 0;
        this.scoreText = this.add.text(10,10, "Score: 0");
    }

    update(time, delta) {
        let moving = false;
        const dt = delta / 1000;

        this.player.update(dt);

        //this.player.update(dt);
        this.enemies.forEach(enemy => {
            enemy.update(dt)

            const dx = enemy.sprite.x - this.player.x;
            const dy = enemy.sprite.y - this.player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 40) {
                console.log("GAME OVER");
                this.player.animationState.setAnimation(0, "death", true);
                this.currentAnim = "death";
                
                this.scene.restart();
            }
        });

        this.score += delta;
        this.scoreText.setText("Score: " + Math.floor(this.score / 1000));
    }
}