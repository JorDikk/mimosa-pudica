class Repeller {
    constructor(bubbles) {
        this.bubbles = bubbles
        this.max_force = 1
    }

    update() {
        let pos = this.bubbles[0].position.copy()
        for (let i = 1; i < this.bubbles.length; i++) {
            pos.add(this.bubbles[i].position)

        pos.div(this.bubbles.length)
        for (let i = 0; i < this.bubbles.length; i++) {
            let force = p5.Vector.sub(pos, this.bubbles[i].position)
            let d = force.mag()
            if (d > 0.1) {
                force.normalize()
                force.div(d*d)
                force.mult(this.max_force)
                this.bubbles[i].applyForce(force)
            }

        }
    }
    }

}