let _text;

function setup() {
  createCanvas(window.innerWidth - 4, window.innerHeight - 4, WEBGL);

  _text = createGraphics(window.innerWidth - 4, window.innerHeight - 4);
  _text.background(255);
  _text.textFont('Helvetica');
  _text.textAlign(CENTER, CENTER);
  _text.textSize(133);
  _text.fill(3, 7, 11);
  _text.noStroke();
  _text.text('test', width * 0.5, height * 0.5);
}

function draw() {
  background(217);
  lights();
  noStroke();
  texture(_text);
  rotateY(map(mouseX, 0, width, -PI, PI));
  rotateX(map(-mouseY, 0, height, -PI, PI));
  // plane(window.innerWidth - 4, window.innerHeight - 4);
  box(200);
}