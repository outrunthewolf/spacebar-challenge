
// ES6 Class adding a method to the Person prototype
class Game {
  constructor (app, loader) {
    this.stage = app.stage
    this.app = app
    this.gameHolder = {}
    this.space = this._keyboardHandler(32)
    this.backgroundMusic = null;
    this.successNoise = null;

    // load resources
    this.resources = PIXI.loader.resources
    this.loader = loader
    this.loader.add([{ name: 'hand', crossOrigin: '', url: 'images/hand.png' }])
    this.loader.add([{ name: 'keyboard', crossOrigin: '', url: 'images/keyboard.png' }])
    this.loader.add([{ name: 'title', crossOrigin: '', url: 'images/title.png' }])
    this.loader.add([{ name: 'light1', crossOrigin: '', url: 'images/light_rotate_1.png' }])
    this.loader.add('loop3', 'resources/loops/loop3.mp3');
    this.loader.add('success', 'resources/success.mp3');

    // variables
    this.score = 0
    this.timerActive = true
    this.timerSeconds = 5

    // Display the result in the element with id="demo"
    if (this.timerSeconds < 10) {
      this.text = '00:0' + this.timerSeconds
    } else {
      this.text = '00:' + this.timerSeconds
    }
  }

  render () {
    this._loadSound();

    this.gameHolder = new PIXI.Container()
    this.stage.addChild(this.gameHolder)

    // Background
    const bg = new PIXI.Graphics()
    bg.lineStyle(4, 0xFF3300, 1)
    bg.beginFill(0xF4625D)
    bg.drawRect(0, 0, this.app.view.width, this.app.view.height)
    bg.endFill()
    bg.name = 'bg'
    bg.x = 0
    bg.y = 0
    this.gameHolder.addChild(bg)

    var hand, keyboard, title

    // Add the keyboard
    keyboard = new PIXI.Sprite(this.resources.keyboard.texture)
    keyboard.y = 0
    keyboard.x = (bg.width / 2) - (keyboard.width / 2)
    keyboard.vx = 0
    keyboard.vy = 0
    bg.addChild(keyboard)

    // Add the keyboard
    title = new PIXI.Sprite(this.resources.title.texture)
    title.y = bg.height - (title.height)
    title.x = bg.width - (title.width)
    title.vx = 0
    title.vy = 0

    // Load score
    const style = new PIXI.TextStyle({
      fontFamily: 'Futura',
      fontSize: 64,
      fill: 'white'
    })
    var message = new PIXI.Text('0', style)
    message.x = (title.width / 2) - (message.width / 2)
    message.y = (title.height / 2) - 80
    title.addChild(message)
    bg.addChild(title)

    // Load countdown timer
    var timer = new PIXI.Text(this.text, style)
    timer.x = 0
    timer.name = 'timer'
    timer.y = bg.height - (timer.height)
    bg.addChild(timer)

    // Add the hand
    var hand = new PIXI.Sprite(this.resources.hand.texture)
    hand.y = keyboard.height - 200
    hand.x = (keyboard.width / 2) - (hand.width / 2) - 50
    hand.vx = 0
    hand.vy = 0
    bg.addChild(hand)

    // Load controls
    this.space.press = () => {
      if (this.timerActive === false) return false

      hand.scale.x -= 0.1
      hand.scale.y -= 0.1

      this.score += 1
      message.text = this.score
      message.x = (title.width / 2) - (message.width / 2)

      // Do something fun on every 10
      var resultOfMod = this.score % 10;
      if (resultOfMod == 0) {
        this.successNoise.play();

        // Animate score box every 10 points
      var originalTitlePos = title.y
        gsap.to(title, {keyframes: [
          {y: (originalTitlePos - 45), duration: 0.3},
          {y: originalTitlePos, duration: 0.3}
        ], ease: "elastic"});

      }
    }

    this.space.release = () => {
      if (this.timerActive === false) return false

      hand.scale.x = 1
      hand.scale.y = 1
    }

    this._startTimer()
  }

  reset () {
    // variables
    this.score = 0
    this.timerActive = true
    this.timerSeconds = 5

    // Events
    this.space.press = null;
    this.space.release = null;

    this._destroySound()
  }

  _startTimer () {
    this.timerActive = true
    var seconds
    var that = this

    // Update the count down every 1 second
    var x = setInterval(function () {
      --that.timerSeconds

      // Display the result in the element with id="demo"
      if (that.timerSeconds < 10) {
        seconds = '00:0' + that.timerSeconds
      } else {
        seconds = '00:' + that.timerSeconds
      }

      // Update the timer
      that.gameHolder.getChildByName('bg').getChildByName('timer').text = seconds

      // If the count down is finished, write some text
      if (that.timerSeconds <= 0) {
        that.timerActive = false
        clearInterval(x)
        document.body.dispatchEvent(new CustomEvent('gameOver', {
          bubbles: true,
          detail: {
            game: that,
            score: that.score
          }
        }))
      }
    }, 1000)
  }

  // The `keyboard` helper function
  _keyboardHandler (keyCode) {
    var key = {}
    key.code = keyCode
    key.isDown = false
    key.isUp = true
    key.press = undefined
    key.release = undefined

    // The `downHandler`
    key.downHandler = event => {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press()
        key.isDown = true
        key.isUp = false
      }
      event.preventDefault()
    }

    // The `upHandler`
    key.upHandler = event => {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release()
        key.isDown = false
        key.isUp = true
      }
      event.preventDefault()
    }

    // Attach event listeners
    window.addEventListener(
      'keydown', key.downHandler.bind(key), false
    )
    window.addEventListener(
      'keyup', key.upHandler.bind(key), false
    )
    return key
  }

  destroy () {
    this.gameHolder.destroy();
    this._destroySound();
  }

  _loadSound() {
    this.backgroundMusic = this.resources.loop3.sound;
    this.successNoise = this.resources.success.sound;

    this.backgroundMusic.play({
      loop: true
    });
  }

  _destroySound() {
    if(this.backgroundMusic) this.backgroundMusic.stop();
    this.backgroundMusic = null;
  }
}
