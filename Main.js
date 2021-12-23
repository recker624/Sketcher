"use strict"

function takeInput(){
   let validInput = false;
   while(!validInput) {
      let cells = +prompt("Enter the number of cells");
      if(cells < 4){
         alert("Minimum number of cells is 4. Enter a higher value.")
      } 
      else if(cells > 50) {
         alert("Maximum allowed cell limit is 50. Enter a lower value.");
      }
      else {
         validInput = true;
         createGrid(cells);
      }
   }
}

function createGrid(cells) {
   let gridArray = [];
   for(let i = 0; i < cells**2; i++) {
      let temp = document.createElement("div");
      temp.classList.add("gridItem");
      gridArray.push(temp);
   }

   let container = document.querySelector(".container");

   let containerWidth = container.clientWidth;
   let containerHeight = container.clientHeight;

   container.style.gridTemplateColumns = `repeat(${cells}, ${(containerWidth/cells).toFixed(2)}px)`;
   container.style.gridAutoRows = `${(containerHeight/cells).toFixed(2)}px`;

   for(let item of gridArray) {
      container.append(item);
   }
}



takeInput();