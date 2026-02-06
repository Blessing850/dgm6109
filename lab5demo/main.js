"use strict";

document.getElementById("action").addEventListener("click", processForm);

let xInput, yInput;

function processForm() {
    // 1. Get values from the form
    let xValue = Number(document.getElementById("xInput").value);
    let yValue = Number(document.getElementById("yInput").value);
    
    // Check if the checkbox is checked (returns true or false)
    let showOriginValue = document.getElementById("originInput").checked;

    // 2. Clear the canvas 
    drawing.selectAll('*').remove();

    // 3. Call your function from frog.js
    frog(drawing, xValue, yValue, showOriginValue);
}

/* set up the drawing canvas */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

function drawImage() {
    frog(drawing, xInput, yInput, false);
}
