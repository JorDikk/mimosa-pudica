class Bubble {
    constructor(x, y, r, n) {
        this.n = n
        this.radius = r
        this.position = createVector(x, y)
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)
        this.max_force = 10000
        this.c = 0.1
    }

    display() {
        fill(127, 127)
        stroke(200)
        ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2)
    }

    applyForce(force) {
        this.acceleration.add(force)
    }

    update(bubbles) {
        this.avoid_borders()
        this.applyResistance()
        this.repel_others(bubbles)
        this.velocity.add(this.acceleration)
        this.position.add(this.velocity)
        this.checkBorders()
        this.acceleration.mult(0)
    }

    applyResistance() {
        // let speed = this.velocity.mag()
        // let dragmag = this.c * speed * speed
        // let drag = this.velocity.copy()
        // drag.mult(-1)
        // drag.normalize()
        // drag.mult(dragmag)
        // this.applyForce(drag) 
        this.velocity.mult(0.95)
    }

    repel_others(bubbles) {
        for (let i = 0; i < bubbles.length; i++) {
            if (bubbles[i] !== this) {
                let force = p5.Vector.sub(this.position, bubbles[i].position)
                let d = force.mag()

                force.normalize()
                let strength = 2 / (d * d)
                strength = min(strength, this.max_force)
                force.mult(strength)
                this.applyForce(force)
            }
            // print(d)
            // if (d < (this.radius + bubbles[i].radius)) {
            //     // this.velocity.mult(-1)
            //     // force.normalize()
            //     // let strength = 1/(d*d)
            //     // force.mult(strength)
            //     // this.applyForce(force)
            // }
        }
    }
    avoid_borders() {
        let wall_x_1 = createVector(this.position.x, 0)
        let wall_y_1 = createVector(0, this.position.y)
        let wall_x_2 = createVector(this.position.x, width)
        let wall_y_2 = createVector(height, this.position.y)

        let force_x_1 = p5.Vector.sub(this.position, wall_x_1)
        let force_y_1 = p5.Vector.sub(this.position, wall_y_1)
        let force_x_2 = p5.Vector.sub(this.position, wall_x_2)
        let force_y_2 = p5.Vector.sub(this.position, wall_y_2)

        let dist_x_1 = force_x_1.mag()
        let dist_y_1 = force_y_1.mag()
        let dist_x_2 = force_x_2.mag()
        let dist_y_2 = force_y_2.mag()

        force_x_1.normalize()
        force_y_1.normalize()
        force_x_2.normalize()
        force_y_2.normalize()

        let strength_x_1 = 1 / (dist_x_1 * dist_x_1)
        let strength_y_1 = 1 / (dist_y_1 * dist_y_1)
        let strength_x_2 = 1 / (dist_x_2 * dist_x_2)
        let strength_y_2 = 1 / (dist_y_2 * dist_y_2)

        force_x_1.mult(strength_x_1)
        force_y_1.mult(strength_y_1)
        force_x_2.mult(strength_x_2)
        force_y_2.mult(strength_y_2)

        let force = p5.Vector.add(force_x_1, force_y_1)
        force.add(force_x_2)
        force.add(force_y_2)
        this.applyForce(force)


    }
    checkBorders() {
        if (this.position.x - this.radius < 0) {
            this.velocity.x = (this.velocity.x - (this.position.x - this.radius)) * -1
            this.position.x = this.radius
        }
        if (this.position.x + this.radius > width) {
            this.velocity.x = (this.velocity.x - (this.position.x + this.radius - width)) * -1
            this.position.x = width - this.radius
        }
        if (this.position.y - this.radius < 0) {
            this.velocity.y = (this.velocity.y - (this.position.y - this.radius)) * -1
            this.position.y = this.radius
        }
        if (this.position.y + this.radius > height) {
            this.velocity.y = (this.velocity.y - (this.position.y + this.radius - height)) * -1
            this.position.y = height - this.radius
        }


    }
}