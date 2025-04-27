const track = new Audio('./snd/Teeth-starred Face.mp3'); // Soundtrack: "Teeth-starred Face" by syntholydian
const sound = new Audio('./snd/hey.mp3');

let filter;
let backgr;
let lookHere;
let lights = true;
let img = new Image; // Optimieren: Evt. im Kopf als const laden, sofern img.onload hier in Funktion verfügbar.
        img.src = "1_BPTB_cfrS3HePpDK68iC3A.jpeg"; 
var bCoords; // Testen: Unterscheidung b/cCoords nicht notwendig, da die Werte gleich bleiben!
var cCoords;
var viewport; 
var x;
var y;
var foundIt;
//var winMessage = document.getElementById("youwin");
var redLight = document.getElementById("redlight");
var yellowLight = document.getElementById("yellowlight");
var greenLight = document.getElementById("greenlight");

//winMessage.innerHTML = "";


// Schlanke Funktion zur Ermittlung einer "Range" (s, e = Start, Ende):
r = (s, e) => Array.from('x'.repeat(e - s), (_, i) => s + i);


// Gibt Array mit Breite und Höhe zurück. – Funktionsaufruf in "getCoords": viewport = getViewport(); 
const getViewport = () => { 
    var viewArray = [];
    viewWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    viewHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    viewArray.push(viewWidth, viewHeight);
    return viewArray;
}

// Gibt Array mit den wichtigsten Werten zurück: Client-Größe (x,y), zwei Zufallskoordinaten (x,y) für den Startpunkt eines Bildausschnits 
// sowie die von dort gemessene Mitte des Bildausschnitts. Funktionsaufruf in "drawBoard": coords = getViewport(); 
const getCoords = () => {
    viewport = getViewport();
    var coordArray = [];
    var randomX = Math.floor(Math.random() * (viewport[0]-(viewport[0]/100*15))); // ...damit der Bildausschnitt nicht über den Bildrand hinausgeht.
    var randomY = Math.floor(Math.random() * (viewport[1]-(viewport[1]/100*15)));
    var midRandomX = randomX + (viewport[0]/100*7.5);
    var midRandomY = randomY + (viewport[1]/100*7.5);
    coordArray.push(viewport[0], viewport[1], randomX, randomY, midRandomX, midRandomY);
    return coordArray;     
}

// Spielfeld zeichnen.
const drawBoard = () => {
    bCoords = getCoords();
    console.log("bCoords: viewportX(0)=", bCoords[0], " viewportY(1)=", bCoords[1], " randomX(2)=", bCoords[2], " randomY(3)=", bCoords[3], " midRandomX(4)=", bCoords[4], " midRandomY(5)=", bCoords[5]); 
        board = document.querySelector('.hero');
        document.getElementsByClassName('hero')[0].setAttribute("width", bCoords[0] + "px"); //canvas braucht die Dimensionsangaben im HTML!
        document.getElementsByClassName('hero')[0].setAttribute("height", bCoords[1] + "px");
        document.getElementsByTagName('body')[0].setAttribute("width", bCoords[0] + "px");
        document.getElementsByTagName('body')[0].setAttribute("height", bCoords[1] + "px");
        bContext = board.getContext('2d');
        img.onload = () => {
            bContext.drawImage(img, 0, 0, bCoords[0], bCoords[1], 0, 0, bCoords[0], bCoords[1]); // drawImage: Bild zurechtzuschneiden. Voraussetzung: canvas-Container im HTML!
        }  
}

// Zufallsausschnitt ermitteln und zeigen.
const showClip = () => {
    cCoords = getCoords();
    console.log("cCoords: viewportX(0)=", cCoords[0], " viewportY(1)=", cCoords[1], " randomX(2)=", cCoords[2], " randomY(3)=", cCoords[3], " midRandomX(4)=", cCoords[4], " midRandomY(5)=", cCoords[5]);
    document.getElementsByClassName('looky')[0].setAttribute("width", (cCoords[1]/100*15) + "px");
    document.getElementsByClassName('looky')[0].setAttribute("height", (cCoords[1]/100*15) + "px");
    let nextImg = new Image;
        nextImg.src = "1_BPTB_cfrS3HePpDK68iC3A.jpeg";      
        lookHere = document.querySelector('.theclip');
        lContext = lookHere.getContext('2d');
        nextImg.onload = () => {                                      // 150                 150
            lContext.drawImage(nextImg, cCoords[2], cCoords[3], (cCoords[1]/100*15), (cCoords[1]/100*15), 0, 0, (cCoords[1]/100*15), (cCoords[1]/100*15));            
        }                                                                         
}

// Ungenutzte Funktionen – Licht an/aus
//const lightsOff = () => {
//    let backgr = document.querySelector('.hero');
//    backgr.style.backgroundColor = "black";
//    backgr.style.backgroundImage = "none";
//} 

//const lightsOn = () => {
//    let backgr = document.querySelector('.hero');
//    backgr.style.backgroundImage = "url("+ waldo.src +")";
//    backgr.style.backgroundSize = "cover";
//}

// Mausbewegung.
function update(e){
    x = e.clientX || e.touches[0].clientX;
    y = e.clientY || e.touches[0].clientY;

    document.documentElement.style.setProperty('--cursorX', x + 'px');
    document.documentElement.style.setProperty('--cursorY', y + 'px'); 

    var panelLeft = document.querySelector('.looky');
    /* var panelRight = document.querySelector('.instructions'); */
    var green = document.getElementById('greenlight');
    var yellow = document.getElementById('yellowlight');
    var red = document.getElementById('redlight');
        panelLeft.style.display = "block";
        /* panelRight.style.display = "block"; */
        green.style.display = "block";
        yellow.style.display = "block";
        red.style.display = "block";
        //winMessage.innerHTML = "";
        foundIt = false;

// Hinweis, dass der richtige Bereich gefunden ist – warten auf Klick --> gotIt-Funktion.
// Megabug gelöst: Darauf achten – bei win-Abfrage cCoords verwenden, weil nach diesen auch der Zufallsausschnitt erstellt wird!
    while(!foundIt) {
        yellowLight.style.setProperty('background-color', 'rgba(66, 66, 0, 0.5)');
        greenLight.style.setProperty('background-color', 'rgba(31, 31, 31, 0.5)');
        break;
    }

// Bedingung definiert den Toleranzbereich beim Suchen des Bildausschnitts --> "Schwierigkeitsgrad".
    while(x >= cCoords[4]-(bCoords[0]/100*4) && x <= cCoords[4]+(bCoords[0]/100*4) && y >= cCoords[5]-(bCoords[1]/100*4) && y <= cCoords[5]+(bCoords[0]/100*4)) {
        yellowLight.style.setProperty('box-shadow:', '0px 0px 16px 1px rgba(255,255,0,1)'); //funzt net
        yellowLight.style.setProperty('background-color', 'yellow');
        playSound();
        //winMessage = document.getElementById("youwin");
        //winMessage.style.color = "yellow";
        //winMessage.innerHTML = "DA! Schau mal genauer...";
        foundIt = true;
        break;
    }

    while (x <= (bCoords[0]/100*5) && y <= bCoords[1]-(bCoords[1]/100*85)) { // Realtive Größen verwenden! Original x,y = 175, 550
        green.style.display = "none"
        yellow.style.display = "none"
        red.style.display = "none"
        break;
    }
    while (x <= (bCoords[0]/100*15) && y >= bCoords[1]-(bCoords[1]/100*20)) { // Realtive Größen verwenden! Original x,y = 175, 550
        panelLeft.style.display = "none"
        break;
    }

  /*   while (x >= (bCoords[0]/100*70) && y >= bCoords[1]-(bCoords[1]/100*20)) { // Realtive Größen verwenden! Original x,y = 1100, 550
        panelRight.style.display = "none"
        break;
    } */
}

// Siegbedingung prüfen.
const gotIt = () => {
    if(foundIt) {    
    greenLight.style.setProperty('background-color', 'green');
    greenLight.style.setProperty('box-shadow:', '0px 0px 16px 1px rgba(0,255,0,1)');
    //winMessage.style.color = "green";
    //winMessage.innerHTML = "Gefunden!";
    foundIt = false;
    showClip();
    //} else {
    //    winMessage.style.color = "red";
    //    winMessage.innerHTML = "Nope.";
    }
}

let playMusic = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    const soundtrack = context.createMediaElementSource(track);
    filter = context.createBiquadFilter();
    let reverb = context.createConvolver();
    soundtrack.connect(filter).connect(context.destination);
    soundtrack.connect(reverb).connect(context.destination);
    filter.type = 'allpass';
    track.volume = 0.8;
    track.loop = true;
    if (track.currentTime == 0){
    track.play();
    }
}

let playSound = () => {
    sound.volume = 0.8;
    sound.play();
}

function enterFullscreen(element) {
    console.log("Fullscreen?")
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
  }
  

// To-Do: 
// 1. Main-Schleife --> showClip-Bedingung & Auslösung
// Features für die responsive-Version: Programm ermittelt Grundgesamtauschnitt auf Basis der Client-Darstellungsgröße; Smartphone-Pointer setzt unten rechts am Lichtkegel an.

document.addEventListener('onpopstate', enterFullscreen); 
drawBoard();
showClip();

const startGame = document.getElementById('startgame');
startGame.addEventListener('click', function() {
    playMusic();
    startGame.style.display = "none";
});

while(!foundIt) {
    document.addEventListener('mousemove', update);
    document.addEventListener('touchmove', update);

    document.addEventListener('resize', drawBoard);
    document.addEventListener('resize', drawBoard);  
    
    document.addEventListener('click', gotIt);
    document.addEventListener('touch', gotIt);
    break;
}

//document.addEventListener('dblclick', lightsOff);
//document.addEventListener('click', lightsOn);