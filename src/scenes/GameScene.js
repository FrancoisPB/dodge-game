import Player from "../objects/Player";
import Enemy from "../objects/Enemy";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create(){
        this.player = new Player(this, 400, 550);
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
        const dt = delta / 1000;

        this.player.update(dt);
        this.enemies.forEach(enemy => {
            enemy.update(dt)

            const dx = enemy.sprite.x - this.player.sprite.x;
            const dy = enemy.sprite.y - this.player.sprite.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 40) {
                console.log("GAME OVER");
                this.scene.restart();
            }
        });

        this.score += delta;
        this.scoreText.setText("Score: " + Math.floor(this.score / 1000));
    }
}