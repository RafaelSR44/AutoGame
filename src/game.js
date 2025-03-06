
const config = {
  type: Phaser.AUTO,
  width: 1450,
  height: 900,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      enableBody: true,
    }
  },
  scene: [StartScene, InstructionScene, SelectScene, GameScene]
};

const game = new Phaser.Game(config);
