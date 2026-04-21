export default class Player{
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.add.rectangle(x, y, 50, 50, 0x00ff00);

        this.speed = 300;
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    update(delta) {
        if (this.cursors.left.isDown) {
            this.sprite.x -= this.speed * delta;
        }
        
        if (this.cursors.right.isDown) {
            this.sprite.x += this.speed * delta;
        }
    }
}