import Phaser from "phaser";
import Background from "../objects/Background";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    new Background(this);

    const { width, height } = this.scale;

    // Dark overlay
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.55);

    // Title
    this.add
      .text(width / 2, 120, "⭐ Catch The Stars ⭐", {
        fontSize: "46px",
        fontStyle: "bold",
        color: "#FFD54F",
        stroke: "#000000",
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    // Instructions 
    this.add
      .rectangle(width / 2, 380, 520, 320, 0x102542, 0.8)
      .setStrokeStyle(4, 0xffffff);

    this.add
      .text(width / 2, 270, "HOW TO PLAY", {
        fontSize: "28px",
        color: "#FFD54F",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.add
      .text(
        width / 2,
        400,
        "⭐ Catch 20 Stars\n\n💣 Avoid Bombs\n\n❤️ You have 3 Lives\n\n⏱ Finish before time runs out",
        {
          fontSize: "24px",
          align: "center",
          color: "#FFFFFF",
        },
      )
      .setOrigin(0.5);

    // Start Button
    const button = this.add
      .rectangle(width / 2, 620, 260, 70, 0xffb300)
      .setStrokeStyle(3, 0xffffff)
      .setInteractive({ useHandCursor: true });

    this.add
      .text(width / 2, 620, "▶ START GAME", {
        fontSize: "28px",
        color: "#000000",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    button.on("pointerover", () => {
      button.setScale(1.05);
    });

    button.on("pointerout", () => {
      button.setScale(1);
    });

    button.on("pointerdown", () => {
      this.scene.start("GameScene");
    });
  }
}
