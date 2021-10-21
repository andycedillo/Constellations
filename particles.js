let particles = [];
let cells = [];
let sf = 0.93; 
let x = 0;
let y = 0; 
let mx, my; 
let  randomImg;
let interA ;
 




function preload() {
    for (let i = 1; i < 44; i++){
        cells[i - 1] = loadImage('imagenes/img_(' + i + ').jpg');
    }

}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

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
    newalphaC = map(sf, 0, 17,300,10);
    newalphaB = map(sf, -1, 1,0,500);
    print( sf);


    if (mouseIsPressed) {
        x -= pmouseX - mouseX;
        y -= pmouseY - mouseY;
      }

      if (sf <= 0.89){
         sf = 1;
      }

      if (sf >= 15){
          sf = 15;
      }

  
 
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].createParticle();
            //particles[i].moveParticle();
        particles[i].joinParticles(particles.slice(i));
    }

 


    for (let a = 0; a < 45 ; a++){
        particles[a].createStar();
    }

    for (let e = 0; e < 1 ; e++){
        particles[e].createPlanet();
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
        this.xstar = random(10,width);
        this.ystar = random(10, height);
        this.r = random(3,30);
        this.xSpeed = random(-2, 2);
        this.ySpeed = random(-1, 1.5);
        this.cell = random(cells);
        this.alpha = 0.5;
        this.color = color(255, 255, 255    );
        this.increase = true;
        this.gradientone = color(255,255,0);
        this.gradienttwo = color(0,0,255);
        this.rcolorone = random(0,width);
        this.rcolortwo = random(0,height);

    }

    // creation of a particle.
    createParticle() {
        noStroke();
        this.color.setAlpha(this.alpha);
        fill(this.color);
        circle(this.x, this.y, this.r);
        if(sf > 1){
            //tint(255, this.alpha);
            image(this.cell, this.x, this.y, this.r, this.r);
        }
    }

    createStar() {
        noStroke();
        fill('rgba(200,169,169)');
        circle(this.xstar  ,this.ystar , 7);
    }

    createPlanet() {
        noStroke();
        fill('rgba(200,169,169)');
        circle(this.x , height / 2 + 200, 80);
    }


    update() {
        if (this.increase && this.alpha >= 0.5) {
          let rate = random(0.3, 0.4);
          this.alpha = newalphaC;
        }
     
    }


    joinParticles(particles) {
        particles.forEach(element => {
            let dis = dist(this.x, this.y, element.x, element.y);
            if (dis < 150) {
                strokeWeight(0.8);
                stroke(255,255,255);
                line(this.x, this.y, element.x, element.y);

                if(this.x > this.rcolorone){
                interA = lerpColor(this.gradientone,this.gradienttwo, 0.2);
                strokeWeight(0.8);
                stroke(interA);
                line(this.x, this.y, element.x, element.y);
                }
                if(this.y > this.rcolortwo){
                    interA = lerpColor(this.gradientone,this.gradienttwo, 0.9);
                    strokeWeight(0.8);
                    stroke(interA);
                    line(this.x, this.y, element.x, element.y);
                    }

            }
        });
    }

}
