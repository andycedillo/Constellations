// an array to add multiple particles
let particles = [];
let img;
let imgs = [];


function preload() {


    for (let i = 1; i < 80; i++)
        imgs[i] = loadImage('assets/cell-(' + i + ').jpg');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    let img = random(imgs);
    for (let i = 0; i < width / 10; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(0, 0, 100);
    push();
    //translate(width / 2, height / 2);
    //scale();
    for (let i = 0; i < particles.length; i++) {
        particles[i].createParticle();
        //particles[i].moveParticle();
        particles[i].joinParticles(particles.slice(i));
    }
    pop();
}


// this class describes the properties of a single particle.
class Particle {
    // setting the co-ordinates, radius and the
    // speed of a particle in both the co-ordinates axes.
    constructor(pic) {
        this.x = random(0, width);
        this.y = random(0, height);
        this.r = 30
        this.xSpeed = random(-2, 2);
        this.ySpeed = random(-1, 1.5);
        this.picture = imgs

    }

    // creation of a particle.
    createParticle() {
        noStroke();
        fill('rgba(200,169,169,0.5)');
        //circle(this.x, this.y, this.r);
        image(imgs[67], this.x, this.y, this.r, this.r);
    }

    // setting the particle in motion.
    moveParticle() {
        if (this.x < 0 || this.x > width)
            this.xSpeed *= -1;
        if (this.y < 0 || this.y > height)
            this.ySpeed *= -1;
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    // this function creates the connections(lines)
    // between particles which are less than a certain distance apart
    joinParticles(particles) {
        particles.forEach(element => {
            let dis = dist(this.x, this.y, element.x, element.y);
            if (dis < 100) {
                stroke('rgba(255,255,255');
                line(this.x, this.y, element.x, element.y);
            }
        });
    }
}