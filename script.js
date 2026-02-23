const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let painting = false;
let brushColor = "#000000";
let brushSize = 3;

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = brushColor;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

// Color Picker
document.getElementById("colorPicker").addEventListener("change", function(e) {
    brushColor = e.target.value;
});

// Brush Size
document.getElementById("brushSize").addEventListener("input", function(e) {
    brushSize = e.target.value;
});

// Eraser
document.getElementById("eraser").addEventListener("click", function() {
    brushColor = "#ffffff";
});

// Clear
document.getElementById("clear").addEventListener("click", function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Download
document.getElementById("download").addEventListener("click", function() {
    const link = document.createElement("a");
    link.download = "eSignature.png";
    link.href = canvas.toDataURL();
    link.click();
});