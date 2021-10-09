
let particles = [];
let cells = [];
let sf = 1; 
let x = 0;
let y = 0; 
let mx, my; 
let flagMove;
let  randomImg;


function preload() {
    for (let i = 1; i < 11; i++){
        cells[i - 1] = loadImage('assets/cell-(' + i + ').jpg');
    }

}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    flagMove = 0;
    for (let i = 0; i < 45; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    mx = mouseX;
    my = mouseY;
    background(0, 0, 100);
    translate(mx, my);
    scale(sf);
    translate(-mx, -my);


    if (mouseIsPressed) {
        x -= pmouseX - mouseX;
        y -= pmouseY - mouseY;
      }

 
        for (let i = 0; i < particles.length; i++) {
            particles[i].createParticle();
            //particles[i].moveParticle();
            particles[i].joinParticles(particles.slice(i));
        }

}



window.addEventListener("wheel", function(e) {
    if (e.deltaY > 0)
      sf *= 1.05;
    else
      sf *= 0.95;
  });



class Particle {
    constructor() {
        this.x = random(0, width);
        this.y = random(0, height);
        this.r = random(0,30);
        this.xSpeed = random(-2, 2);
        this.ySpeed = random(-1, 1.5);
        this.cell = random(cells);

    }

    // creation of a particle.
    createParticle() {
        noStroke();
        if(sf <= 1){
            fill('rgba(200,169,169,0.5)');
            circle(this.x, this.y, this.r);
        }if(sf > 1){
            image(this.cell, this.x, this.y, this.r, this.r);
            console.log(this.cell);

        }
  
   
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


    joinParticles(particles) {
        particles.forEach(element => {
            let dis = dist(this.x, this.y, element.x, element.y);
            if (dis < 150) {
                stroke('rgba(255,255,255');
                line(this.x, this.y, element.x, element.y);
            }
        });
    }
}
