class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) {
    this.jogadorAtirador = data.jogadorAtirador;
    this.jogadorLutador = data.jogadorLutador;
  }

  preload() {

    this.load.spritesheet('jogadorAtirador', '../assets/GameScene/AtaqueDistancia.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('jogadorLutador', '../assets/GameScene/AtaqueCorpo.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('jogadorParado', '../assets/GameScene/SoldadoParado.png', { frameWidth: 100, frameHeight: 100 });
    this.load.image('bg0', '../assets/GameScene/BG_01/Layers/Sky.png');
    this.load.image('bg1', '../assets/GameScene/BG_01/Layers/BG.png');
    this.load.image('bg2', '../assets/GameScene/BG_01/Layers/Middle.png');
    this.load.image('bg3', '../assets/GameScene/BG_01/Layers/Foreground.png');
    this.load.image('bg4', '../assets/GameScene/BG_01/Layers/Ground_01.png');
    this.load.image('bg5', '../assets/GameScene/BG_01/Layers/Ground_02.png');
  }

  create() {
    this.add.text(100, 100, 'Game Scene', { fill: '#ffffff' });
  }
}

