function Ball(options, x, y, r, hue) {
  this.body = Bodies.circle(x, y, r, options);
  this.r = r;
  this.hue = hue;
  World.add(world, this.body);

  this.show = function(debugOptions) {
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
    if(debugOptions.radius) {
      stroke(0);
      strokeWeight(3);
      line(0, 0, cos(this.body.angle)*r, sin(this.body.angle)*r);
      console.log(debugOptions.radius);
    }
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
    text(debugText, pos.x, pos.y - r - 20);
  }

  this.isOffScreen = function() {
    var pos = this.body.position;
    return pos.y > height+100;
  }

  this.removeFromWorld = function() {
    World.remove(world, this.body);
  }
}
