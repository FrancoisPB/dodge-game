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

        this.physics.world.setBounds(0,0,800,600);

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

        // Particles
        this.particles = this.add.particles(0, 0, null, {
            speed: { min: -200, max: 200 },
            scale: { start: 0.5, end: 0 },
            lifespan: 500,
            quantity: 20,
            emitting: false
        });
    }

    update(time, delta) {
        let moving = false;
        const dt = delta / 1000;

        this.player.update(dt);

        this.enemies.forEach(enemy => {
            enemy.update(dt);

            this.physics.add.overlap(this.player.body, enemy.body, () => {
                this.particles.emitParticleAt(enemy.body.x, enemy.body.y);

                enemy.body.destroy();
                enemy.sprite.destroy();

                this.player.setState("death");

                this.time.addEvent({
                    delay: 1300,
                    loop: false,
                    callback: () => {
                        this.scene.start("GameOverScene", { score: Math.floor(this.score / 1000) });
                    }
                });
            });
        });

        this.score += delta;
        this.scoreText.setText("Score: " + Math.floor(this.score / 1000));
    }
}