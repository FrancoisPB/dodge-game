export default class Enemy {
    constructor(scene, x, y){
        this.scene = scene;
        this.sprite = this.scene.add.spine(
            x,
            y,
            "spineboy-json",
            "spineboy-atlas"
        );
        this.sprite.setScale(0.08);
        this.speed = 150;

        this.sprite.animationState.setAnimation(0, "walk", true);
    }

    update(delta){
        this.sprite.y += delta * this.speed;
    }
}