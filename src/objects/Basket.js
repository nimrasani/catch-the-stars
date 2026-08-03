import Phaser from "phaser";
import { PLAYER_SPEED, PLAYER_Y_OFFSET } from "../utils/constants";

export default class Basket extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, scene.scale.width / 2, scene.scale.height - 70, "basket");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.allowGravity = false;
    this.setCollideWorldBounds(true);
    this.setDisplaySize(150, 95);
  }

  update(cursors) {
    this.setVelocityX(0);

    if (cursors.left.isDown) {
      this.setVelocityX(-PLAYER_SPEED);
    }

    if (cursors.right.isDown) {
      this.setVelocityX(PLAYER_SPEED);
    }
  }
}
