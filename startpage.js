function StartPage() {
  this.setup = function() {
    // canvas.remove();
    // canvas = createCanvas(window.innerWidth - 4, window.innerHeight - 4, WEBGL);
    rover = createRoverCam();
    rover.usePointerLock();
    // requestPointerLock();
  }

  this.draw = function() {
  // orbitControl();
    background(51);
    box(100);
    // pg = createGraphics(width, height, WEBGL);
    // pg.background(217);
    // pg.rover = createRoverCam();
    // pg.lights();
    // // pg.noStroke();
    // // pg.texture(_text);
    // pg.rotateY(map(mouseX, 0, width, -PI, PI));
    // pg.rotateX(map(-mouseY, 0, height, -PI, PI));
    // // plane(window.innerWidth - 4, window.innerHeight - 4);
    // pg.box(200);
    // image(pg, 0, 0);
    // pg.remove();
    // pg = null;
  }
}

// let _text;

// function setup() {

//   createCanvas(window.innerWidth - 4, window.innerHeight - 4, WEBGL);

//   _text = createGraphics(window.innerWidth - 4, window.innerHeight - 4);
//   _text.background(255);
//   _text.textFont('Helvetica');
//   _text.textAlign(CENTER, CENTER);
//   _text.textSize(133);
//   _text.fill(3, 7, 11);
//   _text.noStroke();
//   _text.text('test', width * 0.5, height * 0.5);
// }

// function draw() {
// }
