function MatterPage() {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;


  // var engine;
  // var boxes = [];
  // var balls = [];
  // var boundaries = [];
  // var world;
  // var deadZoneX = 180;
  // var deadZoneY = 180;
  //
  // var frictionSlider, restitutionSlider;
  // var frictionCheckbox, restitutionCheckbox, radiusCheckbox;
  // var debugOptions;


  this.setup = function() {
    engine = Engine.create();
    world = engine.world;
    textFont(helventicaFont);
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
    widthSlider = createSlider(5, 50, 15, 1);
    widthSlider.position(20, 170);
    heightSlider = createSlider(5, 50, 15, 1);
    heightSlider.position(20, 200);
    scaleSlider = createSlider(1, 10, 1, 1);
    scaleSlider.position(20, 230);

    boxButton = createButton('box');
    boxButton.position(90-boxButton.size().width/2, 320);
    ballButton = createButton('ball');
    ballButton.position(90-ballButton.size().width/2, 500);
    wallButton = createButton('wall');
    wallButton.position(90-wallButton.size().width/2, 680);
  }

  this.close = function() {
    frictionSlider.remove();
    restitution.remove();
    frictionCheckbox.remove();
    restitutionCheckbox.remove();
    radiusCheckbox.remove();
  }

  this.draw = function() {
    push();
    translate(-width/2, -height/2);
      background(151);
      fill(121);
      rectMode(CORNER);
      noStroke();
      rect(0, 0, deadZoneX, deadZoneY);
      rectMode(CENTER);
      fill(150, 150, 255, 100);
      rect(boxButton.position().x + boxButton.size().width/2, boxButton.position().y + boxButton.size().height/2, widthSlider.value()*3, heightSlider.value()*3);
      ellipse(ballButton.position().x + ballButton.size().width/2, ballButton.position().y + ballButton.size().height/2, widthSlider.value()*3, widthSlider.value()*3);
      push();
      fill(150);
      translate(wallButton.position().x+wallButton.size().width/2, wallButton.position().y+wallButton.size().height/2);
      rotate(-0.5);
      rect(0, 0, 150, 20);
      pop();

      boxButton.mousePressed(() => {mode = 1;});
      ballButton.mousePressed(() => {mode = 2;});
      wallButton.mousePressed(() => {mode = 3;});

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


      if (mode == 3 && mouseDown) {
        stroke(0);
        strokeWeight(8);
        line(mouseXStart, mouseYStart, mouseX, mouseY);
      }

      var modeText;

      switch (mode) {
        case 1:
          modeText = "boxes";
          break;
        case 2:
          modeText = "balls";
          break;
        case 3:
          modeText = "walls";
          break;
        case 4:
          modeText = "spam";
          break;
        default:
          modeText = "none";
          break;
      }
      textAlign(CENTER, CENTER);
      textSize(50);
      fill(0);
      stroke(255);
      strokeWeight(2);
      text(modeText, width / 2, 100);
      textSize(25);
      text("fps: " + int(frameRate()), width/2, 150);
      pop();
  }

  this.mousePressed = function() {
      if(mouseX < deadZoneX && mouseY < deadZoneY) {
        mouseXStart = -1;
        mouseYStart = -1;
        return;
      }
      mouseDown = true;
      if (mode == '1') {
        boxes.push(new Box(sliderOptions, mouseX, mouseY, widthSlider.value() * scaleSlider.value(), heightSlider.value() * scaleSlider.value(), random(0, 255)));
      }
      if (mode == '2') {
        balls.push(new Ball(sliderOptions, mouseX, mouseY, widthSlider.value()/2 * scaleSlider.value(), random(0, 255)));
      }
      if (mode == '3') {
        mouseXStart = mouseX;
        mouseYStart = mouseY;
      }
  }

  this.mouseReleased = function() {
    mouseDown = false;
    if(mouseX < deadZoneX && mouseY < deadZoneY) {
      // key = 'none';
      return;
    }
    if (mode == '3' && mouseXStart > 0 && mouseYStart > 0) {
      let x = mouseX;
      let y = mouseY;

      let length = dist(x, y, mouseXStart, mouseYStart);

      let angle = atan2(y - mouseYStart, x - mouseXStart);

      boundaries.push(new Boundary((x + mouseXStart) / 2, (y + mouseYStart) / 2, length, 20, angle));

    }
  }

  this.mouseDragged = function() {
    if(mouseX < deadZoneX && mouseY < deadZoneY) {
      // key = 'none';
      return;
    }

    if (mode == '4') {
      if (frameCount % 2 == 0) {
        boxes.push(new Box(sliderOptions, mouseX, mouseY, random(5, 30), random(5, 30), random(0, 255)));
        balls.push(new Ball(sliderOptions, mouseX, mouseY, random(2.5, 15), random(0, 255)));
      }
    }
  }

  this.keyPressed = function() {
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
}
