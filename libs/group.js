class Group {
    constructor() {
        this.particles = []
    }

    addParticle(b) {
        this.particles.push(b)
    }

    update() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update()
        }
    }
    
    display() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].display()
        }
    }
}

class Bubbles extends Group {
    update() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update(this.particles)
        }
    }
}