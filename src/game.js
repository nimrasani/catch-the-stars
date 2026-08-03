import Phaser from "phaser";

import BootScene from "./scenes/BootScene";
import MenuScene from "./scenes/MenuScene";
import GameScene from "./scenes/GameScene";
import GameOverScene from "./scenes/GameOverScene";

const config = {
  type: Phaser.AUTO,

  width: 720,
  height: 1280,

  parent: "game-container",

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },

  scene: [BootScene, MenuScene, GameScene, GameOverScene],
};

new Phaser.Game(config);
