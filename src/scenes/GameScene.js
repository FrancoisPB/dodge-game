import Player from "../objects/Player";
import Enemy from "../objects/Enemy";
import EnemyManager from "../managers/EnemyManager";
import CollisionManager from "../managers/CollisionManager";
import ScoreSystem from "../systems/ScoreSystem";
import { GAME_CONFIG } from "../config/GameConfig";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.spineJson("spineboy-json", import.meta.env.BASE_URL + "assets/spine/spineboy.json");
        this.load.spineAtlas("spineboy-atlas", import.meta.env.BASE_URL +  "assets/spine/spineboy.atlas");
        this.load.audio("hit", import.meta.env.BASE_URL +  "assets/hit.mp3");
        this.load.audio("run", import.meta.env.BASE_URL +  "assets/run.mp3");
    }

    create() {
        this.physics.world.setBounds(0, 0, GAME_CONFIG.WORLD.WIDTH, GAME_CONFIG.WORLD.HEIGHT);

        this.player = new Player(this, GAME_CONFIG.WORLD.WIDTH / 2, GAME_CONFIG.WORLD.HEIGHT);

        this.scoreSystem = new ScoreSystem(this);

        const cb_goToGameOverScene = () => {
            this.time.addEvent({
                delay: 1300,
                loop: false,
                callback: () => {
                    this.scene.start("GameOverScene", { score: this.scoreSystem.getScore() });
                }
            });
        };

        this.particles = this.add.particles(0, 0, null, {
            speed: { min: GAME_CONFIG.PARTICLES.MIN_SPEED, max: GAME_CONFIG.PARTICLES.MAX_SPEED },
            scale: { start: GAME_CONFIG.PARTICLES.START_SCALE, end: GAME_CONFIG.PARTICLES.END_SCALE },
            lifespan: GAME_CONFIG.PARTICLES.LIFESPAN,
            quantity: GAME_CONFIG.PARTICLES.QUANTITY,
            emitting: false
        });

        this.enemyManager = new EnemyManager(this);
        this.enemyManager.spawnEnemy();

        this.collisionManager = new CollisionManager(this, this.player, this.enemyManager, cb_goToGameOverScene);

    }

    update(time, delta) {
        let moving = false;
        const dt = delta / 1000;

        this.player.update(dt);
        this.enemyManager.update(dt);
        this.scoreSystem.update(delta);
    }
}