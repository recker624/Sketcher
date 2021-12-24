"use strict"

const GRID_MIN = 40;
const GRID_MAX = 100;
let gridArray = [];

function start() {
   let input = userInput();
   if(userInput == null){
      return;
   }
   createGrid(input);
   colorGrid(gridArray);
   clearButton();
}

function userInput(){
   while(true) {
      let cells = prompt("Enter the number of cells");
      if(cells == null) {
         return null;
      }
      if(+cells < GRID_MIN){
         alert(`Minimum number of cells is ${GRID_MIN}. Enter a higher value.`)
      } 
      else if(+cells > GRID_MAX) {
         alert(`Maximum allowed cell limit is ${GRID_MAX}. Enter a lower value.`);
      }
      else {
         return +cells;
      }
   }
}

function createGrid(cells) {
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

function colorGrid(gridArray) {
   for(let item of gridArray) {
      item.addEventListener("mouseover", (event) => {
         event.target.classList.add("changeBg");
      }, {once: true});
   }
}

function clearButton() {
   let clearButton = document.querySelector(".clearBtn button");
   clearButton.addEventListener("click", () => location.reload());
}

start();