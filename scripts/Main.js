

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

// Add the canvas that Pixi automatically created for you to the HTML document
container.appendChild(app.view);
loader.load(setup);

function setup() {

  let menu = new Menu(app).render();

  // Dont render the game until we're ready to play
  let game = new Game(app);

  // Listen for start game
  document.body.addEventListener("playGame", function(e) {
    e.detail.menu.destroy();

    // Reset in case we're doing a new game
    game.reset();
    game.render();
  });

  // Listen for game over
  document.body.addEventListener("gameOver", function(e) {
    e.detail.game.destroy();
    var menu = new GameOverMenu(app, e.detail.score).render();
  });

  state = play;
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){
  state(delta);
}

function play(delta) {

}
