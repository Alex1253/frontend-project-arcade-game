// ladybugs our player must avoid
var Ladybug = function(x,y, scuttle) {
    this.x = x;
    this.y = y + 55;
    this.scuttle = scuttle;
    this.sprite = 'images/enemy-bug.png';
    this.run = 101;
    this.edge = this.run * 5;
    this.reset = -this.run;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Ladybug.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(this.x < this.edge) {
        this.x += this.scuttle * dt;
    }
    else {
        // Reset to start
        this.x = this.reset;
    }
};

// Draw the enemy on the screen, required method for game
Ladybug.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Character {
    constructor() {
        this.sprite = 'images/char-boy.png'
        this.run = 101;
        this.move = 83;
        this.beginningX = this.run * 2;
        this.beginningY = (this.move * 4) + 55;
        this.x = this.beginningX;
        this.y = this.beginningY;
        this.condition = false;
    }

    update() {
        
        // Collide
        for(let ladybug of allEnemies) {
           
            // Did player x and y collide with enemy?
            if (this.y === ladybug.y && (ladybug.x + ladybug.run/2 > this.x && ladybug.x < this.x + this.move/2) ) {
                this.reset();
            }   
        }
        // Win Condition
        if(this.y === 55) {
            this.condition = true;
    }
}

    /** Update Character according to input
    * @param {string} input - Direction
    */
    handleInput(input) {
    switch(input) {
        case 'left':
           if (this.x > 0) {
               this.x -= this.run;
           }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= this.move;
            }
            break;
        case 'right':
           if (this.x < this.run * 4) {
               this.x += this.run;
           }
            break;
        case 'down':
            if (this.y < this.run * 4) {
                this.y += this.run;
            }
            break;
        }
    }

// Reset Charater
reset() {
    this.y = this.beginningY;
    this.x = this.beginningX;
}

    // Draw Charater sprite
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Character();
const ladybug1 = new Ladybug(-201, 0, 200);
const ladybug2 = new Ladybug(0, 83, 300);
const allEnemies = [];
allEnemies.push(ladybug1,ladybug2);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
