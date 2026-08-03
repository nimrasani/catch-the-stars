import Phaser from "phaser";
import { BOMB_SPEED } from "../utils/constants";

export default class Bomb extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x) {
    super(scene, x, -50, "bomb");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.allowGravity = false;

    this.setVelocityY(BOMB_SPEED);

    this.setScale(0.12);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.rotation += 0.04;

    if (this.y > this.scene.scale.height + 60) {
      this.destroy();
    }
  }
}