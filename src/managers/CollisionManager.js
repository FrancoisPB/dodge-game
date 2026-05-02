export default class CollisionManager {
    constructor(scene, player, enemyManager, cb_goToGameOverScene) {
        this.scene = scene;
        this.player = player;
        this.enemyManager = enemyManager;
        this.scene.physics.add.overlap(
            this.player.body,
            this.enemyManager.enemyGroup,
            this.handleCollision.bind(this)
        );
        this.cb_goToGameOverScene = cb_goToGameOverScene;
    }

    handleCollision(playerBody, enemyBody) {
        this.scene.particles.emitParticleAt(enemyBody.x, enemyBody.y);

        // Camera shake
        this.scene.cameras.main.shake(200, 0.01);

        // Audio
        this.scene.sound.play("hit");

        this.scene.player.setState("death");

        enemyBody.destroy();

        this.cb_goToGameOverScene();
    }
}