//
// Global variables
//

var tileX, tileY; // Tile value adjusted to tilesize.

var tool; // Tool (inventory position) in use.

var score = 0; // Your score.

var money = 10; // Your money.

//
// Global functions
//

function getRandomInt(min, max) { // Function for generation of random integer in a given range.
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};


function includesRange(x,y) { // Function used for iterative testing of inclusion, e.g. if there any flowers on tilemap?
   do {
     if (map.tiles.includes(x) == true) return true;
     x++;
   } while (x >= y);
   return false;
 };

// "select*"" function are combination of interactions between given tool and a type of logical tile.

function selectTool() { //selectTool is a meta-function/switch that points to a tool that is in use.
  var tool = document.querySelector('[name="tool"]:checked').value;
  switch (true) {
      case (tool == "select"): // Grass tiles
      selectTile(map.tiles[tileX + tileY * map.cols]);
      break;
      case (tool == "shovel"): // Stone tiles
      shovelTile(map.tiles[tileX + tileY * map.cols]);
      break;
      case (tool == "seedbag"): // Sprout tiles
      seedbagTile(map.tiles[tileX + tileY * map.cols]);
      break;
      case (tool == "wateringcan"): // Flower tiles
      wateringcanTile(map.tiles[tileX + tileY * map.cols]);
      break;
      case (tool == "sell"): // Flower tiles
      sellTile(map.tiles[tileX + tileY * map.cols]);
      break;
      case (tool == "gnome"): // Flower tiles
      gnomeTile(map.tiles[tileX + tileY * map.cols]);
      break;
      case (tool == "flamingo"): // Flower tiles
      flamingoTile(map.tiles[tileX + tileY * map.cols]);
      break;
      case (tool == "statue"): // Flower tiles
      statueTile(map.tiles[tileX + tileY * map.cols]);
      break;
  };
}

function selectTile(n) { // "Select" Tool provides basic info.
  switch (true) {
      case (n <= 4): // Grass tiles
          document.getElementById("description").innerHTML =  "Grass - can be digged!";
          break;
      case (n == 5 || n == 6): // Stone tiles
          document.getElementById("description").innerHTML =  "You don't have proper tool to dig out stone!";
          break;
      case (n == 7 || n == 8): // Sprout tiles
          document.getElementById("description").innerHTML =  "Here are some sprouts - they will turn into flower soon...";
          break;
      case (n >= 9 && n <= 17): // Flower tiles
          document.getElementById("description").innerHTML =  "A beautiful flower.";
          break;
      case (n == 18): // Hole tiles
          document.getElementById("description").innerHTML =  "Empty hole - you can put seed here!.";
          break;
      case (n == 19): // Gnome
          document.getElementById("description").innerHTML =  "This guy has a Red Hat(tm).";
          break;
      case (n == 20): // Flamingo
          document.getElementById("description").innerHTML =  "It's very pink.";
          break;
      case (n == 21): // Statue
          document.getElementById("description").innerHTML =  "This stone was carved millenia ago by some unknown tribe...";
          break;
  };
};

function shovelTile(n) { // "Shovel" is used for digging holes and killing flowers.
  switch (true) {
      case (n <= 4): // Grass tiles
          map.tiles[tileX + tileY * map.cols] = 18;
          document.getElementById("description").innerHTML =  "Diggin' some hole!";
          break;
      case (n == 5 || n == 6): // Stone tiles
          document.getElementById("description").innerHTML =  "You don't have proper tool to dig out stone!";
          break;
      case (n == 7 || n == 8): // Sprout tiles
          map.tiles[tileX + tileY * map.cols] = 18;
          document.getElementById("description").innerHTML =  "Let's try again here!";
          break;
      case (n >= 9 && n <= 17): // Flower tiles
          map.tiles[tileX + tileY * map.cols] = 18;
          document.getElementById("description").innerHTML =  "What a pity!";
          score -= 5;
          break;
      case (n == 18): // Hole tiles
          document.getElementById("description").innerHTML =  "There's hole here already!";
          break;
  };
};

function seedbagTile(n) { // It plant seeds in holes.
  switch (true) {
    case (n <= 4): // Grass tiles
        document.getElementById("description").innerHTML =  "It's a waste of seeds!";
        break;
    case (n == 5 || n == 6): // Stone tiles
        document.getElementById("description").innerHTML =  "Hey! Nothing will grow here!";
        break;
    case (n == 7 || n == 8): // Sprout tiles
        document.getElementById("description").innerHTML =  "There's a sprout here already.";
        break;
    case (n >= 9 && n <= 17): // Flower tiles
        document.getElementById("description").innerHTML =  "There's a flower here already.";
        break;
    case (n == 18): // Hole tiles
      if (money - 2 >= 0) {
        money -= 2;
        map.tiles[tileX + tileY * map.cols] = 7;
        document.getElementById("description").innerHTML =  "Grow my babies, grow!";
        score += 5;
        break; } else {
        document.getElementById("description").innerHTML =  "You don't have enough money for that!";
        break;
      };
  };
};

function wateringcanTile(n) { // It waters seedlings.
  switch (true) {
    case (n <= 4): // Grass tiles
        document.getElementById("description").innerHTML =  "Don't lose water on an empty field!";
        break;
    case (n == 5 || n == 6): // Stone tiles
        document.getElementById("description").innerHTML =  "There's no point in watering stones.";
        break;
    case (n == 7 || n == 8): // Sprout tiles
        if (n == 7) {
          map.tiles[tileX + tileY * map.cols] += 1;
          score++; }
        else {
          map.tiles[tileX + tileY * map.cols] = getRandomInt(9, 17);
          score += 10; };
        document.getElementById("description").innerHTML =  "Here, grow bigger!"
        break;
    case (n >= 9 && n <= 17): // Flower tiles
        score++;
        document.getElementById("description").innerHTML =  "Here are some water"
        break;
    case (n == 18): // Hole tiles
        document.getElementById("description").innerHTML =  "Nothing grows here.";
        break;
  };
};

function sellTile(n) { // Sell things.
  switch (true) {
      case (n <= 8 || n == 18): // Grass tiles
          document.getElementById("description").innerHTML =  "You cannot sell that...";
          break;
      case (n == 5 || n == 6): // Stone tiles
          document.getElementById("description").innerHTML =  "You cannot sell that...";
          break;
      case (n == 7 || n == 8): // Sprout tiles
          document.getElementById("description").innerHTML =  "You cannot sell that...";
          break;
      case (n >= 9 && n <= 17): // Flower tiles
          map.tiles[tileX + tileY * map.cols] = 18;
          document.getElementById("description").innerHTML =  "Ka-Ching!";
          money += 5;
          break;
      case (n >= 9 && n <= 17): // Gnome
          map.tiles[tileX + tileY * map.cols] = getRandomInt(1, 4);
          document.getElementById("description").innerHTML =  "Ka-Ching!";
          money += 7;
          break;
      case (n >= 9 && n <= 17): // Flamingo
          map.tiles[tileX + tileY * map.cols] = getRandomInt(1, 4);
          document.getElementById("description").innerHTML =  "Ka-Ching!";
          money += 15;
          break;
     case (n >= 9 && n <= 17): // Statue
          map.tiles[tileX + tileY * map.cols] = getRandomInt(1, 4);
          document.getElementById("description").innerHTML =  "Ka-Ching!";
          money += 50;
          break;
  };
};

function gnomeTile(n) { // Buy gnome.
  switch (true) {
    case (n <= 4): // Grass tiles
      if (money - 10 >= 0) {
        money -= 10;
        map.tiles[tileX + tileY * map.cols] = 19;
        document.getElementById("description").innerHTML =  "More gnomes!";
        score += 100;
        break; } else {
        document.getElementById("description").innerHTML =  "You don't have enough money for that!";
        break;
      };
      case (n >= 5): // Other tiles
        document.getElementById("description").innerHTML =  "That's no good place for a gnome!";
        break;
  };
};

function flamingoTile(n) { // buy flamingo.
  switch (true) {
    case (n == 18): // Hole tile
      if (money - 25 >= 0) {
        money -= 25;
        map.tiles[tileX + tileY * map.cols] = 20;
        document.getElementById("description").innerHTML =  "Plastic bird incoming...";
        score += 250;
        break; } else {
        document.getElementById("description").innerHTML =  "You don't have enough money for that!";
        break;
      };
      case (n !== 18): // Other tiles
        document.getElementById("description").innerHTML =  "Flamingo won't stay here...";
        break;
  };
};

function statueTile(n) { // Buy statue
  switch (true) {
      case (n == 6): // Big Rock tile
        if (money - 25 >= 0) {
          money -= 100;
          map.tiles[tileX + tileY * map.cols] = 21;
          document.getElementById("description").innerHTML =  "The ancient one...";
          score += 1000;
          break; } else {
          document.getElementById("description").innerHTML =  "You don't have enough money for that!";
          break; };
          case (n !== 6): // Stone tiles
          document.getElementById("description").innerHTML =  "You must have a big rock to carve ancient statue!";
          break;
  };
};

// function GameOver() { // Function for Game Over is not ready yet.
//   if (money == 0 &&
//      includesRange(7,17) == false) alert("Game Over!");
// };


//
// Images loader
//

var Loader = {
    images: {}
};

Loader.loadImage = function (key, src) {
    var img = new Image();

    var d = new Promise(function (resolve, reject) {
        img.onload = function () {
            this.images[key] = img;
            resolve(img);
        }.bind(this);

        img.onerror = function () {
            reject('Could not load image: ' + src);
        };
    }.bind(this));

    img.src = src;
    return d;
};

Loader.getImage = function (key) {
    return (key in this.images) ? this.images[key] : null;
};

//
// Game object
//

var Game = {};

Game.run = function (context) {
    this.ctx = context;
    this._previousElapsed = 0;

    var p = this.load();
    Promise.all(p).then(function (loaded) {
        this.init();
        window.requestAnimationFrame(this.tick);
    }.bind(this));
};

Game.tick = function (elapsed) {
    window.requestAnimationFrame(this.tick);

    // clear previous frame
    this.ctx.clearRect(0, 0, 256, 256);

    // compute delta time in seconds -- also cap it
    var delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
    this._previousElapsed = elapsed;

    this.update(delta);
    this.render();
}.bind(Game);

// override these methods to create the demo
Game.init = function () {};
Game.update = function (delta) {};
Game.render = function () {};

//
// start up function
//

window.onload = function () {
    var context = document.getElementById('demo').getContext('2d');
    Game.run(context);

    document.getElementById("score").innerHTML =  score;
    document.getElementById("money").innerHTML =  money;
    var elem = document.getElementById('demo'),
    elemLeft = elem.offsetLeft,
    elemTop = elem.offsetTop,
    context = elem.getContext('2d');

    // Add event listener for `click` events.
    elem.addEventListener('click', function(event) {
      var x = event.pageX - elemLeft,
      y = event.pageY - elemTop;
      tileX = Math.floor(x / 32);
      tileY = Math.floor(y / 32);
      // console.log(tileX, tileY); // Tile coordinate test

      selectTool(map.tiles[tileX + tileY * map.cols]);

      console.log(document.querySelector('[name="tool"]:checked').value);

      document.getElementById("score").innerHTML =  score;
      document.getElementById("money").innerHTML =  money;

      // gameOver();
    }, false);
};

//
// A Game Map
//

var map = {
    cols: 8,
    rows: 8,
    tsize: 32,
    tiles: [],

    getTile: function (col, row) {
        return this.tiles[row * map.cols + col];
    }
};

for (var i = 0; i < map.cols * map.rows; i++) { // Random map generator
    var dice = getRandomInt(1, 128); // Dice throw for rocks.
    if (dice >= 125) {map.tiles.push(6); continue;}; // Big rocks occur seldom.
    if (dice >= 120) {map.tiles.push(5); continue;}; // Small rocks occur more often.
    map.tiles.push(getRandomInt(1, 4));
    }


Game.load = function () { // Image loader.
    return [
        Loader.loadImage('tiles', '../assets/tiles.png'),
        Loader.loadImage('selector', '../assets/selector.png')
    ];
};

Game.init = function () {
    this.tileAtlas = Loader.getImage('tiles');
    this.selector = Loader.getImage('selector');
};

Game.update = function (delta) {
};

Game.render = function () {
    for (var c = 0; c < map.cols; c++) {
        for (var r = 0; r < map.rows; r++) {
            var tile = map.getTile(c, r);
            if (tile !== 0) { // 0 => empty tile
                    this.ctx.drawImage(
                      this.tileAtlas, // image
                      (tile - 1) * map.tsize, // source x
                      0, // source y
                      map.tsize, // source width
                      map.tsize, // source height
                      c * map.tsize,  // target x
                      r * map.tsize, // target y
                      map.tsize, // target width
                      map.tsize // target height
                      );
                    }
            }
          };

    // this.ctx.strokeStyle = "#CCCCCC";  // Draw Tile Grid function.
    //       for (i = 32; i < 256; i+=32){
    //         this.ctx.moveTo(i,0);
    //         this.ctx.lineTo(i,256);
    //         this.ctx.stroke();
    //       }
    //       for (i = 32; i < 256; i+=32){
    //         this.ctx.moveTo(0,i);
    //         this.ctx.lineTo(256,i);
    //         this.ctx.stroke();
    //       }

      this.ctx.drawImage(
          this.selector, // image
          0, // source x
          0, // source y
          map.tsize, // source width
          map.tsize, // source height
          tileX * map.tsize,  // target x
          tileY * map.tsize, // target y
          map.tsize, // target width
          map.tsize // target height
          );
    };
