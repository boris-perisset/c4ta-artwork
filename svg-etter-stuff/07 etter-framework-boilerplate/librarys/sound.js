//SOUND
let audioCtx = new(window.AudioContext || window.webkitAudioContext)();
  
let gainNode1 = audioCtx.createGain();
let gainNode2 = audioCtx.createGain();
let gainNode3 = audioCtx.createGain();

let constantNode = audioCtx.createConstantSource();
constantNode.connect(gainNode1.gain);
constantNode.connect(gainNode2.gain);
constantNode.connect(gainNode3.gain); 
constantNode.start();

gainNode1.connect(audioCtx.destination);
gainNode2.connect(audioCtx.destination);
gainNode3.connect(audioCtx.destination);

let osc1 = audioCtx.createOscillator();
osc1.type = "triangle";
osc1.frequency.value = 391.995435981749294; //G
osc1.connect(gainNode1);
osc1.start();

let osc2 = audioCtx.createOscillator();
osc2.type = "sine";
osc2.frequency.value = 329.627556912869929; //E
osc2.connect(gainNode2);
osc2.start();

let osc3 = audioCtx.createOscillator();
osc3.type = "sine";
osc3.frequency.value = 261.625565300598634; //middle C
osc3.connect(gainNode3);
osc3.start();
