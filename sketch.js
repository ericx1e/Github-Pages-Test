

var page = "Start";
var matterPage;
var startPage;
var canvas;

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
var deadZoneY = 180;

var frictionSlider, restitutionSlider;
var frictionCheckbox, restitutionCheckbox, radiusCheckbox;
var debugOptions;


var sliderOptions;

var mouseXStart = 0;

var mouseYStart = 0;

var mouseDown;



function setup() {
  canvas = createCanvas(window.innerWidth - 4, window.innerHeight - 4, WEBGL);
  startPage = new StartPage();
  startPage.setup();
  matterPage = new MatterPage();
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
    page = "Matter";
    matterPage.setup();
  }
}
