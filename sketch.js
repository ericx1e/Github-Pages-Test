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

function setup() {
  createCanvas(window.innerWidth - 4, window.innerHeight - 4);
  engine = Engine.create();
  world = engine.world;
  // Engine.run(engine);
  var option = {
    isStatic: true
  }
  boundaries.push(new Boundary(200, 200, 600, 20, 0.3));
  boundaries.push(new Boundary(600, 400, 600, 20, -0.3));
  boundaries.push(new Boundary(400, 790, 800, 20, 0));
}

function draw() {
  background(151);
  Engine.update(engine);
  boxes.forEach((item, i) => {
    item.show();

    var body = box.body;

    if(item.isOffScreen()) {
      boxes.splice(i, 1);
      item.removeFromWorld();
    }
  });

  balls.forEach((item, i) => {
    item.show();
    if(item.isOffScreen()) {
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
}

function mousePressed() {
  if(key == '1') {
    boxes.push(new Box(mouseX, mouseY, random(5, 30), random(5, 30), random(0, 255)));
  }
  if(key == '2') {
    balls.push(new Ball(mouseX, mouseY, random(2.5, 15), random(0, 255)));
  }
}

function mouseDragged() {
  if(key == 'w') {
    balls.push(new Ball(mouseX, mouseY, 2, 150));
  }
}

function keyPressed() {
  if(key == 'r') {
    boxes = [];
    balls = [];
  }
}
