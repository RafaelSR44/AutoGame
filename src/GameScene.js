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
    this.load.spritesheet('jogadorLutadorEfeito', '../assets/GameScene/AtaqueCorpoEfeito.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('jogadorParado', '../assets/GameScene/SoldadoParado.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('jogadorAndando', '../assets/GameScene/SoldadoAndando.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('jogadorDano', '../assets/GameScene/SoldadoDano.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('jogadorMorte', '../assets/GameScene/SoldadoMorte.png', { frameWidth: 100, frameHeight: 100 });
    this.load.image('bg0', '../assets/GameScene/BG_01/Layers/Sky.png');
    this.load.image('bg1', '../assets/GameScene/BG_01/Layers/BG.png');
    this.load.image('bg2', '../assets/GameScene/BG_01/Layers/Middle.png');
    this.load.image('bg3', '../assets/GameScene/BG_01/Layers/Foreground.png');
    this.load.image('bg4', '../assets/GameScene/BG_01/Layers/Ground_01.png');
    this.load.image('bg5', '../assets/GameScene/BG_01/Layers/Ground_02.png');
    this.load.image('flecha', '../assets/GameScene/Flecha.png');
    this.load.image('chao', '../assets/GameScene/Chao.png');
  }

  create() {

    this.larguraJogo = 1450;
    this.alturaJogo = 900;
    
    this.bg0 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 1450, 900, 'bg0').setScrollFactor(0).setDepth(-10);
    this.bg1 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 1450, 900, 'bg1').setScrollFactor(0).setDepth(-10);
    this.bg2 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 1450, 900, 'bg2').setScrollFactor(0).setDepth(-10);
    this.bg3 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 1450, 900, 'bg3').setScrollFactor(0).setDepth(-10);
    this.bg4 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 1450, 900, 'bg4').setScrollFactor(0).setDepth(-10);
    this.bg5 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 1450, 900, 'bg5').setScrollFactor(0).setDepth(-10);
    
    // Definindo a flecha
    this.flecha = this.physics.add.image(0, 0, 'flecha').setScale(2);
    this.flecha.setVisible(false);
    this.flecha.body.setAllowGravity(false);
    this.flecha.body.setSize(20,10);
    
    // Definindo jogador
    this.jogador = this.physics.add.sprite(100, 850, 'jogadorParado').setScale(3).setDepth(1);
    this.jogador.body.setSize(20, 20);
    
    // Adicione colisão entre o jogador e o chão
    this.chao = this.physics.add.staticImage(0,900,'chao').setScale(3).refreshBody().setVisible(false);
    this.physics.add.collider(this.jogador, this.chao);
    
    this.cameras.main.startFollow(this.jogador);
    this.cameras.main.setBounds(0, 0, 3000, 600);

    this.teclado = this.input.keyboard.createCursorKeys();
    this.pontuacao = 0;

    this.anims.create({
      key: 'jogadorParadoA',
      frames: this.anims.generateFrameNumbers('jogadorParado', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    
    this.anims.create({
      key: 'jogadorAndandoA',
      frames: this.anims.generateFrameNumbers('jogadorAndando', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });
    
    this.anims.create({
      key: 'jogadorMorteA',
      frames: this.anims.generateFrameNumbers('jogadorMorte', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    
    this.anims.create({
      key: 'jogadorDanoA',
      frames: this.anims.generateFrameNumbers('jogadorDano', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'jogadorAtiradorA',
      frames: this.anims.generateFrameNumbers('jogadorAtirador', { start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'jogadorLutadorA',
      frames: this.anims.generateFrameNumbers('jogadorLutador', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'jogadorLutadorEfeitoA',
      frames: this.anims.generateFrameNumbers('jogadorLutadorEfeito', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

  }

  update(){
    this.bg1.tilePositionX = this.cameras.main.scrollX * 0.3;
    this.bg2.tilePositionX = this.cameras.main.scrollX * 0.5;
    this.bg3.tilePositionX = this.cameras.main.scrollX * 0.7;
    this.bg4.tilePositionX = this.cameras.main.scrollX * 0.9;
    this.bg5.tilePositionX = this.cameras.main.scrollX;
    this.score = this.cameras.main.scrollX;

    

    //função de movimentação
    if(this.teclado.left.isDown){
      this.jogador.setVelocityX(-200);
      this.jogador.flipX = true;
      this.jogador.anims.play('jogadorAndandoA', true);
    }
    else if(this.teclado.right.isDown){
      this.jogador.setVelocityX(200);
      this.jogador.flipX = false;
      this.jogador.anims.play('jogadorAndandoA', true);
    }
    else{
      this.jogador.setVelocityX(0);
      this.jogador.anims.play('jogadorParadoA', true);
    }
    //função de pulo atirador
    if(this.teclado.up.isDown && this.jogador.body.onFloor() && this.jogadorAtirador){
      this.jogador.setVelocityY(-450);
    }

    //função de pulo lutador
    if(this.teclado.up.isDown && this.jogador.body.onFloor() && this.jogadorLutador){
      this.jogador.setVelocityY(-250);
    }

    //jogador Atirador
    if(this.jogadorAtirador && this.teclado.space.isDown ){
      this.jogador.anims.play('jogadorAtiradorA', true);
    }

    //jogador Lutador 
    if(this.jogadorLutador && this.teclado.space.isDown ){
      this.jogador.anims.play('jogadorLutadorA', true);
    }

    if (teclado.space.isDown && !this.flecha.visible && teclado.left.isDown && this.jogadorAtirador) {
      this.flecha.setPosition(this.jogador.x, this.jogador.y);
      flechada();
      this.flecha.flipX = true;
      this.flecha.setVelocityX(-450);
    } else if (teclado.space.isDown && !this.flecha.visible && teclado.right.isDown && this.jogadorAtirador) {
      this.flecha.setPosition(this.jogador.x, this.jogador.y);
      flechada();
      this.flecha.flipX = true;
      this.flecha.setVelocityX(450);
    } else if (teclado.space.isDown && !this.flecha.visible && this.jogadorAtirador) {
      this.flecha.setPosition(this.jogador.x, this.jogador.y);
      flechada();
      this.flecha.setVelocityY(-450);
    }
    
    if(this.flecha.x < this.jogador.x - 200 || this.flecha.y > this.jogador.x + 200 || this.flecha.y < this.jogador.y - 200 ){
      this.desativarFlechada;
    }

  }

  flechada(){
    this.flecha.setVisible(true);
  }

  desativarFlechada(){
    this.flecha.setVisible(false);
    this.flecha.setVelocityX(0);
    this.flecha.setVelocityY(0);
    this.flecha.setPosition(0,0);
  }

  desativarAtaque(){

  }

}




