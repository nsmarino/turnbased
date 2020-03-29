let spritesheet;

let animation = [[]]
let x
let counter = 0

function preload() {
  spritesheet = loadImage('assets/spritetest.png')
}

function setup(){
    createCanvas(500,300);
  }

function draw(){
    background('blue')
    for (var i=0; i<8; i++) {
      fill(0)  
      if (i%2) fill(255)
      rect(i*50, height/2, 50, 50)
    }
//   console.log(frameCount % animation.length) 
}
