class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    this.load.image('logo', '../assets/StartScene/startLogo.png');
    this.load.image('botaoJogar', '../assets/StartScene/BotaoJogar.svg');
    this.load.image('botaoControles', '../assets/StartScene/BotaoControles.svg');
    this.load.image('bg', '../assets/StartScene/startBackground.png');
  }

  create() {
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "bg")
    .setScale(0.75);

    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 200, "logo")
    .setScale(2.25);

    const botaoJogar = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "botaoJogar")
    .setScale(0.75)
    .setInteractive()
    .on("pointerover", () => {
      botaoJogar.setScale(0.8);
    })
    .on("pointerout", () => {
      botaoJogar.setScale(0.75);
    })
    .on("pointerdown", () => {
      this.scene.stop("StartScene");
      this.scene.start("SelectScene");
    });

    const botaoControles = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 150, "botaoControles")
    .setScale(0.75)
    .setInteractive()
    .on("pointerover", () => {
      botaoControles.setScale(0.8);
    })
    .on("pointerout", () => {
      botaoControles.setScale(0.75);
    })
    .on("pointerdown", () => {
      this.scene.stop("StartScene");
      this.scene.start("InstructionScene");
    });
  }
}  