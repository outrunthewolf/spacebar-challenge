<<<<<<< HEAD
=======

>>>>>>> 1f453a2d90d8ba94c56f8473666fd8767679f1a7
// ES6 Class adding a method to the Person prototype
class Settings {
  constructor(stage, loader, x, y) {
    this.stage = stage;
    this.app = app;
    this.loader = loader;
<<<<<<< HEAD
    this.resources = PIXI.loader.resources;
=======
    this.resources = PIXI.loader.resources
>>>>>>> 1f453a2d90d8ba94c56f8473666fd8767679f1a7

    // Controls
    this.soundLevel = 1;
    this.x = x;
    this.y = y;
  }

  render(score) {
    this.score = score;
    this.menuHolder = new PIXI.Container();
    this.menuHolder.zIndex = 9;
    this.stage.addChild(this.menuHolder);

    // Background
    let soundToggle = new PIXI.Graphics();
    soundToggle.lineStyle(4, 0xFF9600, 1);
    soundToggle.beginFill(0xFF9600);
    soundToggle.drawRect(0, 0, 50, 50);
    soundToggle.endFill();
    soundToggle.x = this.x;
    soundToggle.y = this.y;
    soundToggle.interactive = true;
    soundToggle.buttonMode = true;
    soundToggle.alpha = 0.8;
<<<<<<< HEAD
    soundToggle.mouseover = function (e) {
      soundToggle.alpha = 1;
    };
    soundToggle.mouseout = function (e) {
      soundToggle.alpha = 0.8;
    };
=======
    soundToggle.mouseover = function(e) {
      soundToggle.alpha = 1
    }
    soundToggle.mouseout = function(e) {
      soundToggle.alpha = 0.8;
    }
>>>>>>> 1f453a2d90d8ba94c56f8473666fd8767679f1a7
    this.menuHolder.addChild(soundToggle);

    var soundText = new PIXI.Text("🔈", new PIXI.TextStyle({
      fontFamily: "Futura",
      fontSize: 30,
      fill: "white"
    }));
<<<<<<< HEAD
    soundText.x = (soundToggle.width / 2) - (soundText.width / 2);
    soundText.y = (soundToggle.height / 2) - (soundText.height / 2);
    soundToggle.addChild(soundText);

    var originalTitlePos = soundToggle.y;
    var that = this;

    soundToggle.click = function (e) {
      soundToggle.alpha = 0.8;

      gsap.to(soundToggle, {
        keyframes: [{
            y: (originalTitlePos - 10),
            duration: 0.3
          },
          {
            y: originalTitlePos,
            duration: 0.3
          }
        ],
        ease: "elastic"
      });

      if (that.soundLevel == 1) {
        that.soundLevel = 0;
        PIXI.sound.volumeAll = 0;
        soundText.text = "🔇";
      } else {
        that.soundLevel = 1;
        PIXI.sound.volumeAll = 1;
        soundText.text = "🔈";
      }
    };
=======
    soundText.x = (soundToggle.width / 2) - (soundText.width / 2)
    soundText.y = (soundToggle.height / 2) - (soundText.height / 2)
    soundToggle.addChild(soundText);

    var originalTitlePos = soundToggle.y
    var that = this;

    soundToggle.click = function(e) {
      soundToggle.alpha = 0.8;

      gsap.to(soundToggle, {keyframes: [
        {y: (originalTitlePos - 10), duration: 0.3},
        {y: originalTitlePos, duration: 0.3}
      ], ease: "elastic"});

      if(that.soundLevel == 1) {
        that.soundLevel = 0;
        PIXI.sound.volumeAll = 0;
        soundText.text = "🔇"
      }else{
        that.soundLevel = 1;
        PIXI.sound.volumeAll = 1;
        soundText.text = "🔈"
      }
    }
>>>>>>> 1f453a2d90d8ba94c56f8473666fd8767679f1a7
  }

  destroy() {
    this.menuHolder.destroy();
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 1f453a2d90d8ba94c56f8473666fd8767679f1a7
