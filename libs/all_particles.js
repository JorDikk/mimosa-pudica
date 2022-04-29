class AllParticles {
    constructor(max_repel_force) {
        this.particles = []
        this.maxRepelForce = max_repel_force
    }

    addParticle(b) {
        this.particles.push(b)
    }

    applyForce(force) {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].applyForce(force)
        }
    }

    repel() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = 0; j < this.particles.length; j++) {
                if (this.particles[i] !== this.particles[j]) {
                    let force = p5.Vector.sub(this.particles[i].position, this.particles[j].position)
                    let d = force.mag()
    
                    force.normalize()
                    let strength = 1 / (d*d)
                    strength = min(strength, this.maxRepelForce)
                    force.mult(strength)
                    this.particles[i].applyForce(force)
                }
            }
        }
    }

    tot_particles() {
        return this.particles.length
    }
}