
const config = {
  type: Phaser.AUTO,
  width: 450,
  height: 500,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      enableBody: true,
    }
  },
  scene: [StartScene, GameScene, EndScene]
};

const game = new Phaser.Game(config);
