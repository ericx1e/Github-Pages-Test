function StartPage() {
  this.setup = function() {
    // canvas.remove();
    // canvas = createCanvas(window.innerWidth - 4, window.innerHeight - 4, WEBGL);
    rover = createRoverCam();
    rover.usePointerLock();
    rover.setState({position: [-400,-0,-200], rotation: [0.4,0.3,0], sensitivity: 0.025, speed: 1.0});
    // requestPointerLock();
    textFont(helventicaFont);
    textAlign(CENTER, CENTER);
    textSize(25);
  }

  this.close = function() {
    // rover.usePointerLock();
    rover.reset();
    // rover.usePointerLock();
    rover.setActive(false);
    exitPointerLock();
    document.removeEventListener('click', RoverCam.togglePointerLock, false);
    perspective();
    camera();
  }

  this.draw = function() {
  // orbitControl();
    background(51);
    ambientLight(100);
    lights();
    push();
    noFill();
    stroke(0);
    strokeWeight(5);
    translate(-500, 200, -500);
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        translate(i*100, 0, j*100);
        rotateX(PI/2);
        plane(100, 100);
        rotateX(-PI/2);
        translate(-i*100, 0, -j*100);
      }
    }
    pop();
    push();
    normalMaterial();
    box(50);
    fill(255);
    text('box', 0, -50, 0);
    translate(100, 0, 0);
    normalMaterial();
    sphere(25);
    fill(255);
    text('sphere', 0, -50, 0);
    translate(100, 0, 0);
    normalMaterial();
    torus(25, 12);
    fill(255);
    text('torus', 0, -50, 0);
    translate(100, 0, 0);
    normalMaterial();
    ellipsoid(12, 25, 25);
    fill(255);
    text('ellipsoid', 0, -50, 0);
    translate(100, 0, 0);
    normalMaterial();
    cylinder(25, 50);
    fill(255);
    text('cylinder', 0, -50, 0);
    translate(100, 0, 0);
    normalMaterial();
    push();
    rotateX(PI);
    cone(25, 40);
    pop();
    fill(255);
    text('cone', 0, -50, 0);
    pop();

    if(dist(200, 0, 0, rover.position.x, rover.position.y, rover.position.z) < 10) {
      startPage.close();
      matterPage.setup();
      page = "Matter";
    }
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
