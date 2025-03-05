class SelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SelectScene' });
  }

  preload() {
    this.load.image('bg', '../assets/SelectScene/selectBackground.png');
    this.load.image('botaoAtira', '../assets/SelectScene/AtiradorBotao.svg');
    this.load.image('botaoLuta', '../assets/SelectScene/LutadorBotao.svg');
    this.load.spritesheet('jogadorAtirador', '../assets/SelectScene/AtaqueDistancia.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('jogadorLutador', '../assets/SelectScene/AtaqueCorpo.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('jogadorParado', '../assets/SelectScene/SoldadoParado.png', { frameWidth: 100, frameHeight: 100 });
  }

  create() {
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "bg")
    .setScale(0.75);

    this.anims.create({
      key: 'parado',
      frames: this.anims.generateFrameNumbers('jogadorParado', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'atirador',
      frames: this.anims.generateFrameNumbers('jogadorAtirador', { start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'lutador',
      frames: this.anims.generateFrameNumbers('jogadorLutador', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.add.image(this.cameras.main.centerX - 200, this.cameras.main.centerY, "botaoAtira")
    .setScale(1)
    .setInteractive()
    .on("pointerover", () => {
      this.jogadorAtirador.setScale(3);
      this.jogadorAtirador.anims.play('atirador', true);
    })
    .on("pointerout", () => {
      this.jogadorAtirador.setScale(3);
      this.jogadorAtirador.anims.play('parado', true);
    })
    .on("pointerdown", () => {
      this.jogadorAtirador.setScale(1);
      this.scene.start("GameScene",{ jogadorAtirador: true, jogadorLutador: false});
    });

    this.add.image(this.cameras.main.centerX + 200, this.cameras.main.centerY, "botaoLuta")
    .setScale(1)
    .setInteractive()
    .on("pointerover", () => {
      this.jogadorLutador.setScale(3);
      this.jogadorLutador.anims.play('lutador', true);
    })
    .on("pointerout", () => {
      this.jogadorLutador.setScale(3);
      this.jogadorLutador.anims.play('parado', true);
    })
    .on("pointerdown", () => {
      this.scene.start("GameScene", { jogadorAtirador: false, jogadorLutador: true });
    });

    this.jogadorAtirador = this.add.sprite(this.cameras.main.centerX - 200, this.cameras.main.centerY, "jogadorAtirador")
    .setScale(3);

    this.jogadorLutador = this.add.sprite(this.cameras.main.centerX + 200, this.cameras.main.centerY, "jogadorLutador")
    .setScale(3);

  }
}
