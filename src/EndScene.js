class EndScene extends Phaser.Scene {
  constructor() {
    super('EndScene');
  }

  preload() {
    this.load.image('bg', './assets/InstructionScene/Background.png');
    this.load.image('perdeu', './assets/InstructionScene/perdeu.png');
    this.load.image('voltar', './assets/InstructionScene/BotaoVoltar.svg');
  }

  create() {
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg').setScale(0.75);


    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'perdeu').setScale(0.75);

    this.botaoVoltar = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 300, 'voltar')
      .setScale(0.75)
      .setInteractive()
      .on('pointerover', () => {
        this.botaoVoltar.setScale(0.8);
      })
      .on('pointerout', () => {
        this.botaoVoltar.setScale(0.75);
      })
      .on('pointerdown', () => {
        this.scene.start('StartScene');
      });


  }
}