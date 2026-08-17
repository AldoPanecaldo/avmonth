const DEBUG = false;
const START_STEP = 0;
const fulltext = `
[18 Luglio 2026 - 18 Agosto 2026 -> A+V]{startDiv} A❤️V
[]
Oggi è un mese
>Un mese che stiamo insieme
>31 giorni dal 18 Luglio 2026
[emoji del cuore mostrata] Una data simbolica
>[emoji del cuore si gira e mostra un culo] Sappiamo entrambi perché l'abbiamo scelta
Per un paio di ragioni
>["analizzare" in grassetto] Ma non le voglio <span class="emphasize">analizzare</span> ora
Ora vorrei spiegarti perché stai vedendo tutto questo
[]
Perché volevo fare qualcosa<br/>per te in questo giorno
> Qualcosa di non ordinario,<br/>di non banale, di particolare
>Magari qualcosa di speciale?
Perché in parte questo<br/>è un giorno speciale
>E perché tu per me sei speciale
[Foto del regalo misterioso] Ti ho anche fatto un regalino per l'occasione, qualcosa di fisico
>[Foto del regalo misterioso ancora] Ma quello posso dartelo solo quando ci rivediamo
[foto distanza] Il problema ora è che siamo a qualche chilometro di distanza
>E volevo comunque fare<br/>qualcosa per te oggi stesso
Avevo poche opzioni disponibili
>E poco tempo
>Quindi ho dovuto improvvisare 
Ti ho fatto questa cavolata
>Questa cosa che stai vedendo ora
Una cosa così,<br/>per farti sorridere un po'
>[foto di A mentre sorride] Perché mi piaci tanto<br/>quando sorridi
E anche se non ti posso vedere sorridere ora
> Mi piace pensare tu lo stia facendo
Mi piace immaginarti<br/>sorridere proprio ora
> Mi piace l'idea che ti vedrò sorridere tra qualche giorno
> E che ti vedrò sorridere in futuro, spero molto spesso
Mi piace l'idea che sarò io a farti sorridere
A renderti felice
[Animazione con testo dopo] Spero sempre
#[Animazione da testo prima] Spero per sempre
#[Animazione da testo prima]<span class="emphasize">Spero sia per sempre</span> 
[]
Ora siamo entrambi in viaggio
>Anche se per puro caso<br/>nella stessa nazione
Ed è vero che è un mese che<br/>stiamo ufficialmente insieme
>E che è qualche mese che<br/>stiamo veramente insieme
Ma non siamo in viaggio insieme
[Foto filippine] Lo saremo tra circa 4 mesi
>[Foto filippine] E non vedo l'ora, davvero
[Foto ischia sulla mappa?] Abbiamo già fatto<br/>un viaggetto insieme 
>[Foto io ed A ad ischia nella mappa] Ed è stato bellissimo
>[Foto filippine sulla mappa?] Per questo non vedo<br/>l'ora del prossimo
>[Zoom out dalle filippine sulla mappa] E di tutti quelli che faremo poi
[Foto con tutti i posti] Guarda quanti
[Foto con tutti i posti] No seriamente so tanti oh
[Foto con tutti i posti] Regolamoce
[Foto con tutti i posti] Però voglio farli comunque tutti
@[Foto con tutti i posti] Perché se tutto va come vorrei
@[Foto con tutti i posti] E se anche tu lo vorrai
@[Foto con tutti i posti] Avremo molto tempo per farli
[]
Dal 18 Luglio sono passati<br/>31 giorni
>Giorni in cui hai pensato molto
>E in cui ho pensato molto anch'io
>Al centro dei miei pensieri<br/>c'eri sempre tu
[]
E forse non ti rendi conto
>Forse non lo sai
>Forse non te l'ho ancora saputo spiegare al meglio
>O forse non te l'ho mai spiegato,<br/>non te l'ho mai detto
[]
Ma vorrei sapessi alcune cose
>Cose importanti
>Quindi toglierò le foto
>Così non ti distrarranno<br/>da quello che sto per dirti
[]
Sappi che con te sto benissimo
>Sempre e da sempre
>Ma non è solo questo
>E' <span class="emphasize">molto</span> di più
[]
Sappi che qualunque cosa succeda
>Io farò di tutto per te
>Farò di tutto per esserci sempre
>E so che tu ci sarai sempre per me
[]
Sappi che se vuoi puoi dirmi tutto, senza paura
>E se fraintenderò ti chiederò di spiegarti meglio
>Io so che posso dirti tutto, senza paura
>E se mi fraintenderai cercherò di spiegarti meglio
Scusami se a volte<br/>non ti dico tutto
>Solo perché ho paura di non riuscire ad esprimermi al meglio
>Ma vorrei dirti sempre di più
>E cercherò di dirti sempre di più
[]
Sappi che voglio continuare<br/>a stare con te
>Voglio continuare<br/>ad impegnarmi per te
>Voglio continuare<br/>a coltivare tutto questo
>Continuare a costruirlo,<br/>a curarlo, ad approfondirlo
>Non voglio smettere
E voglio farlo<br/>pensando al futuro
>A noi
>Voglio farlo realizzando<br/>il futuro che entrambi vorremmo
>Senza ansie o paure
{bigDiv}Insieme
[]
[18 Luglio 2026 - 18 Agosto 2026 -> A+V]{endDiv} A❤️V
`;
const NO_IMAGE_SLIDES = [
    30, 31, 32, 33, 34, 35
];
const MAX_IMAGES = 37;
var divElements = [];
var lastStepTime;
var currentStep = START_STEP;
// Main function
function mainFunction() {
    let mainContainer = document.getElementById('main');
    let lines = getLines(fulltext.trim());
    console.log(JSON.stringify(lines, null, 2));
    // Create divs
    for (let i = 0; i < lines.length; i++) {
        let lineObj = lines[i];
        let line = lineObj["line"];
        if (line.trim() == '') {
            continue;
        }
        let className = lineObj["className"];
        let continueDiv = lineObj["continue"];
        let special = lineObj["special"];
        let containerDiv;
        if (continueDiv && divElements.length > 0) {
            containerDiv = divElements[divElements.length-1];
        } else {
            containerDiv = document.createElement("div");
            containerDiv.style = "display: none";
            containerDiv.classList.add("container");
            mainContainer.append(containerDiv);
            divElements[divElements.length] = containerDiv;
        }
        let continueId = 0;
        if (continueDiv) {
            let children = containerDiv.children.length;
            continueId = children;
        }
        let divElem = createElement(line, continueDiv, continueId, className, special);
        containerDiv.append(divElem);
    }
    console.log(divElements);
    // Make each div invisible at start (and appear on click)
    function stepForward() {
        let done = showStep(currentStep+1);
        if (done) {
            currentStep += 1;
            if (currentStep >= divElements.length) {
                currentStep = divElements.length - 1;
            }
        }
    }
    let mainClickArea = document.getElementById("forward");
    mainClickArea.addEventListener("click", () => {
        stepForward();
    });
    if (DEBUG) {
        document.addEventListener('keydown', e => {
            if (e.keyCode == 32) {
                stepForward();
            }
        });
    }
    showStep(currentStep);
    // Listener to "#back" button
    let backButton = document.getElementById("back");
    backButton.addEventListener("click", () => {
        let done = showStep(currentStep-1);
        if (done) {
            currentStep -= 1;
            if (currentStep < 0) {
                currentStep = 0;
            }
        }
    });
    // Load images 
    let imageContainer = document.querySelector("#imagesContainer");
    for (let i = 2; i <= MAX_IMAGES; i++) {
        let imageElem = document.createElement("img");
        let extension = ".jpg";
        let styleClass = "simpleImage";
         let subContainer = document.createElement("div");
        subContainer.classList.add("imageElement");
        subContainer.classList.add("hideImg");
        if (!NO_IMAGE_SLIDES.includes(i)) { 
            if (i == 4) {
                extension = ".png";
                styleClass = "imageFull";
            } else if (i == 23 || i == 24 || i == 25) {
                extension = ".png";
            }
            imageElem.src = "/images/" + i + extension;
            imageElem.classList.add(styleClass);
            let imageSubElement = document.createElement("img");
            imageSubElement.src = imageElem.src;
            imageSubElement.style = imageElem.style;
            imageSubElement.classList = imageElem.classList;
            imageSubElement.classList.add("subImage")
             subContainer.append(imageElem);
            subContainer.append(imageSubElement);   
        } else {
            subContainer.classList.add("gradient-bg-" + i)
        }
        imageContainer.append(subContainer);
    }
}
function createElement(text, isContinue, continueId, className, special) {
    let divElem = document.createElement("div");
    divElem.innerHTML = text;
    divElem.classList.add("divElem")
    divElem.classList.add(className);
    // let delay = continueId * 0.2;
    // divElem.style.animation = "fadeIn 0.5s " + delay + "s forwards";
    if (isContinue) {
        divElem.classList.add("continueDiv");
    }
    divElem.classList.add("hidden");
    if (special == "#") {
        // Special group "#"
        
    }
    return divElem;
}
function isSpecialLine(l) {
    return l.startsWith("#") || l.startsWith("@") || l.startsWith("+");
}
function getLines(text) {
    let lines = text.split('\n');
    lines = lines.map(line => {
        let actualLine = line.trim();
        let continueLine = line.startsWith(">") || isSpecialLine(actualLine);
        let specialLine = isSpecialLine(actualLine);
        let className = "normalDiv";
        if (actualLine.startsWith(">") || specialLine) {
            actualLine = actualLine.substring(1).trim();
        }
        let finalObj = {
            "line": actualLine,
            "continue": continueLine,
            "className": className,
            "special": ""
        };
        if (actualLine.length === 0) {
            finalObj["line"] = "";
            return finalObj;
        }
        if (actualLine.startsWith('[') && actualLine.endsWith(']')) {
            finalObj["line"] = "";
            return finalObj;
        }
        if (actualLine.startsWith('[') && actualLine.includes(']')) {
            actualLine = actualLine.substring(actualLine.indexOf(']') + 1).trim();
        }
        if (actualLine.includes('{') && actualLine.includes('}')) {
            className = actualLine.substring(actualLine.indexOf('{') + 1, actualLine.indexOf('}')).trim();
            actualLine = actualLine.substring(actualLine.indexOf('}') + 1).trim();
        }
        finalObj["line"] = actualLine;
        finalObj["continue"] = continueLine;
        finalObj["className"] = className;
        if (isSpecialLine) {
            finalObj["special"] = line.at(0);
        } else {
            finalObj["special"] = "";
        }
        return finalObj;
    }).filter(line => line["line"].length > 0);
    return lines;
}
function showStep(step) {
    let lastShownStepTime = Date.now();
    if (lastShownStepTime - lastStepTime < 350 && !DEBUG) {
        return false;
    }
    let actualStep = step;
    if (actualStep >= divElements.length || actualStep < 0) {
        return false;
    }
    lastStepTime = lastShownStepTime;
    let retValue = true;
    let isForward = actualStep > currentStep;
    let containerDiv = divElements[actualStep];
    let wasHidden = containerDiv.style == undefined || containerDiv.style.display == "none";
    containerDiv.style = "display: block";
    const hiddenNodes = Array.from(containerDiv.children).filter(n => n.classList.contains("hidden"));
    if (isForward) {
        // Show sub-nodes one by one at each new step
        if (hiddenNodes.length > 0) {
            setTimeout(() => {
                let n = hiddenNodes[0];
                n.classList.remove("hidden");
                n.classList.add("shown");
            }, 50);
            if (hiddenNodes.length > 1) {
                retValue = false;
            }
        }
    } else {
        const childNodes = Array.from(containerDiv.children);
        for (let i = 0; i < childNodes.length; i++) {
            let n = childNodes[i];
            n.classList.remove("hidden");
            n.classList.add("shown");
        }
    }
    // Hide previous and next divs
    for (let i = 0; i < divElements.length; i++) {
        if (i != actualStep) {
            let div = divElements[i];
            div.style = "display: none";
            let childNodes = Array.from(div.children);
            for (let j = 0; j < childNodes.length; j++) {
                let n = childNodes[j];
                n.classList.remove("shown");
                n.classList.add("hidden");
            }
        }
    }
    // If debug is on, show the step
    if (DEBUG) {
        let stepText = document.getElementById("step");
        let totalSteps = divElements.length;
        stepText.innerText = (actualStep+1) + " / " + totalSteps;
    }
    let hideImage = 
        (actualStep + 1 == 17 && hiddenNodes.length <= 1) ||
        (actualStep + 1 == 29 && hiddenNodes.length <= 2);
    let rotate = false;
    if (actualStep + 1 == 4 && hiddenNodes.length <= 1) {
        rotate = true;
    }
    setImage(actualStep, hideImage, rotate);
    // If last step, hide the "back" button
    let backButton = document.getElementById("back");
    if (actualStep == divElements.length - 1) {
        backButton.style = "display: none";
    }
    return retValue;
}
function setImage(step, hideImage, rotate) {
    let imageContainer = document.getElementById("imagesContainer");
    for (let i = 0; i < imageContainer.children.length; i++) {
        let elem = imageContainer.children[i];
        if (i == step - 1 && !hideImage) {
            elem.classList.add("showImg");
            elem.classList.remove("hideImg");
        } else {
            elem.classList.remove("showImg");
            elem.classList.add("hideImg");
        }
        let childImages = elem.querySelectorAll("img");
        if (rotate) {
            for (let j = 0; j < childImages.length; j++) {
                childImages[j].classList.add("rotate");
            }
        } else {
            for (let j = 0; j < childImages.length; j++) {
                childImages[j].classList.remove("rotate");
            }
        }
    }
}
document.addEventListener('DOMContentLoaded', mainFunction);