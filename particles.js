// an array to add multiple particles
let particles = [];
let img;
let kittens = [];
let countZoom;


function preload() {


    for (let i = 1; i < 80; i++)
        kittens[i] = loadImage('assets/cell-(' + i + ').jpg');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    for (let i = 0; i < width / 4; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(0, 0, 100);
    push();
    //translate(width / 2, height / 2);
    //scale(4);
    for (let i = 0; i < particles.length; i++) {
        particles[i].createParticle();
        //particles[i].moveParticle();
        particles[i].joinParticles(particles.slice(i));
    }
    pop();
}

window.onresize = function() {
    // assigns new values for width and height variables
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.size(w, h);
}

function mouseWheel(event) {
    print(event.delta);
    //move the square according to the vertical scroll amount
    countZoom += map(event.delta, 0, 1, 0, height);
    //uncomment to block page scrolling
    //return false;
}


// this class describes the properties of a single particle.
class Particle {
    // setting the co-ordinates, radius and the
    // speed of a particle in both the co-ordinates axes.
    constructor() {
        this.x = random(0, width);
        this.y = random(0, height);
        this.r = 30
        this.xSpeed = random(-2, 2);
        this.ySpeed = random(-1, 1.5);
        this.kitten = random(kittens);

    }

    // creation of a particle.
    createParticle() {
        noStroke();
        fill('rgba(200,169,169,0.5)');
        //circle(this.x, this.y, this.r);
        image(this.kitten, this.x, this.y, this.r, this.r);
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
