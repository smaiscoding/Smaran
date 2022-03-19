const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg,boat;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
 
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

 
  rect(ground.position.x, ground.position.y, width * 2, 1);
  

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();



  showBoats();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    colisionWithBoat(i)
  }

  cannon.display();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}
/*Inside the showCannonBalls() function, we’ll write a condition to check if the X position of the cannonball 
is more than or equal to the width of the screen or if the y position is greater than the height-50 which means 
little above the ground. 
If either of the two conditions is true then we’ll remove the ball using the remove function.*/
function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) 
    {
       ball.remove(index); 
      }
  
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 170, 170, position);

      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {
          x: -0.9,
          y: 0
        });

        boats[i].display();
      } 
    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60);
    boats.push(boat);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

function colisionWithBoat(index){
  for(var i=0; i<boats.length;i++){
    if(balls[index]!==undefined && boats[index]!==undefined ){
      //we are doing this to check if the index  the canon ball and the index of the boat are defined and not undifined
  //meaning that there is some value in both the arrays otherwise there would be no meaning of checking colisions
 // Matter.SAT.collides() helps us in dectecing collisions between two bodies it returns true if the was a collsion
 //else returns false
 var collision = Matter.SAT.collides(balls[index].body, boats[index].body)
 //We'll use another if condition to check if the collision.collided is true. 
 //If it is true then, Inside this condition we’ll call the boats[i].
 //remove[i] function and call the Matter.World.remove() and delete balls[index] to remove balls from the 
 //world and the array.


      if(collision.collided){
        boats[i].remove(i);
        Matter.World.remove(world,balls[index].body)
        delete balls[index]

      }
    }
  }


}


}
