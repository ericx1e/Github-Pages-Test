function StartPage() {
  this.setup = function() {
    // canvas.remove();
    // canvas = createCanvas(window.innerWidth - 4, window.innerHeight - 4, WEBGL);
    rover = createRoverCam();
    rover.usePointerLock();
    rover.setState({position: [-400,-0,-200], rotation: [0.4,0.3,0], sensitivity: 0.025, speed: 1.0});
    // requestPointerLock();
  }

  this.draw = function() {
  // orbitControl();
    background(51);
    ambientLight(100);
    lights();
    push();
    normalMaterial();
    box(50);
    translate(100, 0, 0);
    sphere(25);
    translate(100, 0, 0);
    torus(25, 12);
    translate(100, 0, 0);
    ellipsoid(12, 25, 25);
    translate(100, 0, 0);
    cylinder(25, 50);
    translate(100, 0, 0);
    rotateX(PI);
    cone(25, 40);
    pop();
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
