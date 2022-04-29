class Bubble {
    constructor(x, y, r, n) {
        this.n = n
        this.radius = r
        this.position = createVector(x, y)
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)
        this.max_force = 20
        this.c = 0.1
    }

    display() {
        fill(255, 255)
        stroke(255)
        strokeWeight(1)
        ellipse(this.position.x, this.position.y, 1, 1)
    }

    applyForce(force) {
        this.acceleration.add(force)
    }

    update() {
        this.applyResistance()
        this.velocity.add(this.acceleration)
        this.position.add(this.velocity)
        this.checkBorders()
        this.acceleration.mult(0)
    }

    applyResistance() {
        this.velocity.mult(0.95)
    }

    checkBorders() {
        if (this.position.x - this.radius < 0) {
            if (this.velocity.x < 0) {
                this.velocity.x = -this.velocity.x
            }
        }
        if (this.position.x + this.radius > width) {
            if (this.velocity.x > 0) {
                this.velocity.x = -this.velocity.x
            }
        }
        if (this.position.y - this.radius < 0) {
            if (this.velocity.y < 0) {
                this.velocity.y = -this.velocity.y
            }
        }
        if (this.position.y + this.radius > height) {
            if (this.velocity.y > 0) {
                this.velocity.y = -this.velocity.y
            }
        }
    }
}