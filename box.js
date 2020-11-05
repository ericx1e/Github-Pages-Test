function Box(x, y, w, h, hue) {
var options = {
  friction: 0.5,
  restitution: 0.5,
}
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
  }

  this.isOffScreen = function() {
    var pos = this.body.position;
    return pos.y > height+100;
  }

  this.removeFromWorld = function() {
    World.remove(world, this.body);
  }
}
