class Spring {
    constructor(b1_, b2_, l) {
        this.b1 = b1_
        this.b2 = b2_
        this.rest_len = l
        this.k = 0.01
        this.c = 0.001
    }

    update() {
        let force = p5.Vector.sub(this.b2.position, this.b1.position)
        let d = force.mag()
        let stretch = d - this.rest_len
        force.normalize()
        force.mult(-1 * this.k * stretch)
        this.b2.applyForce(force)
        force.mult(-1)
        this.b1.applyForce(force)
    }

    display() {
        strokeWeight(2)
        stroke(200)
        line(this.b1.position.x, this.b1.position.y, this.b2.position.x, this.b2.position.y)
    }
}