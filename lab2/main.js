"use strict"

/*  Variable that enables you to "talk to" your SVG drawing canvas. */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

/* Draw a border */
let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

/* GROUP: everything goes inside this group */
let character = drawing.append("g")
    .attr("transform", "translate(0, 0)");

/* Side body bumps */
let leftsideBody = character.append("circle")
    .attr("cx", 180)
    .attr("cy", 360)
    .attr("r", 40)
    .attr("fill", "green");

let rightsideBody = character.append("circle")
    .attr("cx", 320)
    .attr("cy", 360)
    .attr("r", 40)
    .attr("fill", "green");

/* Main Body */
let mainBody = character.append("rect")
    .attr("x", 175)
    .attr("y", 250)
    .attr("width", 150)
    .attr("height", 150)
    .attr("fill", "darkgreen");

/* Eyes */
let leftEye1 = character.append("circle")
    .attr("cx", 200)
    .attr("cy", 250)
    .attr("r", 30)
    .attr("fill", "pink");

let leftEye2 = character.append("circle")
    .attr("cx", 200)
    .attr("cy", 250)
    .attr("r", 10)
    .attr("fill", "black");

let rightEye1 = character.append("circle")
    .attr("cx", 300)
    .attr("cy", 250)
    .attr("r", 30)
    .attr("fill", "pink");

let rightEye2 = character.append("circle")
    .attr("cx", 300)
    .attr("cy", 250)
    .attr("r", 10)
    .attr("fill", "black");

/* Nostrils */
let leftNostril = character.append("circle")
    .attr("cx", 245)
    .attr("cy", 280)
    .attr("r", 4)
    .attr("fill", "black");

let rightNostril = character.append("circle")
    .attr("cx", 275)
    .attr("cy", 280)
    .attr("r", 4)
    .attr("fill", "black");

/* Inner Legs */
let leftinnerLeg = character.append("rect")
    .attr("x", 210)
    .attr("y", 340)
    .attr("width", 15)
    .attr("height", 60)
    .attr("fill", "skyblue");

let rightinnerLeg = character.append("rect")
    .attr("x", 275)
    .attr("y", 340)
    .attr("width", 15)
    .attr("height", 60)
    .attr("fill", "skyblue");

/* Feet */
let feet1 = character.append("circle")
    .attr("cx", 195)
    .attr("cy", 405)
    .attr("r", 8)
    .attr("fill", "yellow");

let feet2 = character.append("circle")
    .attr("cx", 220)
    .attr("cy", 405)
    .attr("r", 8)
    .attr("fill", "yellow");

let feet3 = character.append("circle")
    .attr("cx", 280)
    .attr("cy", 405)
    .attr("r", 8)
    .attr("fill", "yellow");

let feet4 = character.append("circle")
    .attr("cx", 310)
    .attr("cy", 405)
    .attr("r", 8)
    .attr("fill", "yellow");

/* ===========================
   MOVEMENT ANIMATION
=========================== */

function moveCharacter() {
    character
        .transition()
        .duration(2000)
        .attr("transform", "translate(150, 0)")
        .transition()
        .duration(2000)
        .attr("transform", "translate(0, 0)")
        .on("end", moveCharacter); // loop forever
}

moveCharacter();