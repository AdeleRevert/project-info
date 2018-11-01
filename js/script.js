// create a chihuahuas class
class Chihuahuas {
  constructor(chihuahuasX, chihuahuasY, chihuahuasWidth, chihuahuasHeight) {
    this.x = chihuahuasX;
    this.y = chihuahuasY;
    this.width = chihuahuasWidth;
    this.height = chihuahuasHeight;
    this.isCrashed = false;
    this.image = chihuahuasImg;
  }

  drawMe() {
    if (!unicorn.isCrashed && !(score >= 15)) {
      this.y += 2;
      if (this.y > 700) {
        this.y = 0;
        this.image = chihuahuasImg;
      }
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
    if (!unicorn.isCrashed && !(score >= 15)) {
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

var bwChihuahuasImg = new Image();
bwChihuahuasImg.src = "./images/CHIHUAHUA-ETOILES-b&w.png"

var hoomansImg = new Image();
hoomansImg.src = "./images/trump.png";

var deadTrumpImg = new Image();
deadTrumpImg.src = "./images/dead-trump.png";

var deadBorsoImg = new Image();
deadBorsoImg.src = "./images/dead-borso.png";

var deadPoutineImg = new Image();
deadPoutineImg.src = "./images/dead-poutine.png";

var deadWeinsteinImg = new Image();
deadWeinsteinImg.src = "./images/dead-weinstein.png";

var badBoy;

var jingle = new Audio("./sounds/chihuahua-jingle.mp3");

var display = document.querySelector(".choose-face")

var score = 0;

var faces = document.getElementsByClassName("oneface");

var letMeHelpBtn = document.querySelector(".let-me-help");
// display pas none

var startBtn = document.querySelector(".startBtn");
// remette écran start en display none 

letMeHelpBtn.onclick = function() {
  console.log(display);
  display.style.display = 'flex';
}

startBtn.onclick = function (){
  drawingLoop();
  display.style.display = 'none';
};

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

// Select a face 
for( var i = 0; i < faces.length; i++ ) {
  faces[i].onclick = function() {
    for( var j = 0; j < faces.length; j++ ){
      faces[j].classList.remove("selected");
  };
    hoomansImg.src = this.querySelector("img").src;
    this.classList.add("selected");
    badBoy = this.firstChild.getAttribute("name");
    console.log(badBoy)
  }
};




var gameOver = {
  opacity: 0,
  drawMe: function() {
    this.opacity += 0.01;

    ctx.globalAlpha = this.opacity;
    ctx.font = "bold 40px monospace";

    ctx.fillStyle = "white";
    ctx.fillText("Game Over,", 185, 295);

    ctx.globalAlpha = this.opacity;
    ctx.font = "bold 32px monospace";

    ctx.fillStyle = "white";
    ctx.fillText("you killed one Divine Animal", 30, 370);

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
    ctx.fillText("You saved us, Master", 50, 315);

    ctx.globalALpha = 1;
  }
};


document.onkeydown = function(event) {
  if (unicorn.isCrashed || score >= 15) {
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
  ctx.strokeStyle= "#302b3e";
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
      oneChihuahua.image = bwChihuahuasImg;
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
      if(badBoy === "trump"){
        oneHooman.image = deadTrumpImg;
      }
      if(badBoy === "borso"){
        oneHooman.image = deadBorsoImg;
      }
      if(badBoy === "weinstein"){
        oneHooman.image = deadWeinsteinImg;
      }
      if(badBoy === "poutine"){
        oneHooman.image = deadPoutineImg;
      }
      
    }

    if (score >= 15) {
      win.drawMe();
      jingle.play();
    }
  });

  if (unicorn.isCrashed) {
    gameOver.drawMe();
  }
}







// Glitter Mouse Pointer Effect (for fun) HT: http://hapiblogging.blogspot.com/2009/06/how-to-add-glitter-effect-mouse-pointer.html

var colour="#D9E9F7";
var sparkles=40;

var x=ox=400;
var y=oy=300;
var swide=800;
var shigh=600;
var sleft=sdown=0;
var tiny=new Array();
var star=new Array();
var starv=new Array();
var starx=new Array();
var stary=new Array();
var tinyx=new Array();
var tinyy=new Array();
var tinyv=new Array();
window.onload=function() { if (document.getElementById) {
var i, rats, rlef, rdow;
for (var i=0; i<sparkles; i++) {
var rats=createDiv(3, 3);
rats.style.visibility="hidden";
document.body.appendChild(tiny[i]=rats);
starv[i]=0;
tinyv[i]=0;
var rats=createDiv(5, 5);
rats.style.backgroundColor="transparent";
rats.style.visibility="hidden";
var rlef=createDiv(1, 5);
var rdow=createDiv(5, 1);
rats.appendChild(rlef);
rats.appendChild(rdow);
rlef.style.top="2px";
rlef.style.left="0px";
rdow.style.top="0px";
rdow.style.left="2px";
document.body.appendChild(star[i]=rats);
}
set_width();
sparkle();
}}
function sparkle() {
var c;
if (x!=ox || y!=oy) {
ox=x;
oy=y;
for (c=0; c<sparkles; c++) if (!starv[c]) {
star[c].style.left=(starx[c]=x)+"px";
star[c].style.top=(stary[c]=y)+"px";
star[c].style.clip="rect(0px, 5px, 5px, 0px)";
star[c].style.visibility="visible";
starv[c]=50;
break;
}
}
for (c=0; c<sparkles; c++) {
if (starv[c]) update_star(c);
if (tinyv[c]) update_tiny(c);
}
setTimeout("sparkle()", 40);
}
function update_star(i) {
if (--starv[i]==25) star[i].style.clip="rect(1px, 4px, 4px, 1px)";
if (starv[i]) {
stary[i]+=1+Math.random()*3;
if (stary[i]<shigh+sdown) {
star[i].style.top=stary[i]+"px";
starx[i]+=(i%5-2)/5;
star[i].style.left=starx[i]+"px";
}
else {
star[i].style.visibility="hidden";
starv[i]=0;
return;
}
}
else {
tinyv[i]=50;
tiny[i].style.top=(tinyy[i]=stary[i])+"px";
tiny[i].style.left=(tinyx[i]=starx[i])+"px";
tiny[i].style.width="2px";
tiny[i].style.height="2px";
star[i].style.visibility="hidden";
tiny[i].style.visibility="visible"
}
}
function update_tiny(i) {
if (--tinyv[i]==25) {
tiny[i].style.width="1px";
tiny[i].style.height="1px";
}
if (tinyv[i]) {
tinyy[i]+=1+Math.random()*3;
if (tinyy[i]<shigh+sdown) {
tiny[i].style.top=tinyy[i]+"px";
tinyx[i]+=(i%5-2)/5;
tiny[i].style.left=tinyx[i]+"px";
}
else {
tiny[i].style.visibility="hidden";
tinyv[i]=0;
return;
}
}
else tiny[i].style.visibility="hidden";
}
document.onmousemove=mouse;
function mouse(e) {
set_scroll();
y=(e)?e.pageY:event.y+sdown;
x=(e)?e.pageX:event.x+sleft;
}
function set_scroll() {
if (typeof(self.pageYOffset)=="number") {
sdown=self.pageYOffset;
sleft=self.pageXOffset;
}
else if (document.body.scrollTop || document.body.scrollLeft) {
sdown=document.body.scrollTop;
sleft=document.body.scrollLeft;
}
else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
sleft=document.documentElement.scrollLeft;
sdown=document.documentElement.scrollTop;
}
else {
sdown=0;
sleft=0;
}
}
window.onresize=set_width;
function set_width() {
if (typeof(self.innerWidth)=="number") {
swide=self.innerWidth;
shigh=self.innerHeight;
}
else if (document.documentElement && document.documentElement.clientWidth) {
swide=document.documentElement.clientWidth;
shigh=document.documentElement.clientHeight;
}
else if (document.body.clientWidth) {
swide=document.body.clientWidth;
shigh=document.body.clientHeight;
}
}
function createDiv(height, width) {
var div=document.createElement("div");
div.style.position="absolute";
div.style.height=height+"px";
div.style.width=width+"px";
div.style.overflow="hidden";
div.style.backgroundColor=colour;
return (div);
}