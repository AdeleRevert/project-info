// create a chihuahuas class
class Chihuahuas {
  constructor(chihuahuasX, chihuahuasY, chihuahuasWidth, chihuahuasHeight) {
    this.x = chihuahuasX;
    this.y = chihuahuasY;
    this.width = chihuahuasWidth;
    this.height = chihuahuasHeight;
    this.isCrashed = false;
  }

  drawMe() {
    if (!unicorn.isCrashed && !(score >= 5)) {
      this.y += 2;
      if (this.y > 700) {
        this.y = 0;
      }
    }
    ctx.drawImage(chihuahuasImg, this.x, this.y, this.width, this.height);
  }
}

// Create an hoomans class
class Hoomans {
  constructor(hoomansX, hoomansY, hoomansWidth, hoomansHeight) {
    this.x = hoomansX;
    this.y = hoomansY;
    this.width = hoomansWidth;
    this.height = hoomansHeight;
    this.isCrashed = false;
    this.image = hoomansImg;
  }

  drawMe() {
    if (!unicorn.isCrashed && !(score >= 5)) {
      this.y += 2;
      if (this.y > 700) {
        this.y = 0;
        this.isCrashed = false;
        this.image = hoomansImg;
      }
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

var canvas = document.querySelector(".save-the-divine");
var ctx = canvas.getContext("2d");

var unicornImg = new Image();
unicornImg.src = "./images/unicorn.png";

var chihuahuasImg = new Image();
chihuahuasImg.src = "./images/CHIHUAHUA ETOILES.png";

var hoomansImg = new Image();
hoomansImg.src = "./images/fuckinghooman.png";

var redHoomansImg = new Image();
redHoomansImg.src = "./images/redfuckinghooman.png";

var score = 0;

// create a unicorn object
var unicorn = {
  x: 250,
  y: 600,
  width: 80,
  height: 80,
  isCrashed: false,

  drawMe: function() {
    ctx.drawImage(unicornImg, this.x, this.y, this.width, this.height);
  }
};

var allChihuahuas = [
  new Chihuahuas(30, 400, 80, 80),
  new Chihuahuas(400, 700, 80, 80),
  new Chihuahuas(500, 100, 80, 80),
  new Chihuahuas(520, 360, 80, 80),
  new Chihuahuas(400, 0, 80, 80),
  new Chihuahuas(300, 0, 80, 80),
  new Chihuahuas(100, 0, 80, 80)
];

var allHoomans = [
  new Hoomans(0, 300, 80, 80),
  new Hoomans(200, 320, 80, 80),
  new Hoomans(500, 600, 80, 80),
  new Hoomans(300, 100, 80, 80),
  new Hoomans(400, 490, 80, 80),
  new Hoomans(100, 200, 80, 80),
  new Hoomans(600, 280, 80, 80)
];

var gameOver = {
  opacity: 0,
  drawMe: function() {
    this.opacity += 0.01;

    ctx.globalAlpha = this.opacity;
    ctx.font = "bold 40px monospace";

    ctx.fillStyle = "white";
    ctx.fillText("Game Over, you killed one Divine Animal", 50, 325);

    ctx.globalALpha = 1;
  }
};

var win = {
  opacity: 0,
  drawMe: function() {
    this.opacity += 0.01;

    ctx.globalAlpha = this.opacity;
    ctx.font = "bold 40px monospace";

    ctx.fillStyle = "white";
    ctx.fillText("You saved us, Master", 50, 325);

    ctx.globalALpha = 1;
  }
};

drawingLoop();

document.onkeydown = function(event) {
  if (unicorn.isCrashed || score >= 5) {
    return;
  }
  switch (event.keyCode) {
    case 37:
      event.preventDefault();
      unicorn.x -= 10;
      break;
    case 39:
      event.preventDefault();
      unicorn.x += 10;
      break;
  }
};

function drawingLoop() {
  ctx.clearRect(0, 0, 600, 700);
  drawEverything();

  if (unicorn.x + unicorn.width > 600) {
    unicorn.x = 600 - unicorn.width;
  }
  if (unicorn.x < 0) {
    unicorn.x = 0;
  }

  requestAnimationFrame(function() {
    drawingLoop();
  });
}

function drawEverything() {
  ctx.lineWidth = 5;
  ctx.strokeRect(0, 0, 600, 700);

  // score box
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "bold 24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Hoomans killed: " + score, 32, 32);

  unicorn.drawMe();

  allChihuahuas.forEach(function(oneChihuahua) {
    oneChihuahua.drawMe();

    if (rectangleCollision(unicorn, oneChihuahua)) {
      unicorn.isCrashed = true;
      oneChihuahua.isCrashed = true;
    }
  });

  function rectangleCollision(rectA, rectB) {
    return (
      rectA.y + rectA.height >= rectB.y &&
      rectA.y <= rectB.y + rectB.height &&
      rectA.x + rectA.width >= rectB.x &&
      rectA.x <= rectB.x + rectB.width
    );
  }

  allHoomans.forEach(function(oneHooman) {
    oneHooman.drawMe();

    if (!oneHooman.isCrashed && rectangleCollision(unicorn, oneHooman)) {
      unicorn.isCrashed = false;
      oneHooman.isCrashed = true;
      score += 1;
      oneHooman.image = redHoomansImg;
    }

    if (score >= 5) {
      win.drawMe();
    }
  });

  if (unicorn.isCrashed) {
    gameOver.drawMe();
  }
}
