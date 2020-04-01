

let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas";
}

//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources;

// Get the saize of container and set this as the canvas
const container = document.getElementById('container');
const containerWidth = container.offsetWidth;
const containerHeight = container.offsetHeight;

//Create a Pixi Application
let app = new Application({
    width: containerWidth,
    height: containerHeight,
    antialiasing: true,
    transparent: true,
    resolution: 1
  }
);

// Create the view
container.appendChild(app.view);

// Load the things
let game = new Game(app, loader);
let menu = new Menu(app, loader);
let gameOverMenu = new GameOverMenu(app, loader);
loader.load(setup);

// Start everything
function setup() {

  menu.render();
  let settings = new Settings(app.stage, this, 25, 25).render();

  // Listen for start game
  document.body.addEventListener("playGame", function(e) {
    e.detail.menu.destroy();

    // Reset in case we're doing a new game
    game.reset();
    game.render();
    app.stage.sortChildren()
  });

  // Listen for game over
  document.body.addEventListener("gameOver", function(e) {
    e.detail.game.destroy();
    gameOverMenu.render(e.detail.score)
    app.stage.sortChildren()
  });

  state = play;
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){
  state(delta);
}

function play(delta) {

}
