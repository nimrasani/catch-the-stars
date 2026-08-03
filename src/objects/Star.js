import Phaser from "phaser";
import { STAR_SPEED } from "../utils/constants";

export default class Star extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x) {
    super(scene, x, -40, "star");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.allowGravity = false;

    this.setVelocityY(STAR_SPEED);

    this.setDisplaySize(40, 40);

    this.rotationSpeed = Phaser.Math.FloatBetween(0.02, 0.05);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.rotation += this.rotationSpeed;

    if (this.y > this.scene.scale.height + 50) {
      this.destroy();
    }
  }
}