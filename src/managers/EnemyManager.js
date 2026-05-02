import Enemy from "../objects/Enemy";
import { GAME_CONFIG } from "../config/GameConfig";

export default class EnemyManager{
    constructor(scene) {
        this.scene = scene;
        this.enemies = [];
        this.enemyGroup = this.scene.physics.add.group();
        this.spawnDelay = GAME_CONFIG.SPAWN.INITIAL_DELAY;
        
    }

    // Add enemies with progressive difficulty
    spawnEnemy() {
        const spawn = () => {
            const x = Phaser.Math.Between(GAME_CONFIG.SPAWN.MIN_SPAWN_X, GAME_CONFIG.SPAWN.MAX_SPAWN_X);
            const enemy = new Enemy(this.scene, x, 0);
            this.enemies.push(enemy);
            this.enemyGroup.add(enemy.body);
            this.spawnDelay = Math.max(this.spawnDelay * GAME_CONFIG.SPAWN.DECAY, GAME_CONFIG.SPAWN.MIN_DELAY);

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

            if(enemy.body.y > GAME_CONFIG.WORLD.HEIGHT + 100) {
                enemy.body.destroy();
                enemy.sprite.destroy();
            }
        });
    }
}