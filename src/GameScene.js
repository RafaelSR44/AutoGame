class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) {
    this.jogadorAtirador = data.jogadorAtirador;
    this.jogadorLutador = data.jogadorLutador;
  }

  preload() {
    this.load.spritesheet('jogadorAtirador', './assets/GameScene/AtaqueDistancia.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('jogadorLutador', './assets/GameScene/AtaqueCorpo.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('jogadorLutadorEfeito', './assets/GameScene/AtaqueCorpoEfeito.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('jogadorParado', './assets/GameScene/SoldadoParado.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('jogadorAndando', './assets/GameScene/SoldadoAndando.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('jogadorDano', './assets/GameScene/SoldadoDano.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('jogadorMorte', './assets/GameScene/SoldadoMorte.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('orcParado', './assets/GameScene/OrcParado.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('orcAndando', './assets/GameScene/OrcAndando.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('orcDano', './assets/GameScene/OrcDano.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('orcMorte', './assets/GameScene/OrcMorte.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('orcAtaque', './assets/GameScene/OrcAtaque.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('orcAtaqueEfeito', './assets/GameScene/OrcAtaqueEfeito.png', { frameWidth: 100, frameHeight: 100 });
    this.load.image('bg0', './assets/GameScene/BG_01/Layers/Sky.png');
    this.load.image('bg1', './assets/GameScene/BG_01/Layers/BG.png');
    this.load.image('bg2', './assets/GameScene/BG_01/Layers/Middle.png');
    this.load.image('bg3', './assets/GameScene/BG_01/Layers/Foreground.png');
    this.load.image('bg4', './assets/GameScene/BG_01/Layers/Ground_01.png');
    this.load.image('bg5', './assets/GameScene/BG_01/Layers/Ground_02.png');
    this.load.image('flecha', './assets/GameScene/Flecha.png');
    this.load.image('chao', './assets/GameScene/Chao.png');
    this.load.image('parede', './assets/GameScene/Parede.png');
    this.load.image('vida', './assets/GameScene/basic/heart.png');
    this.load.image('fundoVida', './assets/GameScene/basic/background.png');
  }

  create() {

    this.larguraJogo = 1450;
    this.alturaJogo = 900;
    this.teclado = this.input.keyboard.createCursorKeys();
    this.atirando = false;
    this.atacando = false;
    this.dano = false;
    this.morte = false;
    this.atacandoOrc = false;
    this.danoOrc = false;
    this.morteOrc = false;
    this.vidaJogador;
    this.vidas = [];
    this.fundoVidas = [];
    this.inimigoVida = 4;
    this.pontos = 0;
    this.placar = this.add.text(50, 100, 'Pontos: ' + this.pontos, { fontSize: '45px', fill: '#0000000' }).setScrollFactor(0);
    this.direcaoEmpurrao = 0;
    this.forcaEmpurrao = 200;
    this.jogadorInv = false;

    if (this.jogadorAtirador) {
      this.vidaJogador = 2;
    } else {
      this.vidaJogador = 4;
    }

    this.bg0 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 1450, 900, 'bg0').setScrollFactor(0).setDepth(-10);
    this.bg1 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 1450, 900, 'bg1').setScrollFactor(0).setDepth(-10);
    this.bg2 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 1450, 900, 'bg2').setScrollFactor(0).setDepth(-10);
    this.bg3 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 1450, 900, 'bg3').setScrollFactor(0).setDepth(-10);
    this.bg4 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 1450, 900, 'bg4').setScrollFactor(0).setDepth(-10);
    this.bg5 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 1450, 900, 'bg5').setScrollFactor(0).setDepth(-10);

    for (let i = 1, j = 50, k = 50; i <= this.vidaJogador; i++, j += 50) {
      this.fundoVida = this.add.image(j, k, "fundoVida").setScrollFactor(0).setScale(2.5);
      this.vida = this.add.image(j, k, "vida").setScrollFactor(0).setScale(2.5);
      this.vidas.push(this.vida)
      this.fundoVidas.push(this.fundoVida)
    }

    // Definindo a flecha
    this.flecha = this.physics.add.image(0, 0, 'flecha').setScale(2);
    this.flecha.setVisible(false);
    this.flecha.body.setAllowGravity(false);
    this.flecha.body.setSize(20, 10);

    // Definindo ataque corpo a corpo
    this.ataque = this.physics.add.sprite(0, 0, 'jogadorLutadorEfeito').setScale(2);
    this.ataque.setVisible(false);
    this.ataque.body.setAllowGravity(false);
    this.ataque.body.setSize(40, 20);

    // Definindo jogador
    this.jogador = this.physics.add.sprite(100, 850, 'jogadorParado').setScale(3).setDepth(1);
    this.jogador.body.setSize(20, 20);
    this.jogador.setDrag(100, 100);

    // Definindo Inimigo
    this.inimigo = this.physics.add.sprite(400, 850, 'orcParado').setScale(3).setDepth(1);
    this.inimigo.body.setSize(20, 20);
    this.inimigo.setDrag(100, 100);

    // criando o chão
    this.chao = this.physics.add.staticImage(0, 900, 'chao').setScale(3).refreshBody().setVisible(false);
    this.physics.add.collider(this.jogador, this.chao); // Colisão entre o jogador e o chão
    this.physics.add.collider(this.inimigo, this.chao); // Colisão entre o inimigo e o chão

    // criando o chão
    this.parede = this.physics.add.staticImage(0, 0, 'parede').setScale(3).refreshBody().setVisible(false);
    this.physics.add.collider(this.jogador, this.parede); // Colisão entre o jogador e a parede
    this.physics.add.collider(this.inimigo, this.parede); // Colisão entre o inimigo e a parede

    this.physics.add.overlap(this.flecha, this.inimigo, () => {
      this.direcaoEmpurrao = new Phaser.Math.Vector2(this.inimigo.x - this.flecha.x, this.inimigo.y - this.flecha.y).normalize();
      if (this.inimigoVida > 0) {
        this.inimigo.anims.play('orcDanoA', true);
        this.desativarFlechada();
        this.inimigoVida--;
        this.inimigo.setVelocity(this.direcaoEmpurrao.x * this.forcaEmpurrao, this.direcaoEmpurrao.y * this.forcaEmpurrao);

      } else {
        this.inimigoVida = 4;
        this.inimigo.anims.play('orcMorteA', true);
        this.time.delayedCall(1000, () => {
          this.inimigo.setVisible(false); //esconde o inimigo
          this.inimigo.setVelocity(0, 0);
          this.inimigo.setPosition(this.inimigo.x + 800, 850); //posiciona o inimigo em uma posição aleatória
          this.inimigo.setVisible(true); //mostra o inimigo
        });
        this.desativarFlechada();//desativa o tiro
        this.pontos += 10;
        this.placar.setText('Pontos: ' + this.pontos);
      }
    });

    //Colisão do ataque corpo a corpo com o inimigo
    this.physics.add.overlap(this.ataque, this.inimigo, () => {
      this.direcaoEmpurrao = new Phaser.Math.Vector2(this.inimigo.x - this.ataque.x, this.inimigo.y - this.ataque.y).normalize();
      if (this.inimigoVida > 0) {
        this.inimigo.anims.play('orcDanoA', true);
        this.desativarAtacar();
        this.inimigoVida -= 0.5;
        this.inimigo.setVelocity(this.direcaoEmpurrao.x * this.forcaEmpurrao, this.direcaoEmpurrao.y * this.forcaEmpurrao);

      } else {
        this.inimigoVida = 4;
        this.inimigo.anims.play('orcMorteA', true);
        this.time.delayedCall(1000, () => {
          this.inimigo.setVisible(false); //esconde o inimigo
          this.inimigo.setVelocity(0, 0);
          this.inimigo.setPosition(this.inimigo.x + 400, 850); //posiciona o inimigo em uma posição aleatória
          this.inimigo.setVisible(true); //mostra o inimigo
        });
        this.desativarAtacar();//desativa o tiro
        this.pontos += 10;
        this.placar.setText('Pontos: ' + this.pontos);
      }
    });

    this.physics.add.overlap(this.inimigo, this.jogador, () => {
      if (this.vidaJogador > 0 && !this.jogadorInv) {

        this.deletaVida = this.vidas.pop();
        this.deletaVida.setVisible(false);
        this.vidaJogador--;
        this.jogador.setAlpha(0.5);
        
        this.jogadorInv = true;
        this.time.delayedCall(2000, ()=>{
          this.jogadorInv = false;
          this.jogador.setAlpha(1);
        })
      } else if(this.vidaJogador <= 0) {
        this.scene.stop("GameScene");
        this.scene.start("EndScene");
      }
    });

    // criando camera para seguir o player
    this.cameras.main.startFollow(this.jogador);
    this.cameras.main.setBounds(0, 0, 10000, 600);

    //ANIMAÇÕES
    //ANIMAÇÕES DO JOGADOR
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
      key: 'jogadorAtiradorA',
      frames: this.anims.generateFrameNumbers('jogadorAtirador', { start: 0, end: 8 }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: 'jogadorLutadorA',
      frames: this.anims.generateFrameNumbers('jogadorLutador', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: 'jogadorLutadorEfeitoA',
      frames: this.anims.generateFrameNumbers('jogadorLutadorEfeito', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: 0
    });

    //ANIMAÇÕES DO ORC
    this.anims.create({
      key: 'orcParadoA',
      frames: this.anims.generateFrameNumbers('orcParado', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'orcAndandoA',
      frames: this.anims.generateFrameNumbers('orcAndando', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'orcDanoA',
      frames: this.anims.generateFrameNumbers('orcDano', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: 'orcMorteA',
      frames: this.anims.generateFrameNumbers('orcMorte', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: 0
    });

  }

  update() {
    this.bg1.tilePositionX = this.cameras.main.scrollX * 0.3;
    this.bg2.tilePositionX = this.cameras.main.scrollX * 0.5;
    this.bg3.tilePositionX = this.cameras.main.scrollX * 0.7;
    this.bg4.tilePositionX = this.cameras.main.scrollX * 0.9;
    this.bg5.tilePositionX = this.cameras.main.scrollX;
    this.score = this.cameras.main.scrollX;

    //função de movimentação
    if (this.teclado.left.isDown) {
      this.jogador.setVelocityX(-200);
      this.jogador.flipX = true;
    }
    else if (this.teclado.right.isDown) {
      this.jogador.setVelocityX(200);
      this.jogador.flipX = false;
    }
    else if (!this.atirando) {
      this.jogador.setVelocityX(0);
      this.jogador.anims.play('jogadorParadoA', true);
    }

    if ((this.jogador.body.velocity.x >= 200 || this.jogador.body.velocity.x <= -200) && (!this.atirando && !this.atacando)) {
      this.jogador.anims.play('jogadorAndandoA', true);
    }

    //função de pulo atirador
    if (this.teclado.up.isDown && this.jogador.body.onFloor() && this.jogadorAtirador) {
      this.jogador.setVelocityY(-450);
    }

    //função de pulo lutador
    if (this.teclado.up.isDown && this.jogador.body.onFloor() && this.jogadorLutador) {
      this.jogador.setVelocityY(-250);
    }

    // ATAQUE CORPO A CORPO
    //ataque corpo a corpo esquerda
    if (this.teclado.space.isDown && !this.ataque.visible && this.teclado.left.isDown && this.jogadorLutador) {
      this.atacando = true;
      this.jogador.anims.play('jogadorLutadorA', true);
      this.time.delayedCall(400, () => {
        this.ataque.setPosition(this.jogador.x - 40, this.jogador.y);
        this.atacar();
        this.ataque.flipX = true;
        this.atacando = false;
        this.time.delayedCall(200, () => {
          this.ataque.setVisible(false);
          this.ataque.setPosition(0, 0);
        });
      });
    }

    //ataque corpo a corpo direita
    if (this.teclado.space.isDown && !this.ataque.visible && this.teclado.right.isDown && this.jogadorLutador) {
      this.atacando = true;
      this.jogador.anims.play('jogadorLutadorA', true);
      this.time.delayedCall(400, () => {
        this.ataque.setPosition(this.jogador.x + 40, this.jogador.y);
        this.atacar();
        this.ataque.flipX = false;
        this.atacando = false;
        this.time.delayedCall(200, () => {
          this.ataque.setVisible(false);
          this.ataque.setPosition(0, 0);
        });
      });
    }

    //ATAQUE A DISTANCIA
    // ataque flecha esquerda 
    if (this.teclado.space.isDown && !this.flecha.visible && this.teclado.left.isDown && this.jogadorAtirador) {
      this.atirando = true;
      this.jogador.anims.play('jogadorAtiradorA', true);
      this.time.delayedCall(400, () => {
        this.flecha.setPosition(this.jogador.x, this.jogador.y);
        this.flechada();
        this.flecha.flipX = true;
        this.flecha.setVelocityX(-450);
        this.atirando = false;
      });
    }

    //ataque flecha direita
    if (this.teclado.space.isDown && !this.flecha.visible && this.teclado.right.isDown && this.jogadorAtirador) {
      this.atirando = true;
      this.jogador.anims.play('jogadorAtiradorA', true);
      this.time.delayedCall(400, () => {
        this.flecha.setPosition(this.jogador.x, this.jogador.y);
        this.flechada();
        this.flecha.flipX = false;
        this.flecha.setVelocityX(450);
        this.atirando = false;
      });
    }

    if (this.flecha.x < this.jogador.x - 400 || this.flecha.x > this.jogador.x + 400 || this.flecha.y < this.jogador.y - 200) {
      this.desativarFlechada();
    }

    //movimento do Orc
    if (this.jogador.x < this.inimigo.x + 400 && this.jogador.x > this.inimigo.x - 400) {
      if (this.inimigo.x < this.jogador.x) {
        this.inimigo.setVelocityX(50);
        this.inimigo.flipX = false;
      } else {
        this.inimigo.setVelocityX(-50);
        this.inimigo.flipX = true;
      }
    } else {
      this.inimigo.setVelocityX(0);
      this.inimigo.anims.play("orcParadoA", true)
    }

    if (this.inimigo.body.velocity.x >= 50 || this.inimigo.body.velocity.x <= -50) {
      this.inimigo.anims.play('orcAndandoA', true);
    }

  }

  flechada() {
    this.flecha.setVisible(true);
  }

  desativarFlechada() {
    this.flecha.setVisible(false);
    this.flecha.setVelocityX(0);
    this.flecha.setVelocityY(0);
    this.flecha.setPosition(0, 0);
  }

  atacar() {
    this.ataque.setVisible(true);
  }

  desativarAtacar() {
    this.ataque.setVisible(false);
    this.ataque.setPosition(0, 0);
  }

}




