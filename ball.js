function Ball(x, y, r, hue) {
  var options = {
    friction: 0.3,
    restitution: 0.5,
  }
  this.body = Bodies.circle(x, y, r, options);
  this.r = r;
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
    ellipse(0, 0, 2*r, 2*r);
    line(0, 0, cos(this.body.angle)*r, sin(this.body.angle)*r);
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
