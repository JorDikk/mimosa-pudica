function setup() {
  pixelDensity(1)
  createCanvas(550, 550)

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
}

function update() {
  all_particles.repel()
  amoebas.update()
}

function display() {
  amoebas.display()
}

function mousePressed() {
  for (let i = 0; i < all_particles.tot_particles(); i++) {
    mousepos = createVector(mouseX, mouseY)
    let force = p5.Vector.sub(all_particles.particles[i].position, createVector(mouseX, mouseY))
    force.normalize()
    force.mult(10)
    all_particles.particles[i].applyForce(force)
  }
}
