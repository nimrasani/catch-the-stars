import Phaser from "phaser";

export default class Background {
  constructor(scene) {
    this.scene = scene;
    this.clouds = [];

    this.createSky();
    this.createMoon();
    this.createBackgroundStars();
    this.createClouds();
    this.createHills();
  }

  createSky() {
    const { width, height } = this.scene.scale;

    const graphics = this.scene.add.graphics();

    // Deep blue -> purple gradient
    graphics.fillGradientStyle(0x0b1f4d, 0x0b1f4d, 0x3b2c85, 0x5b3fa8, 1);

    graphics.fillRect(0, 0, width, height);
  }

  createMoon() {
    const { width } = this.scene.scale;

    const moonX = width - 110;
    const moonY = 120;

    const graphics = this.scene.add.graphics();

    // Glow
    graphics.fillStyle(0xffffff, 0.08);
    graphics.fillCircle(moonX, moonY, 120);

    graphics.fillStyle(0xffffff, 0.15);
    graphics.fillCircle(moonX, moonY, 90);

    // Moon
    graphics.fillStyle(0xfff7d6);
    graphics.fillCircle(moonX, moonY, 50);

    // Craters
    graphics.fillStyle(0xf0e6c0);

    graphics.fillCircle(moonX - 12, moonY - 10, 6);
    graphics.fillCircle(moonX + 15, moonY + 5, 8);
    graphics.fillCircle(moonX - 8, moonY + 18, 5);
  }

  createBackgroundStars() {
    const { width, height } = this.scene.scale;

    this.bgStars = [];

    for (let i = 0; i < 40; i++) {
      const star = this.scene.add.circle(
        Phaser.Math.Between(20, width - 20),
        Phaser.Math.Between(20, height * 0.6),
        Phaser.Math.Between(1, 3),
        0xffffff,
        Phaser.Math.FloatBetween(0.5, 1),
      );

      this.bgStars.push(star);

      this.scene.tweens.add({
        targets: star,
        alpha: 0.2,
        duration: Phaser.Math.Between(1200, 2500),
        yoyo: true,
        repeat: -1,
      });
    }
  }

  createClouds() {
    const { width } = this.scene.scale;

    this.clouds.push(this.createCloud(width * 0.15, 180, 1.4));
    this.clouds.push(this.createCloud(width * 0.75, 320, 0.7));
    this.clouds.push(this.createCloud(width * 0.4, 500, 1.1));
    this.clouds.push(this.createCloud(width * 0.9, 700, 0.9));
  }

  createCloud(x, y, scale = 1) {
    const cloud = this.scene.add.graphics();

    cloud.fillStyle(0xd6d8ff, 0.85);

    cloud.fillCircle(0, 0, 22);
    cloud.fillCircle(25, -12, 28);
    cloud.fillCircle(55, 0, 24);
    cloud.fillCircle(25, 15, 26);

    cloud.setScale(scale);

    cloud.x = x;
    cloud.y = y;

    return cloud;
  }

  createHills() {
    const { width, height } = this.scene.scale;

    const graphics = this.scene.add.graphics();

    // Back hills
    graphics.fillStyle(0x394b7a);

    graphics.fillCircle(width * 0.15, height, 220);
    graphics.fillCircle(width * 0.45, height, 280);
    graphics.fillCircle(width * 0.75, height, 220);
    graphics.fillCircle(width * 1.05, height, 180);

    graphics.fillRect(0, height - 200, width, 300);

    // Middle hills
    graphics.fillStyle(0x2e5a5b);

    graphics.fillCircle(width * 0.1, height + 40, 180);
    graphics.fillCircle(width * 0.4, height + 30, 240);
    graphics.fillCircle(width * 0.75, height + 50, 190);
    graphics.fillCircle(width, height + 20, 150);

    graphics.fillRect(0, height - 140, width, 300);

    // Front hill
    graphics.fillStyle(0x2f7d50);

    graphics.fillCircle(width * 0.2, height + 60, 140);
    graphics.fillCircle(width * 0.5, height + 40, 180);
    graphics.fillCircle(width * 0.8, height + 70, 140);

    graphics.fillRect(0, height - 90, width, 300);
  }

  update() {
    this.clouds.forEach((cloud) => {
      cloud.x += 0.15;

      if (cloud.x > this.scene.scale.width + 120) {
        cloud.x = -120;
      }
    });
  }
}
