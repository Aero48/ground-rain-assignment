// Class for all of the raindrop objects
class RainDrop {
    constructor(cx, cy, radius, color) {
        this.x = cx;
        this.y = cy;
        this.radius = radius;
        this.color = color;
        this.speed = 2 + Math.random() * 4;
    }

    update() {
        //Raindrops move downwards based on the speed variable
        this.y = this.y + this.speed;
        fill(this.color);
        circle(this.x,this.y,this.radius);
    }
}

// The manager controls the generation (& regeneration of rain drops)
class Manager {
    constructor(numDrops) {
        this.numDrops = numDrops;
    }

    // Runs only once. Generates the amount of rain drops based on the numDrops variable
    dropInit(){
        for(let i = 0; i<this.numDrops; i++){
            // Adds new RainDrop objects to an array
            rainDrops[i] = new RainDrop(Math.random() * 400, 10, -20, [145, 240, 255]);
        }
    }

    update(){
        // Makes the RainDrop objects reset position and add to the ground object's hit counter
        for(let j = 0; j < rainDrops.length; j++){
            if (rainDrops[j].y > ground.y){
                // Randomize the rain drop's x pos upon landing
                rainDrops[j].x = Math.random() * 400;
                // Resets the rain drop's y position to the top upon landing
                rainDrops[j].y = -20;
                // Randomizes the rain drop's speed upon landing
                rainDrops[j].speed = 2 + Math.random() * 4;
                // Adds to the ground object's hit counter
                ground.hits ++;
            }
        }
    }
}

// Class for the ground/floor
class Floor {
    constructor(x, y, w, h, red, green, blue) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.hits = 0;
    }

    update() {
        fill(this.red,this.green,this.blue);
        rect(this.x, this.y, this. w, this.h);
        // Once the ground has been hit by 10 rain drops, it becomes bluer and the variable resets. Once it reaches maximum blue (minimum red and green), the rectangle becomes taller.
        if (this.hits >= 10){
            if (this.red > 0 && this.green > 0){
                this.red -= 5;
                this.green -= 5;
            }else{
                this.y -= 5;
                this.h += 5;
            }
            this.hits = 0;
            
        }
    }
}

// Initialize the array of RainDrop objects
var rainDrops = [];

// Creates the ground object based on the Floor class
ground = new Floor(0,250,400,50,100,100,100);

// Creates a manager object
manager = new Manager(20);

// Runs the rain drop initializing function in the manager class
manager.dropInit();

function setup() {
    createCanvas(400,300);
}

function draw() {
    background(0, 0, 0);
    ground.update();
    manager.update();
    // Runs every RainDrop's update function
    for (let i = 0; i < rainDrops.length; i++) {
        rainDrops[i].update();
    }
}