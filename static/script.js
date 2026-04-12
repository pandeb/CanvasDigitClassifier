const LINE_WIDTH = 8;

// get the canvas element and 2d drawing context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// set drawing styles
ctx.lineWidth = LINE_WIDTH;
ctx.lineCap = "round";
ctx.strokeStyle = "#ffffff";

// initialize variables
let x = null;
let y = null;
let draw = false;

// when mouse is pressed down or starts drawing
canvas.addEventListener("mousedown", (e) => {
  draw = true;

  const rect = canvas.getBoundingClientRect();
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;
});

// function to set draw as false
const stopDrawing = () => {
    draw = false;
}

// stop drawing when mouse is released
canvas.addEventListener('mouseup', stopDrawing);
// stop drawing when mouse leaves the canvas area
canvas.addEventListener('mouseleave', stopDrawing);

// draw on the canvas
canvas.addEventListener("mousemove", (e) => {
  if (!draw) return;

  const rect = canvas.getBoundingClientRect();
  const newX = e.clientX - rect.left;
  const newY = e.clientY - rect.top;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(newX, newY);
  ctx.stroke();

  x = newX;
  y = newY;
});