"use strict"

const GRID_MIN = 10;
const GRID_MAX = 64;
const SLIDER_STEP = 1;
let gridArray = [];
let colorMode = "color";

const colorButton = document.querySelector("#colorBtn");
const rainbowButton = document.querySelector("#rainbowBtn");
const eraserButton = document.querySelector("#eraserBtn");
const clearButton = document.querySelector("#clearBtn"); 
const gridSlider = document.querySelector("#slider input[type=range]");
const grid = document.querySelector(".grid");

grid.addEventListener("mouseover", setMouseOver);
grid.addEventListener("mouseover", setDrawValue);
grid.addEventListener("mousedown", setMouseDown);

colorButton.addEventListener("click", setColorMode);
rainbowButton.addEventListener("click", setColorMode);
eraserButton.addEventListener("click", setColorMode);

clearButton.addEventListener("click", () => {
   for(let item of gridArray){
      item.style.backgroundColor = "white";
      colorMode = "color"
   }
});

gridSlider.addEventListener("click",() => {
   createGrid();
   colorGrid();
});
gridSlider.addEventListener("mousemove", updateSliderDisplay)



function setMouseOver() {
   return true;
}

function setMouseDown() {
   return true;
}

function setDrawValue() {
   if(setMouseDown() && setMouseOver()) {
      
   }
}



function colorGrid() {
   if(canDraw()) {
      for(let item of gridArray) {
         item.addEventListener("mouseover", setGridColor);
      }
   }
   
}

function setGridColor(event){
   switch(colorMode){
      case "color": {
            let colorValue = document.querySelector("#color-pick").value;
            event.target.style.backgroundColor = colorValue;
         }
         break;
      case "rainbow": {
            let red = Math.floor(Math.random() * 256);
            let green = Math.floor(Math.random() * 256);
            let blue = Math.floor(Math.random() * 256);
            event.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
         }
         break;
      
      case "eraser": {
            event.target.style.backgroundColor = "white";
         }
         break;
   }
}

function setColorMode() {
   switch(this.getAttribute("id")){
      case "colorBtn":
         colorMode = "color";
         break;
      case "rainbowBtn":
         colorMode = "rainbow";
         break;
      case "eraserBtn":
         colorMode = "eraser";
         break;
   }
}

function updateSliderDisplay() {
   let sizeDisplay = document.querySelector("#slider span");
   sizeDisplay.textContent = `${gridSlider.value}x${gridSlider.value}`;
}

function createGrid() {
   gridArray = [];
   let cells = gridSlider.value;
   for(let i = 0; i < cells**2; i++) {
      let temp = document.createElement("div");
      gridArray.push(temp);
   }

   grid.innerHTML = "";

   let gridWidth = grid.clientWidth;
   let gridHeight = grid.clientHeight;

   grid.style.gridTemplateColumns = `repeat(${cells}, ${(gridWidth/cells).toFixed(2)}px)`;
   grid.style.gridAutoRows = `${(gridHeight/cells).toFixed(2)}px`;

   for(let item of gridArray) {
      grid.append(item);
   }

   //also update the grid size displayed

}

function setGridData(){
   gridSlider.min = GRID_MIN;
   gridSlider.max = GRID_MAX
   gridSlider.step = SLIDER_STEP;
}

function start() {
   setGridData();
   createGrid();
   colorGrid();
}

start();