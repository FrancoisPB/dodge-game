export default class Enemy {
    constructor(scene, x, y){
        this.scene = scene;
        this.sprite = scene.add.rectangle(x, y, 40, 40, 0xff0000);
        this.speed = 200;
    }

    update(delta){
        this.sprite.y += delta * this.speed;
    }
}