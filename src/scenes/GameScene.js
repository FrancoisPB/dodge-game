import Player from "../objects/Player";
import Enemy from "../objects/Enemy";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.spineJson("spineboy-json", "assets/spine/spineboy.json");
        this.load.spineAtlas("spineboy-atlas", "assets/spine/spineboy.atlas");
        this.load.audio("hit", "assets/hit.mp3");
        this.load.audio("run", "assets/run.mp3");
    }

    create(){

        this.physics.world.setBounds(0,0,800,600);

        this.player = new Player(this, 400, 600);

        // Add enemies with progressive difficulty
        this.enemies = [];
        this.spawnDelay = 1000;
        const spawnEnemy = () => {
            const x = Phaser.Math.Between(50, 750);
            this.enemies.push(new Enemy(this, x, 0));
            this.spawnDelay = Math.max(this.spawnDelay*0.98,200);

            if (this.spawnEvent) {
                this.spawnEvent.destroy();
            }

            this.spawnEvent = this.time.addEvent({
                delay: this.spawnDelay,
                loop: false,
                callback: spawnEnemy
            });
        };

        this.spawnEvent = this.time.addEvent({
            delay: this.spawnDelay,
            loop: false,
            callback: spawnEnemy
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

                // Camera shake
                this.cameras.main.shake(200, 0.01);

                // Audio
                this.sound.play("hit");

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

            
            if(enemy.body.y > 700) {
                enemy.body.destroy();
                enemy.sprite.destroy();
            }
        });

        this.score += delta;
        this.scoreText.setText("Score: " + Math.floor(this.score / 1000));
    }
}