class Boat {
  constructor(x, y, width, height, boatPos) {
  
    this.body = Bodies.rectangle(x, y, width, height);
    this.width = width;
    this.height = height;

    this.image = loadImage("./assets/boat.png");
    this.boatPosition = boatPos;
    World.add(world, this.body);
  }
  /*When the cannon ball collides with the boat we need to remove the ball and boat from the array and the world in 
  order to make them disappear from the canvas. Now inside the Boat.js file we’ll write a 
  remove function which will remove the boat from the world and from the
array. This function will take the index of the boat to be removed as the parameter. 
Inside the function we’ll use Matter.World.remove() to remove the boat from the world and use the delete method to 
delete the boat from the array. We’ll add this code inside the setTimeout() function to execute the code after 2 seconds;
 setTimout() function executes a code after a certain time interval. 
This will help later when we’ll be adding images*/
remove(index){
  setTimeout(()=>{
    Matter.World.remove(world, boats[index].body)
    delete boats[index];
  },2000);
}
  display() {
    var angle = this.body.angle;
    var pos = this.body.position;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, this.boatPosition, this.width, this.height);
    pop();
  }
}
