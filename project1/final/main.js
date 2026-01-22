"use strict"

document.getElementById("action").addEventListener("click", processForm);

let xInput, yInput,  choice = "mouthOpen"

function processForm() {
    /* Get data from the form */
    xInput = Number(document.getElementById("xInput").value);
    yInput = Number(document.getElementById("yInput").value);
    /* STEP 9: CHECK SELECT MENU OPTION HERE USING VARIABLE CHOICE */
    drawing.selectAll('svg>*').remove(); // This line selects everything that has been drawn in the SVG and deletes it all
    drawImage();
}

/* set up the drawing canvas - Be sure not to copy this code from your draft project! */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

/*
The function below is called when the user presses the "Draw!" button and is where you will put most of your drawing code. Please follow the instructions in the homework PDF for this step.
*/

/*
ORIGIN POINT:
The origin of this drawing is the top-left corner of the main body rectangle.
The main body is drawn at (squareX, squareY), and all other parts of the
character (eyes, legs, feet, side bumps, etc.) are positioned relative to
this point using offsets. When squareX or squareY change, the entire drawing
moves together.
*/

function drawImage() {

    
    let squareX = xInput;
    let squareY = yInput;

    // This is an example of extra (optional) variables to position a part of your drawing
    // Remove these comments and these example variables.
    let circleX = squareX+25;
    let circleY = squareY+25;


    
// Side body bumps (the dark green semi-circles)
let leftsideBody = drawing.append("circle")
    .attr("cx", squareX + 5)
    .attr("cy", squareY + 110)
    .attr("r", 40)
    .attr("fill", "green");
let rightsideBody = drawing.append("circle")
    .attr("cx", squareX + 145)
    .attr("cy",squareY + 110)
    .attr("r", 40)
    .attr("fill", "green");

// Main Body (The light green rectangle)
let mainBody = drawing.append("rect")
    .attr("x", squareX)
    .attr("y", squareY)
    .attr("width", 150)
    .attr("height", 150)
    .attr("fill", "darkgreen");

//  Eyes (The orange circles with black pupils)
// Left Eye
let leftEye1 = drawing.append("circle")
    .attr("cx", squareX + 25)
    .attr("cy", squareY)
    .attr("r", 30)
    .attr("fill", "pink");
let leftEye2 = drawing.append("circle")
    .attr("cx", squareX + 25)
    .attr("cy", squareY)
    .attr("r", 10)
    .attr("fill", "black");
// Right Eye
let rightEye1 = drawing.append("circle")
    .attr("cx", squareX + 125)
    .attr("cy", squareY)
    .attr("r", 30)
    .attr("fill", "pink");
let rightEye2 = drawing.append("circle")
    .attr("cx", squareX + 125)
    .attr("cy", squareY)
    .attr("r", 10)
    .attr("fill", "black");

// Nostrils (Tiny black dots)
let leftNostril = drawing.append("circle")
    .attr("cx", squareX +70)
    .attr("cy", squareY +30)
    .attr("r", 4)
    .attr("fill", "black");
let rightNostril = drawing.append("circle")
    .attr("cx", squareX + 100)
    .attr("cy", squareY +30)
    .attr("r", 4)
    .attr("fill", "black");

// Inner Legs (The two blueish/green vertical rectangles)
let leftinnerLeg = drawing.append("rect")
    .attr("x", squareX + 35)
    .attr("y", squareY + 90)
    .attr("width", 15)
    .attr("height", 60)
    .attr("fill", "skyblue");
let righinnerLeg = drawing.append("rect")
    .attr("x", squareX + 100)
    .attr("y", squareY + 90)
    .attr("width", 15)
    .attr("height", 60)
    .attr("fill", "skyblue");

// Feet (Small orange circles at the bottom)
let feet1 = drawing.append("circle")
    .attr("cx", squareX + 20)
    .attr("cy", squareY + 155)
    .attr("r", 8)
    .attr("fill", "yellow");
let feet2 = drawing.append("circle")
    .attr("cx", squareX + 45)
    .attr("cy", squareY + 155)
    .attr("r", 8)
    .attr("fill", "yellow");
let feet3 = drawing.append("circle")
    .attr("cx", squareX + 105)
    .attr("cy", squareY + 155)
    .attr("r", 8)
    .attr("fill", "yellow");
let feet4 = drawing.append("circle")
    .attr("cx", squareX + 130)
    .attr("cy", squareY + 155)
    .attr("r", 8)
    .attr("fill", "yellow");
    
    // Step 10: Modify your drawing code to CONDITIONALLY draw part of your drawing based on
    // the choice the user made in your selection menu (stored in variable "choice" above)

    /*
MODIFICATION DESCRIPTION:
When "mouthClosed" is selected, the character has a straight closed mouth.
When "mouthOpen" is selected, the mouth opens and a tongue is visible.
*/

if (choice === "mouthOpen") {
    // Open mouth
    drawing.append("ellipse")
        .attr("cx", squareX + 75)
        .attr("cy", squareY + 60)
        .attr("rx", 20)
        .attr("ry", 15)
        .attr("fill", "black");

    drawing.append("ellipse")
        .attr("cx", squareX + 75)
        .attr("cy", squareY + 65)
        .attr("rx", 10)
        .attr("ry", 8)
        .attr("fill", "red");
} else {
    // Closed mouth
    drawing.append("line")
        .attr("x1", squareX + 55)
        .attr("y1", squareY + 60)
        .attr("x2", squareX + 95)
        .attr("y2", squareY + 60)
        .attr("stroke", "black")
        .attr("stroke-width", 3);
}


    /***** DO NOT ADD OR EDIT ANYTHING BELOW THIS LINE ******/
}
