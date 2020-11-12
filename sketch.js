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
//   background(217);
//   lights();
//   noStroke();
//   texture(_text);
//   rotateY(map(mouseX, 0, width, -PI, PI));
//   rotateX(map(-mouseY, 0, height, -PI, PI));
//   // plane(window.innerWidth - 4, window.innerHeight - 4);
//   box(200);
// }
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body;

var engine;
var boxes = [];
var balls = [];
var boundaries = [];
var world;
var page = "Matter";
var deadZoneX = 180;
var deadZoneY = 180;

var frictionSlider, restitutionSlider;
var frictionCheckbox, restitutionCheckbox, radiusCheckbox;
var debugOptions;

function setup() {
  createCanvas(window.innerWidth - 4, window.innerHeight - 4);
  matterPageStart();
}

function matterPageStart() {
  engine = Engine.create();
  world = engine.world;
  // Engine.run(engine);
  var option = {
    isStatic: true
  }
  // boundaries.push(new Boundary(200, 200, 600, 20, 0.3));
  // boundaries.push(new Boundary(600, 400, 600, 20, -0.3));
  boundaries.push(new Boundary(width / 2, height - 10, width, 20, 0));
  frictionSlider = createSlider(0, 1, 0.5, 0.05);
  frictionSlider.position(20, 20);
  restitutionSlider = createSlider(0, 1, 0.5, 0.05);
  restitutionSlider.position(20, 50);
  frictionCheckbox = createCheckbox(' show friction', false);
  frictionCheckbox.position(20, 80);
  restitutionCheckbox = createCheckbox(' show restitution', false);
  restitutionCheckbox.position(20, 110);
  radiusCheckbox = createCheckbox(' show radius', false);
  radiusCheckbox.position(20, 140);
}

function draw() {
  if (page == "Start") {
    startPageUpdate();
  }
  if (page == "Matter") {
    matterPageUpdate();
  }
}

function startPageUpdate() {
  background(255);
}

var sliderOptions;

function matterPageUpdate() {
  background(151);
  fill(121);
  rectMode(CORNER);
  noStroke();
  rect(0, 0, deadZoneX, deadZoneY);
  Engine.update(engine);
  debugOptions = {friction: frictionCheckbox.checked(), restitution: restitutionCheckbox.checked(), radius: radiusCheckbox.checked()};
  sliderOptions = {friction: frictionSlider.value(), restitution: restitutionSlider.value()};
  boxes.forEach((item, i) => {
    item.show(debugOptions);

    var body = box.body;

    if (item.isOffScreen()) {
      boxes.splice(i, 1);
      item.removeFromWorld();
    }
  });

  balls.forEach((item, i) => {
    item.show(debugOptions);
    if (item.isOffScreen()) {
      balls.splice(i, 1);
      item.removeFromWorld();
    }
  });


  boundaries.forEach((item, i) => {
    item.show();
  });
  // if(frameCount%4==0) {
  //   if(frameCount%8 == 0)
  //     // boxes.push(new Box(mouseX, mouseY, random(5,30), random(5,30), random(0, 255)));
  //     boxes.push(new Box(mouseX, mouseY, 20, 20, random(0, 255)));
  //     // else
  //     // balls.push(new Ball(mouseX, mouseY, random(2.5, 15), random(0, 255)));
  //   }


  if (key == 3 && mouseDown) {
    stroke(0);
    strokeWeight(8);
    line(mouseXStart, mouseYStart, mouseX, mouseY);
  }

  let mode;
  switch (key) {
    case '1':
      mode = "boxes";
      break;
    case '2':
      mode = "balls";
      break;
    case '3':
      mode = "walls";
      break;
    case 'w':
      mode = "water";
      break;
    case ' ':
      mode = "spam";
      break;
    default:
      mode = "none";
      break;
  }
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(0);
  stroke(255);
  strokeWeight(2);
  text(mode, width / 2, 100);
  textSize(25);
  text("fps: " + int(frameRate()), width/2, 150);
}

var mouseXStart = 0;

var mouseYStart = 0;

var mouseDown;

function mousePressed() {
  if(mouseX < deadZoneX && mouseY < deadZoneY) {
    mouseXStart = -1;
    mouseYStart = -1;
    return;
  }
  mouseDown = true;
  if (key == '1') {
    boxes.push(new Box(sliderOptions, mouseX, mouseY, random(5, 30), random(5, 30), random(0, 255)));
  }
  if (key == '2') {
    balls.push(new Ball(sliderOptions, mouseX, mouseY, random(2.5, 15), random(0, 255)));
  }
  if (key == '3') {
    mouseXStart = mouseX;
    mouseYStart = mouseY;
  }
}

function mouseReleased() {
  mouseDown = false;
  if(mouseX < deadZoneX && mouseY < deadZoneY) {
    // key = 'none';
    return;
  }
  if (key == '3' && mouseXStart > 0 && mouseYStart > 0) {
    let x = mouseX;
    let y = mouseY;

    let length = dist(x, y, mouseXStart, mouseYStart);

    let angle = atan2(y - mouseYStart, x - mouseXStart);

    boundaries.push(new Boundary((x + mouseXStart) / 2, (y + mouseYStart) / 2, length, 20, angle));

  }
}

function mouseDragged() {
  if(mouseX < deadZoneX && mouseY < deadZoneY) {
    // key = 'none';
    return;
  }
  if (key == 'w') {
    balls.push(new Ball(mouseX, mouseY, 2, 150));
  }

  if (key == ' ') {
    if (frameCount % 2 == 0) {
      boxes.push(new Box(sliderOptions, mouseX, mouseY, random(5, 30), random(5, 30), random(0, 255)));
      balls.push(new Ball(sliderOptions, mouseX, mouseY, random(2.5, 15), random(0, 255)));
    }
  }
}

function keyPressed() {
  if (key == 'r') {
    boxes.forEach((item, i) => {
      item.removeFromWorld();
    });

    boxes = [];

    balls.forEach((item, i) => {
      item.removeFromWorld();
    });
    balls = [];

    for (var i = 1; i < boundaries.length; i) {

      boundaries[i].removeFromWorld();
      boundaries.splice(i, 1);
    }
  }
}
