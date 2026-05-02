import Enemy from "../objects/Enemy";

export default class EnemyManager{
    constructor(scene, player, cb_goToGameOverScene) {
        this.scene = scene;
        this.enemies = [];
        this.enemyGroup = this.scene.physics.add.group();
        this.spawnDelay = 1000;
        this.player = player;

        this.scene.physics.add.overlap(
            this.player.body,
            this.enemyGroup,
            (playerBody, enemyBody) => {
                console.log(enemyBody.x + " : "+enemyBody.y);
                this.scene.particles.emitParticleAt(enemyBody.x, enemyBody.y);

                // Camera shake
                this.scene.cameras.main.shake(200, 0.01);

                // Audio
                this.scene.sound.play("hit");

                this.scene.player.setState("death");

                enemyBody.destroy();

                cb_goToGameOverScene();
            }
        )
    }

    // Add enemies with progressive difficulty
    spawnEnemy() {
        const spawn = () => {
            const x = Phaser.Math.Between(50, 750);
            const enemy = new Enemy(this.scene, x, 0);
            this.enemies.push(enemy);
            this.enemyGroup.add(enemy.body);
            this.spawnDelay = Math.max(this.spawnDelay * 0.98, 200);

            if (this.spawnEvent) {
                this.spawnEvent.destroy();
            }

            this.spawnEvent = this.scene.time.addEvent({
                delay: this.spawnDelay,
                loop: false,
                callback: spawn
            });
        };

        this.spawnEvent = this.scene.time.addEvent({
            delay: this.spawnDelay,
            loop: false,
            callback: spawn
        });

        spawn();
    }

    update(dt) {
        this.enemies.forEach(enemy => {
            enemy.update(dt);

            
            if(enemy.body.y > 700) {
                enemy.body.destroy();
                enemy.sprite.destroy();
            }
        });
    }
}