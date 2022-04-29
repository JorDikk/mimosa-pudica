class Amoeba {
    constructor(locx, locy, num_particles, all_particles=0) {
        this.init_particles(locx, locy, num_particles, all_particles)
        this.init_springs()
        this.init_flatters()
    }

    init_particles(locx, locy, num_particles, all_particles) {
        this.particles = []
        let loc = createVector(locx, locy)
        for (let i = 0; i < num_particles; i++) {
            let angle = 360 / num_particles*i
            let x = loc.x+cos(angle*PI/180)
            let y = loc.y+sin(angle*PI/180)
            let bubble = new Bubble(x, y, 10, i)
            this.particles.push(bubble)
            if (all_particles != 0) {
                all_particles.addParticle(bubble)
            }
          }
    }

    init_springs() {
        this.springs = []
        let rest_len = 0.1
        for (let i = 0; i < (this.particles.length - 1); i++) {
            this.springs.push(new Spring(this.particles[i], this.particles[i + 1], rest_len))
          }
          this.springs.push(new Spring(this.particles[this.particles.length - 1], this.particles[0], rest_len))
        
    }

    init_flatters() {
        this.flatters = []
        for (let i = 1; i <= (this.particles.length - 2); i++) {
          this.flatters.push(new Flatter(this.particles[i - 1], this.particles[i], this.particles[i + 1]))
        }
        this.flatters.push(new Flatter(this.particles[this.particles.length - 1], this.particles[0], this.particles[1]))
        this.flatters.push(new Flatter(this.particles[this.particles.length - 2], this.particles[this.particles.length - 1], this.particles[0]))
    }

    update() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update()
            this.springs[i].update()
            this.flatters[i].update()
        }
    }
    display() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].display()
            this.springs[i].display()
        }
    }
    applyForce(force) {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].applyForce(force)
        }
    }
}
