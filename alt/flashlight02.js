let backgr;
let lookHere;
let lights = true;
var coords;
var viewport; 
var x;
var y;
var foundIt;


//Schlanke Funktion zur Ermittlung einer "Range" (s, e = Start, Ende):
r = (s, e) => Array.from('x'.repeat(e - s), (_, i) => s + i);


// Gibt ein Array mit Breite und Höhe zurück. – Funktionsaufruf: viewport = getViewport(); 
const getViewport = () => { 
    var viewArray = [];
    viewWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    viewHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    viewArray.push(viewWidth, viewHeight);
    return viewArray;
}

const getCoords = () => {
    viewport = getViewport();
    var coordArray = [];
    var cX = Math.floor(Math.random() * (viewport[0]-150));
    var cY = Math.floor(Math.random() * (viewport[1]-150));
    var midcX = cX + 75;
    var midcY = cY + 75;
    coordArray.push(cX, cY, midcX, midcY);
    return coordArray;     
}

const showClip = () => {
    coords = getCoords();
    let img = new Image;
        img.src = "1_BPTB_cfrS3HePpDK68iC3A.jpeg";
    const lookHere = document.querySelector('.theclip');
    const context = lookHere.getContext('2d');
        img.onload = () => {
            context.drawImage(img, coords[0], coords[1], 150, 150, 0, 0, 150, 150); //drawImage nimmt x,y-Koordinaten, "clipPath" nimmt "fromTop"- etc-Werte!!! Browser auch top/left!
        }
}

const lightsOff = () => {
    let backgr = document.querySelector('.hero');
    backgr.style.backgroundColor = "black";
    backgr.style.backgroundImage = "none";
} 

const lightsOn = () => {
    let backgr = document.querySelector('.hero');
    backgr.style.backgroundImage = "url("+ waldo.src +")";
    backgr.style.backgroundSize = "cover";
}

function update(e){
    x = e.clientX || e.touches[0].clientX;
    y = e.clientY || e.touches[0].clientY;

    document.documentElement.style.setProperty('--cursorX', x + 'px');
    document.documentElement.style.setProperty('--cursorY', y + 'px'); 

    var panelLeft = document.querySelector('.looky');
    var panelRight = document.querySelector('.instructions');
        panelLeft.style.display = "block";
        panelRight.style.display = "block";
        //panelLeft.style.setProperty("opacity", "1");
        //panelRight.style.setProperty("opacity", "1");

    if(x >= coords[2]-50 && x <= coords[2]+15 && y >= coords[3]-35 && y <= coords[3]+35) { // als while-loop!
        myGradient = document.querySelector('.hero');
        myGradient.style.setProperty("background-color", "rgba(255, 255, 255, 0.10)");
        var winMessage = document.getElementById("youwin");
        winMessage.style.color = "yellow";
        winMessage.innerHTML = "DA! Schau mal genauer...";
        foundIt = true;
        } else {
            roundWon = false;
        }

    while (x <= 175 && y >= 550) {
        panelLeft.style.display = "none"
        //panelLeft.style.setProperty("opacity", "0.2");
        break;
    }

    while (x >= 1100 && y >= 550) {
        panelRight.style.display = "none"
        //panelRight.style.setProperty("opacity", "0.2");
        break;
    }
}

const gotIt = () => {
    var winMessage = document.getElementById("youwin");
    if(foundIt) {    
    winMessage.style.color = "green";
    winMessage.innerHTML = "Gefunden!";
    foundIt = false;
    showClip();
    } else {
        winMessage.style.color = "red";
        winMessage.innerHTML = "Nope.";
    }
}

// To-Do: 
// 1. Main-Schleife --> showClip-Bedingung & Auslösung
// Features für die responsive-Version: Programm ermittelt Grundgesamtauschnitt auf Basis der Client-Darstellungsgröße; Smartphone-Pointer setzt unten rechts am Lichtkegel an.

showClip();

document.addEventListener('mousemove', update);

document.addEventListener('dblclick', gotIt);

//document.addEventListener('dblclick', lightsOff);

//document.addEventListener('click', lightsOn);

document.addEventListener('touchmove', update);

