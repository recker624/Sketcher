"use strict"

// import html2canvas from 'html2canvas';

const GRID_MIN = 10;
const GRID_MAX = 64;
const SLIDER_STEP = 1;
let gridArray = [];
let colorMode = "color";
let mouseOver = false;
let mousePressed = false;
let showGrid = true;

const colorButton = document.querySelector("#colorBtn");
const rainbowButton = document.querySelector("#rainbowBtn");
const eraserButton = document.querySelector("#eraserBtn");
const clearButton = document.querySelector("#clearBtn"); 
const toogleGridButton = document.querySelector("#toogleGridBtn");
const downloadButton = document.querySelector("#downloadBtn");
const gridSlider = document.querySelector("#slider input[type=range]");
const grid = document.querySelector("#grid");


function updateSliderDisplay() {
   let sizeDisplay = document.querySelector("#slider span");
   sizeDisplay.textContent = `${gridSlider.value}x${gridSlider.value}`;
}

function colorGrid() {
   for(let item of gridArray) {
      item.addEventListener("mouseover", setGridColor);
   }
}

function setGridColor(event){
   switch(colorMode){
      case "color": {
            let colorValue = document.querySelector("#color-pick").value;
            if(mouseOver == true && mousePressed == true)
               event.target.style.backgroundColor = colorValue;
         }
         break;
      case "rainbow": {
            let red = Math.floor(Math.random() * 256);
            let green = Math.floor(Math.random() * 256);
            let blue = Math.floor(Math.random() * 256);
            if(mouseOver == true && mousePressed == true)
               event.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
         }
         break;
      
      case "eraser": {
            if(mouseOver == true && mousePressed == true)
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

function setButtonColor(){
   this.classList.add("active")
   this.classList.remove("inactive")

   switch(this.getAttribute("id")) {
      case "colorBtn":
         rainbowButton.classList.remove("active");
         rainbowButton.classList.add("inactive");
         eraserButton.classList.add("inactive");
         eraserButton.classList.remove("active");
         break;

      case "rainbowBtn":
         colorButton.classList.remove("active");
         colorButton.classList.add("inactive");
         eraserButton.classList.remove("active");
         eraserButton.classList.add("inactive");
         break;

      case "eraserBtn":
         rainbowButton.classList.remove("active");
         rainbowButton.classList.add("inactive");
         colorButton.classList.remove("active");
         colorButton.classList.add("inactive");
         break;
   }
}

function createGrid() {
   gridArray = [];
   let cells = gridSlider.value;
   for(let i = 0; i < cells**2; i++) {
      let temp = document.createElement("div");
      temp.classList.add("grid-item")
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
}

function setGridSliderData(){
   gridSlider.min = GRID_MIN;
   gridSlider.max = GRID_MAX
   gridSlider.step = SLIDER_STEP;
}

// function downloadSketch() {
//    html2canvas(document.getElementById("grid")).then(function (canvas) {
//       var anchorTag = document.createElement("a");
//       anchorTag.download = prompt("Enter filename: ","My Sketch") + ".png";
//       anchorTag.href = canvas.toDataURL();
//       anchorTag.target = '_blank';
//       anchorTag.click();
//    });
// }

function downloadSketch() {
   html2canvas(grid.then(function (canvas){
      let downloadLink = document.createElement('a');
      if (typeof downloadLink.download !== 'string') {
         window.open(canvas.toDataURL());
      }
      else {
         document.body.appendChild(link);
         downloadLink.href = canvas.toDataURL("image/png");
         let fileName = prompt("Enter sketch name: ");
         downloadLink.download = fileName;
         downloadLink.click();
      }
   }));
}

function start() {
   setGridSliderData();
   createGrid();
   colorGrid();

   grid.addEventListener("mouseenter", () => { mouseOver = true; });
   grid.addEventListener("mouseleave", () => { mouseOver = false; });
   //mouseup event should be registered on the entire document because if we register it to grid and 
   //if we hold left Mouse button and take cursor outside grid, mousePressed would still be true but if we release it 
   //then it won't be called as mouseup would not registered outside the grid, it's registered inside the grid.
   // That's why we call it on the entire document.
   document.addEventListener("mousedown", () => {mousePressed = true;});
   document.addEventListener("mouseup", () => {mousePressed = false;});


   colorButton.addEventListener("click", setColorMode);
   colorButton.addEventListener("click", setButtonColor);
   rainbowButton.addEventListener("click", setColorMode);
   rainbowButton.addEventListener("click", setButtonColor);
   eraserButton.addEventListener("click", setColorMode);
   eraserButton.addEventListener("click", setButtonColor);
   // downloadButton.addEventListener("click", downloadSketch);


   clearButton.addEventListener("click", () => {
      for(let item of gridArray){
         item.style.backgroundColor = "white";
         colorMode = "color"
      }
   });

   toogleGridButton.addEventListener("click", () => {
      if(!showGrid) {
         showGrid = !showGrid;
         for(let item of gridArray) {
            item.classList.add("grid-item");
         }
      }
      else {
         showGrid = !showGrid;
         for(let item of gridArray) {
            item.classList.remove("grid-item");
         }
      }
   })

   gridSlider.addEventListener("click",() => {
      createGrid();
      colorGrid();
   });

   gridSlider.addEventListener("mousemove", updateSliderDisplay)

   // downloadSketch();
}

start();