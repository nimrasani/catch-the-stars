import Phaser from "phaser";
import Background from "../objects/Background";
import Basket from "../objects/Basket";
import Star from "../objects/Star";
import Bomb from "../objects/Bomb";

import {
  STARTING_LIVES,
  GAME_DURATION,
  STAR_SPAWN_DELAY,
  BOMB_SPAWN_DELAY,
  TIMER_INTERVAL,
} from "../utils/constants";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.gameEnded = false;
    this.background = new Background(this);

    this.player = new Basket(this);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.isTouchDevice = this.sys.game.device.input.touch;

    if (this.isTouchDevice) {
      this.input.on("pointermove", this.handleTouchMove, this);
    }

    // Score & lives & game time
    this.score = 0;
    this.lives = STARTING_LIVES;
    this.gameTime = GAME_DURATION;

    this.scoreText = this.add.text(20, 20, `⭐ ${this.score}`, {
      fontSize: "32px",
      fontStyle: "bold",
      color: "#ffffff",
    });

    this.livesText = this.add
      .text(this.scale.width - 20, 20, `❤️ ${this.lives}`, {
        fontSize: "32px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(1, 0);

    this.timerText = this.add
      .text(this.scale.width / 2, 20, `⏱ ${this.gameTime}`, {
        fontSize: "32px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5, 0);

    //Stars array
    this.stars = [];

    // Spawn stars every second
    this.time.addEvent({
      delay: STAR_SPAWN_DELAY,
      loop: true,
      callback: () => {
        const x = Phaser.Math.Between(40, this.scale.width - 40);

        const star = new Star(this, x);
        this.stars.push(star);
      },
    });

    // Bombs
    this.bombs = [];

    this.time.addEvent({
      delay: BOMB_SPAWN_DELAY,
      loop: true,

      callback: () => {
        const x = Phaser.Math.Between(40, this.scale.width - 40);

        const bomb = new Bomb(this, x);
        this.bombs.push(bomb);
      },
    });

    // Timer event for game countdown
    this.timerEvent = this.time.addEvent({
      delay: TIMER_INTERVAL,
      repeat: GAME_DURATION - 1,
      callback: () => {
        this.gameTime--;

        this.timerText.setText(`⏱ ${this.gameTime}`);

        if (this.gameTime <= 0) {
          this.endGame();
        }
      },
    });
  }

  handleTouchMove(pointer) {
    if (!pointer.isDown) return;

    this.player.setVelocityX(0);

    const basketHalfWidth = this.player.displayWidth / 2;

    const targetX = Phaser.Math.Clamp(
      pointer.x,
      basketHalfWidth,
      this.scale.width - basketHalfWidth,
    );

    this.player.x = Phaser.Math.Linear(this.player.x, targetX, 0.35);
  }

  // End game
  endGame() {
    if (this.gameEnded) return;

    this.gameEnded = true;
    const won = this.score >= 20;
    this.timerEvent.remove();
    this.player.setVelocityX(0);

    if (won) {
      this.sound.play("win");
    } else {
      this.sound.play("lose");
    }

    this.time.delayedCall(600, () => {
      this.scene.start("GameOverScene", {
        won,
        score: this.score,
      });
    });
  }

  update() {
    this.background.update();
    if (!this.isTouchDevice) {
      this.player.update(this.cursors);
    }

    this.stars = this.stars.filter((star) => {
      if (!star.active) return false;

      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          this.player.getBounds(),
          star.getBounds(),
        )
      ) {
        this.sound.play("collect");
        star.destroy();
        this.score++;
        this.scoreText.setText(`⭐ ${this.score}`);
        return false;
      }

      return true;
    });

    this.bombs = this.bombs.filter((bomb) => {
      if (!bomb.active) return false;

      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          this.player.getBounds(),
          bomb.getBounds(),
        )
      ) {
        this.sound.play("bomb");
        bomb.destroy();
        this.lives--;
        this.livesText.setText(`❤️ ${this.lives}`);

        if (this.lives <= 0) {
          this.endGame();
        }

        return false;
      }

      return true;
    });
  }
}
