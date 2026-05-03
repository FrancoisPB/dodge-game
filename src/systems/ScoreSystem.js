export default class ScoreSystem {
    constructor(scene) {
        this.scene = scene;
        this.score = 0;
        this.scoreText = this.scene.add.text(10, 10, "Score: 0");
    }

    update(delta) {
        this.score += delta;
        this.scoreText.setText("Score: " + this.getScore());
    }

    getScore() {
        return Math.floor(this.score / 1000);
    }
}