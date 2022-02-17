const gridDiv = document.querySelector(".gridDiv");
gridDiv.style.setProperty('grid-template-columns', 'repeat(' + 16 + ', 100px)');
gridDiv.style.setProperty('grid-template-rows', 'repeat(' + 16+ ', 100px)');


for (let a = 1; a <=16; a++) {
    for (let b = 1; b<=16; b++) {
        const divItem = document.createElement("div");
        divItem.style.gridColumn = a + "/"+(a+1);
        divItem.style.gridRow = b+ "/"+(b+1);
        divItem.className = "" + a + b;
        divItem.style.background="black";
        bordersChange(a,b, divItem);
        let trail=[];
        divItem.addEventListener("mouseenter", function(event){
            divItemChange(this);
            console.log(event);
            this.style.display="grid";
            const trailItem=document.createElement("div")
            this.style.setProperty('grid-template-columns', 'repeat(' + 100 + ', 1px)');
            this.style.setProperty('grid-template-rows', 'repeat(' + 100 + ', 1px)');
            trailItem.style.gridRow = (event.offsetY) + "/"+(event.offsetY+1);
            trailItem.style.gridColumn = (event.offsetX) + "/"+(event.offsetX+1);
            trailItem.style.background="black";
            trailItem.className = "" + a + b;
            trail.push(trailItem);
            console.log(this)
        });
        divItem.addEventListener("mousemove",function(event){
            trail.forEach(element => {
                this.appendChild(element);
            });
            const trailItem=document.createElement("div");
            trailItem.style.gridRow = (event.offsetY) + "/"+(event.offsetY+1);
            trailItem.style.gridColumn = (event.offsetX) + "/"+(event.offsetX+1);
            trailItem.style.background="black";
            trailItem.className = "" + a + b;
            trail.push(trailItem);
            console.log(this)
       })
       gridDiv.appendChild(divItem);
    }
}

function divItemChange(divChange){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    divChange.style.background="#" + randomColor;
    //
}

function divItemChange2(divChange){
    divChange.style.background="red";
}


function bordersChange(a, b, div){
    if (a==1){
        div.style.borderLeft="solid grey";
    }
    if(a==16){ 
        div.style.borderRight="solid grey";
    }
    if (b==1){
        div.style.borderTop="solid grey";
    }
    if(b==16){ 
        div.style.borderBottom="solid grey";
    }
}