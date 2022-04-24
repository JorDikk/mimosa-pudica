function setup() {
  pixelDensity(1)
  createCanvas(500, 500)


  // Create bubbles
  bubbles = new Bubbles()
  num_bubbles = 12
  loc = createVector(80, 80)
  for (let i = 0; i < num_bubbles; i++) {
    angle = 360 / num_bubbles*i
    x = loc.x+cos(angle*PI/180)
    y = loc.y+sin(angle*PI/180)
    print(x, y)
    print(angle)
    bubble = new Bubble(x, y, 2, i)
    bubbles.addParticle(bubble)
  }

  // Connect bubbles with springs
  springs = new Group()
  for (let i = 0; i < (bubbles.particles.length - 1); i++) {
    springs.addParticle(new Spring(bubbles.particles[i], bubbles.particles[i + 1], 20))
  }
  springs.addParticle(new Spring(bubbles.particles[bubbles.particles.length - 1], bubbles.particles[0], 20))

  // Flatten the connections
  flatters = new Group()
  for (let i = 1; i <= (bubbles.particles.length - 2); i++) {
    flatters.addParticle(new Flatter(bubbles.particles[i - 1], bubbles.particles[i], bubbles.particles[i + 1]))
  }
  flatters.addParticle(new Flatter(bubbles.particles[bubbles.particles.length - 1], bubbles.particles[0], bubbles.particles[1]))
  flatters.addParticle(new Flatter(bubbles.particles[bubbles.particles.length - 2], bubbles.particles[bubbles.particles.length - 1], bubbles.particles[0]))
  repeller = new Repeller(bubbles.particles)
}


function draw() {
  background(0)
  update()
  display()
}

function update() {
  // repeller.update()
  flatters.update()
  bubbles.update()
  springs.update()
}

function display() {
  bubbles.display()
  springs.display()
}

function mousePressed() {
  for (let i = 0; i < num_bubbles; i++) {
    mousepos = createVector(mouseX, mouseY)
    let force = p5.Vector.sub(bubbles.particles[i].position, createVector(mouseX, mouseY))
    force.normalize()
    force.mult(10)
    bubbles.particles[i].applyForce(force)
  }
}
