
const config = {
  type: Phaser.AUTO,
  width: 1450,
  height: 900,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      enableBody: true,
      debug: true
    }
  },
  scene: [StartScene, InstructionScene, SelectScene, GameScene, EndScene]
};

const game = new Phaser.Game(config);
