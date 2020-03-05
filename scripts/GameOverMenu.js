
// ES6 Class adding a method to the Person prototype
class GameOverMenu {
  constructor(app, score) {
    this.stage = app.stage;
    this.app = app;
    this.score = score;
    this.menuHolder = new PIXI.Container();
  }

  render() {
    this.stage.addChild(this.menuHolder);

    // Background
    let menu = new PIXI.Graphics();
    menu.lineStyle(4, 0xFF3300, 1);
    menu.beginFill(0x66CCFF);
    menu.drawRect(0, 0, this.app.view.width, this.app.view.height);
    menu.endFill();
    menu.x = 0;
    menu.y = 0;
    this.menuHolder.addChild(menu);

    // Title
    var gameOverText = new PIXI.Text("GAME OVER", new PIXI.TextStyle({
      fontFamily: "Futura",
      fontSize: 64,
      fill: "white"
    }));
    gameOverText.x = (menu.width / 2) - (gameOverText.width / 2)
    gameOverText.y = (menu.height / 2) - 80
    menu.addChild(gameOverText);

    var scoreText = new PIXI.Text("You Scored: " + this.score, new PIXI.TextStyle({
      fontFamily: "Futura",
      fontSize: 34,
      fill: "white"
    }));
    scoreText.x = (menu.width / 2) - (scoreText.width / 2)
    scoreText.y = (gameOverText.height / 2) + 100
    menu.addChild(scoreText);

    // Play Button
    let playButton = new PIXI.Graphics();
    playButton.lineStyle(4, 0xFF9600, 1);
    playButton.beginFill(0xFF9600);
    playButton.drawRect(0, 0, 300, 100);
    playButton.endFill();
    playButton.x = (menu.width / 2) - (playButton.width / 2)
    playButton.y = (gameOverText.y + gameOverText.height) + 50
    playButton.interactive = true;
    playButton.buttonMode = true;
    playButton.alpha = 0.8;
    playButton.mouseover = function(e) {
      playButton.alpha = 1
    }
    playButton.mouseout = function(e) {
      playButton.alpha = 0.8;
    }
    menu.addChild(playButton);

    var buttonText = new PIXI.Text("New Game", new PIXI.TextStyle({
      fontFamily: "Futura",
      fontSize: 50,
      fill: "white"
    }));
    buttonText.x = (playButton.width / 2) - (buttonText.width / 2);
    buttonText.y = (playButton.height / 2) - (buttonText.height / 2) - 5;
    playButton.addChild(buttonText);

    var that = this;
    playButton.click = function(e) {
      document.body.dispatchEvent(new CustomEvent("playGame", {
        bubbles: true,
        detail: {
          menu: that
        }
      }));
    }
  }

  destroy() {
    this.menuHolder.destroy(true);
  }
}
