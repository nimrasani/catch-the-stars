import Phaser from "phaser";
import { STAR, BOMB, BASKET } from "../assets/images";
import collectAudio from "../assets/audio/collect.mp3";
import bombAudio from "../assets/audio/bomb.mp3";
import winAudio from "../assets/audio/win.mp3";
import loseAudio from "../assets/audio/lose.mp3";

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
