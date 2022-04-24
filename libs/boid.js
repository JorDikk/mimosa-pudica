class Boid {
    constructor(x, y) {
        this.acceleration = createVector(0, 0)
        this.velocity = createVector(random(-3, 3), random(-3, 3))
        this.position = createVector(x, y)
        this.r = 3.0
        this.maxspeed = 5  // Maximum speed
        this.maxforce = 0.05 // Maximum steering force
        this.neighbordist = 50
        this.desired_separation = 25
        this.leader = false
    }
    run(boids) {
        this.update(boids)
        this.borders()
        this.display()
    }

    update(boids) {
        for (let i = 0; i < boids.length; i++) {
            if (boids[i].leader === true && this.leader === false) {
                let desired = p5.Vector.sub(boids[i].position, this.position)
                desired.normalize()
                desired.mult(10)
                let steer = p5.Vector.sub(desired, this.velocity)
                steer.limit(0.2)
                this.applyForce(steer)
            }
        }
        this.acceleration.add(this.align(boids))
        this.acceleration.add(this.separate(boids))
        if (this.leader === false) {
            this.acceleration.add(this.cohere(boids))
        }
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxspeed)
        this.position.add(this.velocity)
        this.acceleration.mult(0)
    }

    applyForce(force) {
        this.acceleration.add(force)
    }

    cohere(boids) {
        let sum = createVector(0, 0)
        let count = 0
        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(this.position, boids[i].position)
            if ((d > 0) && (d < this.neighbordist)) {
                sum.add(boids[i].position)
                count++
            }
            if (count > 0) {
                sum.div(count)
                return this.seek(sum)
            } else {
                return createVector(0, 0)
            }
        }
    }

    align(boids) {
        let sum = createVector(0, 0)
        let count = 0
        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(this.position, boids[i].position)
            if ((d > 0) && (d < this.neighbordist)) {
                sum.add(boids[i].velocity)
                count++
            }
        }
        if (count > 0) {
            sum.div(count)
            sum.normalize()
            sum.mult(this.maxspeed * 3)
            let steer = p5.Vector.sub(sum, this.velocity)
            steer.limit(this.maxforce * 3)
            return steer
        } else {
            return createVector(0, 0)
        }
    }

    separate(boids) {
        let steer = createVector(0, 0)
        let count = 0
        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(this.position, boids[i].position)
            if ((d > 0) && (d < this.desired_separation)) {
                let diff = p5.Vector.sub(this.position, boids[i].position)
                diff.normalize()
                diff.div(d)
                steer.add(diff)
                count++
            }
        }
        if (count > 0) {
            steer.div(count)
        }
        if (steer.mag() > 0) {
            steer.normalize()
            steer.mult(this.maxspeed)
            steer.sub(this.velocity)
            steer.limit(this.maxforce)
        }
        return steer
    }

    seek(target) {
        let desired = p5.Vector.sub(target, this.position)
        desired.normalize()
        desired.mult(this.maxspeed)
        let steer = p5.Vector.sub(desired, this.velocity)
        steer.limit(this.maxforce)
        return steer
    }

    borders() {
        if (this.position.x < -this.r) this.position.x = width + this.r
        if (this.position.y < -this.r) this.position.y = height + this.r
        if (this.position.x > width + this.r) this.position.x = -this.r
        if (this.position.y > height + this.r) this.position.y = -this.r
    }

    display() {
        let theta = this.velocity.heading() + radians(90)
        fill(127, 127)
        stroke(200)
        push()
        translate(this.position.x, this.position.y)
        rotate(theta)
        beginShape()
        vertex(0, -this.r * 2)
        vertex(-this.r, this.r * 2)
        vertex(this.r, this.r * 2)
        endShape(CLOSE)
        pop()
    }
}