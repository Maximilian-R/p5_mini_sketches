var particles = [];
var totalParticles = 200;
var gravity;
var wind;
function mousePressed() {
  wind = createVector(random(-2, 2), random(-0.4, 0.4));
}

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);

  // Give the canvas a gradient background. Drawing a gradient background each frame takes to much performance.
  var can = document.getElementById("defaultCanvas0");
  can.style.background = "-webkit-radial-gradient(#1b2735 0%,#090a0f 100%)";
  can.style.background = "-o-radial-gradient(#1b2735,#090a0f 100%)";
  can.style.background = "-moz-radial-gradient(#1b2735,#090a0f)";
  can.style.background = "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%";

  // Spawn particles
  for (var i = 0; i <= totalParticles; i++) {
    var x = random(0, width);
    var y = random(0, height);
    var p = new particle(x, y);
    particles.push(p);
  }

  gravity = createVector(0.0, 0.4);
  wind = createVector(0, 0);

}

function draw() {
  clear();

  var yVel = map(height * 0.7, 0, height, -1, 1);
  gravity.y = yVel;
  var xVel = map(width * 0.5, 0, width, -1, 1);
  gravity.x = xVel;


  particles.forEach(function(p) {
    p.update();
  });

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function particle(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.fo = createVector(random(-0.04, 0.04), 0);

  this.size = random(1, 6);

  this.update = function() {

    var nos = random(-0.04, 0.04);
    this.fo.add(nos);
    this.fo.limit(2);
    
    // Calcualte position/movement
    this.vel = p5.Vector.mult(gravity, this.size);
    this.vel.add(this.fo);
    this.vel.add(wind);
    this.pos.add(this.vel);

    this.bounding();
    this.render();
  }

  this.render = function() {
    stroke(255);
    strokeWeight(this.size);
    point(this.pos.x, this.pos.y);
  }

  this.bounding = function() {

    var margin = 10;

    // Check x
    if (this.pos.x >= width + margin) {
      this.pos.x = 0 - margin;
    } else if (this.pos.x <= 0 - margin) {
      this.pos.x = width + margin;
    }

    // Check y
    if (this.pos.y >= height + margin) {
      this.pos.y = 0 - margin;
      this.pos.x = random(0, width);
    } else if (this.pos.y <= 0 - margin) {
      this.pos.y = height + margin;
      this.pos.x = random(0, width);
    }
  }
}
