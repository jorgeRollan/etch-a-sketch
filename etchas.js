//numero y tamano de los cuadrados del sketch
const promptNumber = prompt("numero de cuadrados(maximo 100)", "1");
let squareNumber = null;
if (!isNaN(promptNumber) && (promptNumber <= 100)) {
    squareNumber = Number(promptNumber);
}
else squareNumber = 16;
const squareSize = 100;
const gridSize = 960;


//seleccion del div principal del body y pongo un boton de reset
const body = document.querySelector("body");
const button = document.createElement("button");
button.textContent = "reiniciar tablero";
button.addEventListener("click", function () {
    resetTable();
    drawEtch()
})
body.appendChild(button);
drawEtch();
//bucle que crea los items del grid y los coloca
function drawEtch() {

    const gridDiv = document.createElement("gridDiv");
    gridDiv.id = "gridDiv";
    gridDiv.style.display = "grid";
    gridDiv.style.width = gridSize + "px"
    gridDiv.style.height = gridSize + "px"
    gridDiv.style.setProperty('grid-template-columns', 'repeat(' + squareNumber + ', ' + gridSize / squareNumber + 'px)');
    gridDiv.style.setProperty('grid-template-rows', 'repeat(' + squareNumber + ',' + gridSize / squareNumber + 'px)');
    for (let a = 1; a <= squareNumber; a++) {
        for (let b = 1; b <= squareNumber; b++) {

            //propiedades del item nuevo
            const divItem = document.createElement("div");
            divItem.style.gridColumn = a + "/" + (a + 1);
            divItem.style.gridRow = b + "/" + (b + 1);
            divItem.className = "" + a + b;
            divItem.dataset.brightness = 100;
            divItemChange(divItem, false);
            bordersChange(a, b, divItem);
            let trail = [];

            //evento de la entrada para cambiar el  color del cuadrado
            divItem.addEventListener("mouseenter", function (event) {
                divItemChange(this, true);
                this.style.display = "grid";
                const trailItem = document.createElement("div");
                this.style.setProperty('grid-template-columns', 'repeat(' + divItem.clientWidth + ', 1px)');
                this.style.setProperty('grid-template-rows', 'repeat(' + divItem.clientHeight + ', 1px)');
                if (event.offsetX > 0 && event.offsetY > 0) {
                    trailItem.style.gridRow = (event.offsetY) + "/" + (event.offsetY + 1);
                    trailItem.style.gridColumn = (event.offsetX) + "/" + (event.offsetX + 1);
                    trailItem.style.background = "black";
                    trailItem.className = "" + a + b;
                    trail.push(trailItem);
                }
            });

            //evento del movimiento del raton que va mostrando la cola del mouse
            divItem.addEventListener("mousemove", function (event) {
                trail.forEach(element => {
                    this.appendChild(element);
                });
                if (event.offsetX > 0 && event.offsetY > 0) {
                const trailItem = document.createElement("div");
                trailItem.style.gridRow = (event.offsetY) + "/" + (event.offsetY + 1);
                trailItem.style.gridColumn = (event.offsetX) + "/" + (event.offsetX + 1);
                trailItem.style.background = "black";
                trailItem.className = "" + event.offsetX + event.offsetY;
                trail.push(trailItem);
                }
            })

            divItem.addEventListener("mouseleave", function (event) {
                //divItemChange(this, false);
            });
            gridDiv.appendChild(divItem);
        }
        body.appendChild(gridDiv);
    }
}


//funcion para cambiar el color del cuadrado de black a random y viceversa
function divItemChange(divChange, random) {
    if (random) {
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        divChange.style.background = "#" + randomColor;
        let bright=divChange.dataset.brightness;
        if(bright>0){
        divChange.dataset.brightness = bright-10;
        divChange.style.filter = `brightness(${divChange.dataset.brightness}%`;
        }
    }
    else divChange.style.background = "black";
}

function divItemChange2(divChange) {
    divChange.style.background = "red";
}


function bordersChange(a, b, div) {
    if (a == 1) {
        div.style.borderLeft = "solid grey";
    }
    if (a == 16) {
        div.style.borderRight = "solid grey";
    }
    if (b == 1) {
        div.style.borderTop = "solid grey";
    }
    if (b == 16) {
        div.style.borderBottom = "solid grey";
    }
}

function resetTable() {
    let div = document.getElementById("gridDiv");
    div.parentNode.removeChild(div);
}