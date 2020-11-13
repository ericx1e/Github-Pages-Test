

var page = "Start";
var matterPage;
var startPage;
var canvas;
var helventicaFont;
var curPage;

//Start Vars
var rover;

//Matter Vars

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
var deadZoneX = 180;
var deadZoneY = 720;

var mode;

var frictionSlider, restitutionSlider;
var frictionCheckbox, restitutionCheckbox, radiusCheckbox;
var debugOptions;
var widthSlider, heightSlider, scaleSlider;
var boxButton, ballButton;


var sliderOptions;

var mouseXStart = 0;

var mouseYStart = 0;

var mouseDown;



function setup() {
  helventicaFont = loadFont('assets/Helvetica 400.ttf');
  canvas = createCanvas(window.innerWidth - 4, window.innerHeight - 4, WEBGL);
  startPage = new StartPage();
  startPage.setup();
  matterPage = new MatterPage();
  // matterPage.setup();
}

function draw() {
  if (page == "Start") {
    startPage.draw();
  }
  if (page == "Matter") {
    matterPage.draw();
  }
}

function mousePressed() {
  if(page == "Matter") {
    matterPage.mousePressed();
  }
}

function mouseReleased() {
  if(page == "Matter") {
    matterPage.mouseReleased();
  }
}

function mouseDragged() {
  if(page == "Matter") {
    matterPage.mouseDragged();
  }
}

function keyPressed() {
  if(page == "Matter") {
    matterPage.keyPressed();
  }
  if(key == '0') {
    startPage.close();
    page = "Matter";
    matterPage.setup();
  }
}
