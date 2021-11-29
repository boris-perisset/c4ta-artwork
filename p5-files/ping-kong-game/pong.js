let score1 = 0;
let score2 = 0;

const puck = [];
const gameSet = 5;


let currentGameState = 'start';
if (currentGameState === 'over') {
}

const pad = {
  padHeight: 90,
  paddle02_Y: 0
}


function getRandomXSpeed () {
  let speedX = random(-6, -3);

  if (random() < .5) {
    speedX = random(3, 6);
  }

  return speedX;
}


function getRandomYSpeed () {
  let speedY = random(-6, -1);

  if (random() < .5) {
    speedY = random(1, 6);
  }

  return speedY;
}


/* SOUND VARIABLES
var ping
var Pong
var loose
var win
*/


  /*
  ===============================================================================
  =====================   S E T U P    ==========================================
  ===============================================================================
  */

  /* FUCK SOUND!!!
function preload(){
  ping = loadSound('sound/ping-01.mp3'+);
  pong = loadSound('sound/pong-01.mp3');
  loose = loadSound('sound/pong-loose.mp3');
  win = loadSound('sound/pong-win.mp3');
}
*/


function setup() {
  
  const width = 300;
  const height = 250;

  /*
  getAudioContext().suspend();

  let sounds = new p5.MonoSynth();

  ping.play('A6');
  */

  var canvas = createCanvas(width, height);
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('pong-frame');
  ellipseMode(RADIUS);

  // das Object und Array «Ball» mit seinen Eigenschaften. Ball = Puck und viceversa...

  

  const Ball = {
    xPos: width/2,
    yPos: (height * 0.2) + random(height * 0.6), // irgendwo in den mittleren 60% der höhe
    speedX: random(-6, 6), //entscheidet sich randommässig für eine Geschwindigkeit und Richtung
    speedY: getRandomYSpeed(), //entscheidet sich randommässig für eine Geschwindigkeit und Richtung
    radius: 10
  }

  // erstellt einen Array mit um die currentPosition danach bestimmen zu können.
  puck.push(Ball)
}
  // das Object Paddle 01, damit wir die Paddle Position herausfinden können. Vielleicht...

  /*
  ===============================================================================
  =====================     D R A W      ========================================
  ===============================================================================
  */

function draw () {

  textSize(24);
  fill(0, 255, 67);
  textAlign(CENTER, CENTER);
  textFont('VT323');
  cursor(ARROW);

  /* =====================     GAME START      ====================================== */
  
  if (currentGameState === 'start') {

    background(0);
    fill(0, 255, 67);
    text("Press any key to Play", width/2, height/2);
    
    if (keyIsPressed === true) {
      currentGameState = 'game';
    }

  }


  /* =====================     GAME OVER      ====================================== */

  else if (currentGameState === 'over') {
    frameRate(0.4);
    let result = "Whatever";

    if (score1 === gameSet) {
      result = "You Win";
    }
      
    else if (score2 === gameSet) {
      result = "You Loose";
    }

    textSize(64);
    text(result, width/2, height/2);

    currentGameState = 'again';
    
  } 
  
  /* =====================     PLAY AGAIN      ====================================== */

  else if (currentGameState === 'again') {
    
    frameRate(1);
    background(0);
    fill(0, 255, 67);

    text("Play Again?", width/2, height/2);
    text("Press any key", width/2, (height/2-(-30)));

    score1 = 0;
    score2 = 0;

    frameRate(60);

    if (keyIsPressed === true) {
      currentGameState = 'game';
    }
  }

   /* =====================     GAME PLAY      ====================================== */

  else if (currentGameState === 'game') {

    // Background
    background(0);
    fill (0, 255, 67);
    
    // Texte als Objekte definiert, damit man es evtl später nutzen kann...
    let You = {
      Name: text("You: " + score1, 60,  30)
    }
    
    You.Name;

    let Allan = {
      Name: text("Allan: " + score2, width-80,  30)
    }
    
    Allan.Name;

    //Paddle 01
    rect(10, mouseY, 10, pad.padHeight);

    // Paddle 02
    rect(width-20, pad.paddle02_Y, 10, 90);

    /* =====================     BALL      ====================================== */

    // Ball bewegt sich
    for (let i = 0; i < puck.length; i += 1) {
        
      // Variable mit einzelnem Element aus dem Array Ball
      let currentPos = puck[i];

      //Ball zeichnen (aus dem Array und dem Object Ball sowie der Current Position)
      ellipse(currentPos.xPos, currentPos.yPos, currentPos.radius);
      
      // Ball prallt ab (Bounce)
      if (currentPos.xPos > (width-currentPos.radius) || currentPos.xPos < (0+currentPos.radius)) {
        currentPos.speedX = currentPos.speedX  * -1;
      }

      if (currentPos.yPos > (height-currentPos.radius) || currentPos.yPos < (0+currentPos.radius)) {
        currentPos.speedY = currentPos.speedY * -1;
      }
      // Ball fliegt
      currentPos.xPos += currentPos.speedX;
      currentPos.yPos += currentPos.speedY;



      /* =====================     PADDLES      ====================================== */
      /*
      Paddle 01 Bounce
      Wenn die x Position des Balls kleiner oder = Balkenposition und die y Position zwischen Mauszeiger Y und Mauszeiger Y + Paddle-Höhe dann: Bounce Ball zurück und erhöhe die Geschwindigkeit
      */

      if((currentPos.xPos <= 30) && (currentPos.yPos >= mouseY && currentPos.yPos <= (mouseY + pad.padHeight))) {
        currentPos.speedX = currentPos.speedX  * -1;
        currentPos.speedX += 0.75;
        //ping.play();

      }

      // Paddle 02 Bounce
      if((currentPos.xPos >= width-30) && (currentPos.yPos >= pad.paddle02_Y && currentPos.yPos <= (pad.paddle02_Y + pad.padHeight))) {
        currentPos.speedX = currentPos.speedX  * -1;
        currentPos.speedX += -0.75;
        //pong.play();

      }

      /* =====================     SCORE 1UP      ====================================== */

      // Score zählt hoch und runter (Die 10 zählt ist der Radius des Balles, damits funktioniert.)
      // Ball wird in die Mitte zurück gesetzt und zufällig in eine neue Richtung geschickt.
      if (currentPos.xPos <= 10) {
        score2 += 1;
        currentPos.xPos = width/2;
        currentPos.speedX = getRandomXSpeed();
        currentPos.speedY = getRandomYSpeed();
      }

      //console.log ("Speed X:", currentPos.speedX);

      if (currentPos.xPos >= width-10) {
        score1 += 1;
        currentPos.xPos = width/2;
        currentPos.speedX = getRandomXSpeed();
        currentPos.speedY = getRandomYSpeed();
      }

      /* =====================     PADDLE 2 - ENEMY      ====================================== */

      //Allan Alcorn inventor of Pong

      pad.paddle02_Y = currentPos.yPos;

      if (currentPos.xPos > 560) {
        let zufall = random(-3,4)
        pad.paddle02_Y = currentPos.yPos + zufall;
      }


      /* =====================     GAME OVER ?      ====================================== */

      // Game Over > hast du gewonnen oder verloren?
      if ( score1 === gameSet || score2 === gameSet) {
        currentGameState = 'over';
      }

    }

  }
  
}