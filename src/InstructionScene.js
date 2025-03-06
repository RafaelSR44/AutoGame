class InstructionScene extends Phaser.Scene {
  constructor() {
    super('InstructionScene');
  }

  preload() {
    this.load.image('bg', '../assets/InstructionScene/Background.png');
    this.load.image('controles', '../assets/InstructionScene/controles.svg');
    this.load.image('voltar', '../assets/InstructionScene/BotaoVoltar.svg');
  }

  create() {
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg').setScale(0.75);

    this.add.text(this.cameras.main.centerX - 200, this.cameras.main.centerY - 300 , 'Instruções', {
      fontSize: '32px',
      fill: '#000000FF',
    });

    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'controles').setScale(0.75);

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