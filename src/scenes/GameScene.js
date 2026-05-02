import Player from "../objects/Player";
import Enemy from "../objects/Enemy";
import EnemyManager from "../managers/EnemyManager";
import CollisionManager from "../managers/CollisionManager";
import ScoreSystem from "../systems/ScoreSystem";

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
            speed: { min: -200, max: 200 },
            scale: { start: 0.5, end: 0 },
            lifespan: 500,
            quantity: 20,
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