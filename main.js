// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];

var ground;


function setup() {
  pixelDensity(1)
  createCanvas(550, 550)
  engine = Engine.create();
  world = engine.world;

  var options = {
    isStatic: true
  };
  ground = Bodies.rectangle(200, height, width, 100, options);
  World.add(world, ground);

  all_particles = new AllParticles(1)
  amoebas = new Group()
  num_amoebas = 10
  for (let i = 0; i < num_amoebas; i++) {
    amoebas.addParticle(new Amoeba(width/(i+1), height/(i+1), 10, all_particles))
  }
}


function draw() {
  background(0)
  update()
  display()
  Engine.update(engine);
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }
  noStroke(255);
  fill(170);
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width, 100);
}

function update() {
  all_particles.repel()
  amoebas.update()
}

function display() {
  amoebas.display()
}

function mouseDragged() {
  boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)));
}

// function mouseDragged() {
//   for (let i = 0; i < all_particles.tot_particles(); i++) {
//     mousepos = createVector(mouseX, mouseY)
//     let force = p5.Vector.sub(all_particles.particles[i].position, createVector(mouseX, mouseY))
//     force.normalize()
//     force.mult(10)
//     all_particles.particles[i].applyForce(force)
//   }
// }
