class Flatter {
    constructor(bl, b, br) {
        this.bl = bl
        this.b = b
        this.br = br
        this.max_force = 10
    }

    update() {
        let pos = p5.Vector.add(this.bl.position, this.br.position)
        pos.div(2)
        let force = p5.Vector.sub(pos, this.b.position)
        let d = force.mag()
        force.normalize()
        force.mult(-1/(d))
        force = force.limit(this.max_force)
        this.b.applyForce(force)
        // fill(200, 200)
        // stroke(200)
        // strokeWeight(1)
        // ellipse(pos.x, pos.y, 5, 5)
    
    }

}