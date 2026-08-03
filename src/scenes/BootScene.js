import Phaser from "phaser";
import { STAR, BOMB, BASKET } from "../assets/images";
import { collectAudio, bombAudio, winAudio, loseAudio } from "../assets/audio";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.image("basket", BASKET);
    this.load.image("star", STAR);
    this.load.image("bomb", BOMB);

    this.load.audio("collect", collectAudio);
    this.load.audio("bomb", bombAudio);
    this.load.audio("win", winAudio);
    this.load.audio("lose", loseAudio);
  }

  create() {
    this.scene.start("MenuScene");
  }
}
