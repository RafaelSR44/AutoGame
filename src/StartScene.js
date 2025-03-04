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
    this.add.text(150, 200, 'Press SPACE to start', { fontSize: '20px', fill: '#fff' });

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('GameScene');
    });
  }
}  