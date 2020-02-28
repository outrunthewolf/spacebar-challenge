const parent = document.getElementById('container');

const OPTS = {
  parent:         parent,
  fill:           'none',
  radius:         100,
  strokeWidth:    { 50 : 0 },
  scale:          { 0: 1 },
  angle:          { 'rand(-35, -70)': 0 },
  duration:       500,
  left: 0,        top: 0,
  easing:         'cubic.out',
  className:      'no-pointer',
};

const circle1 = new mojs.Shape({
  ...OPTS,
  stroke:         'cyan',
});

const circle2 = new mojs.Shape({
  ...OPTS,
  radius:         { 0 : 50 },
  strokeWidth:    { 30: 0 },
  stroke:         'cyan',
  delay:          'rand(75, 150)'
});

const circle3OPTS = {
  parent: parent,
  fill: 'red',
  radius: 30,
  isShowStart: false,
  left: 0,
  top: 0,
  duration:       10000,
  fill:         'red',
  opacity:       {1: 0, easing:'linear.none'},
  isShowEnd:        true
};
var circle3 =  new mojs.Shape(circle3OPTS);


const circleOPTs = {
  fill: 'red',
  radius: 30,
  isShowStart: false,
  left: 0,
  top: 0,
  duration:       10000,
  fill:         'red',
  opacity:       {1: 0, easing:'linear.none'},
  isShowEnd:        true
};
var circles =  new mojs.Shape(circleOPTs);

parent.addEventListener( 'mousedown', function (e) {


  // Create a circle
  circle3.tune({ x: e.offsetX, y: e.offsetY  }).replay()
  circles.tune({ x: e.offsetX, y: e.offsetY  }).replay()

  circle1
   .tune({ x: e.offsetX, y: e.offsetY  })
   .replay();

 circle2
   .tune({ x: e.offsetX, y: e.offsetY  })
   .replay();

});
