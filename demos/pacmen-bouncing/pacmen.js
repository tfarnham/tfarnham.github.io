const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10);
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = 100;

  // TODO: set position here
  newimg.style.left = position.x;
  newimg.style.top = position.y;

  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    toggleImage(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 30);
}

function checkCollisions(item) {
  // Detect collision with all walls and make Pacman bounce
  if(item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
  item.position.x + item.velocity.x < 0){
    item.velocity.x = -1*item.velocity.x;
  }
    if(item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
  item.position.y + item.velocity.y < 0){
    item.velocity.y = -1*item.velocity.y;
  }
}

function toggleImage(item) {
    // Switch between animation frames for left and right Pacmen
    let itemFilename = item.newimg.src.replace(/^.*[\\\/]/, '');
    console.log(itemFilename);
    if(item.velocity.x > 0){
        // Switch between 1 and 2 if going to the right
        if (itemFilename == 'PacMan1.png'){
            item.newimg.src = './images/PacMan2.png';
        }
        else {
            item.newimg.src = './images/PacMan1.png';
        }
    }
    else {
        if (itemFilename == 'PacMan3.png'){
            item.newimg.src = './images/PacMan4.png';
        }
        else {
            item.newimg.src = './images/PacMan3.png';
        }
    }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}