const LINE_WIDTH = 8;
const FILE_NAME = "digit.png";

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

// functionality for downloading the image
downloadBtn = document.getElementById("downloadButton");
downloadBtn.addEventListener("click", saveCanvasAsImage);

function saveCanvasAsImage() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = FILE_NAME;
  link.click();
}

// functionality for clearing the canvas
clearBtn = document.getElementById("clearButton");
clearBtn.onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// functionality associated with predict button
predictBtn = document.getElementById("predictButton")
predictBtn.addEventListener("click", predictDigit);
async function predictDigit() {
  const image = canvas.toDataURL("image/png");
  fetch("/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_input: image }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      updatePredictionUI(data["predicted_value"]);
    });
}

// function to update the UI with prediction scores
function updatePredictionUI(predictedValue) {
  const divs_pred = ["first_prediction", "second_prediction", "third_prediction"];
  const divs_score = ["first_score", "second_score", "third_score"];
  predictedValue.forEach((result, i) => {
    document.getElementById(divs_pred[i]).textContent = result.digit;
    document.getElementById(divs_score[i]).textContent = result.probability + " %";
  });
}