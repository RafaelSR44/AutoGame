class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    this.load.image('logo', '../assets/StartScene/startLogo.png');
    this.load.image('botao', '../assets/StartScene/startBo.png');
    this.load.image('bg', '../assets/StartScene/startBackground.png');
  }

  create() {
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "bg")
    .setScale(0.75);

    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 200, "logo")
    .setScale(2.25);

    const botao = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "botao")
    .setScale(1.75)
    .setInteractive()
    .on("pointerover", () => {
      botao.setScale(1.8);
    })
    .on("pointerout", () => {
      botao.setScale(1.75);
    })
    .on("pointerdown", () => {
      this.scene.stop("StartScene");
      this.scene.start("SelectScene");
    });
  }
}  