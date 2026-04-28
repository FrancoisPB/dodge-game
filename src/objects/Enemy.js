export default class Enemy {
    constructor(scene, x, y){
        this.scene = scene;
        if(!this.scene.physics){
            console.error("Physics not enables in scene!");
            return;
        }

        this.sprite = this.scene.add.spine(
            x,
            y,
            "spineboy-json",
            "spineboy-atlas"
        );
        this.sprite.setScale(0.08);
        this.speed = 150;

        
        // Hitbox
        this.body = scene.physics.add.image(x, y, null);
        this.body.setSize(40, 80);
        this.body.setCollideWorldBounds(true);
        this.body.setVisible(false);

        this.sprite.animationState.setAnimation(0, "walk", true);

    }

    update(delta){
        this.sprite.y += delta * this.speed;

        
        // Sync Spine with hitbox
        this.body.x = this.sprite.x;
        this.body.y = this.sprite.y;
    }
}