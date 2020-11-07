function Boundary(x, y, w, h, a) {
var options = {
  isStatic: true,
  friction: 0.3,
  restitution: 1,
  angle: a,
}
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    noStroke();
    fill(100);
    rect(0, 0, this.w, this.h);
    pop();
  }

  this.removeFromWorld = function() {
    World.remove(world, this.body);
  }
}
