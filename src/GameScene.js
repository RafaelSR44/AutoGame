class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) {
    this.jogadorAtirador = data.jogadorAtirador;
    this.jogadorLutador = data.jogadorLutador;
  }

  create() {
    this.add.text(100, 100, 'Game Scene', { fill: '#0f0' });
  }
}

