function Box(options, x, y, w, h, hue) {
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  this.hue = hue;
  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    colorMode(HSB, 255);
    noStroke();
    fill(hue, 255, 255, 100);
    rect(0, 0, this.w, this.h);
    colorMode(RGB, 255);
    pop();
    var debugText = '';
    if(debugOptions.friction) {
      debugText += 'friction: ' + options.friction + '\n';
    }
    if(debugOptions.restitution) {
      debugText += 'restitution: ' + options.restitution + '\n';
    }
    fill(0);
    noStroke();
    textSize(15);
    text(debugText, pos.x, pos.y - h/2 - 20);
  }

  this.isOffScreen = function() {
    var pos = this.body.position;
    return pos.y > height+100;
  }

  this.removeFromWorld = function() {
    World.remove(world, this.body);
  }
}
