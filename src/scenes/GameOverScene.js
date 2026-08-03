import Phaser from "phaser";
import Background from "../objects/Background";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  init(data) {
    this.won = data.won;
    this.score = data.score;
  }

  create() {
    new Background(this);

    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.55);

    const title = this.won ? "🎉 YOU WIN!" : "💀 GAME OVER";

    const color = this.won ? "#7CFF6B" : "#FF6B6B";

    this.add
      .text(width / 2, 160, title, {
        fontSize: "52px",
        color,
        fontStyle: "bold",
        stroke: "#000",
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    this.add
      .rectangle(width / 2, 360, 380, 250, 0x102542, 0.8)
      .setStrokeStyle(4, 0xffffff);

    this.add
      .text(width / 2, 300, `Final Score`, {
        fontSize: "28px",
        color: "#FFD54F",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 360, `${this.score}`, {
        fontSize: "70px",
        fontStyle: "bold",
        color: "#FFFFFF",
      })
      .setOrigin(0.5);

    const message = this.won ? "Amazing Job!" : "Try Again!";

    this.add
      .text(width / 2, 430, message, {
        fontSize: "24px",
        color: "#FFFFFF",
      })
      .setOrigin(0.5);

    const button = this.add
      .rectangle(width / 2, 620, 280, 70, 0xffb300)
      .setStrokeStyle(3, 0xffffff)
      .setInteractive({ useHandCursor: true });

    this.add
      .text(width / 2, 620, "🔄 PLAY AGAIN", {
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
