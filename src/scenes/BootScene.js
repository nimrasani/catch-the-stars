import Phaser from "phaser";
import { STAR, BOMB, BASKET } from "../assets/images";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.image("basket", BASKET);
    this.load.image("star", STAR);
    this.load.image("bomb", BOMB);
  }

  create() {
    this.scene.start("MenuScene");
  }
}
