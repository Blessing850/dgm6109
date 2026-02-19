"use strict"

/***********************************
 CONFIGURATION VARIABLES
************************************/
let svgWidth = 600;
let svgHeight = 400;
let margin = 50; // margin for axes and labels
let circleRadius = 6; // radius of scatterplot points

/***********************************
 CREATE SVG CANVAS
************************************/
let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Canvas border
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Margin border
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    .attr("x", margin) 
    .attr("y", margin)
    .attr("width", svgWidth - margin * 2)
    .attr("height", svgHeight - margin * 2);

/***********************************
 DATASET
 Hypothesis: As my total hours of sleep increase,
 my sleep quality rating increases.
************************************/
let dataset = [
    { hoursOfSleep: 10.0, sleepQuality: 3 },
    { hoursOfSleep: 8.08, sleepQuality: 5 },
    { hoursOfSleep: 8.17, sleepQuality: 4 },
    { hoursOfSleep: 7.08, sleepQuality: 5 },
    { hoursOfSleep: 7.33, sleepQuality: 2 },
    { hoursOfSleep: 10.33, sleepQuality: 5 },
    { hoursOfSleep: 7.5, sleepQuality: 3 },
    { hoursOfSleep: 9.5, sleepQuality: 4 },
    { hoursOfSleep: 7.83, sleepQuality: 1 },
    { hoursOfSleep: 7.67, sleepQuality: 2 },
    { hoursOfSleep: 6.0, sleepQuality: 3 },
    { hoursOfSleep: 8.1, sleepQuality: 2 },
    { hoursOfSleep: 5.67, sleepQuality: 2 }
];

/***********************************
 SCALES
************************************/
let xScale = d3.scaleLinear()
    .domain([5, 11])
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain([1, 5])
    .range([svgHeight - margin, margin]); // invert Y-axis

/***********************************
 DRAW AXES
************************************/
let xAxis = d3.axisBottom(xScale).ticks(6);
let yAxis = d3.axisLeft(yScale).ticks(5);

svg.append("g")
    .attr("transform", `translate(0, ${svgHeight - margin})`)
    .call(xAxis);

svg.append("g")
    .attr("transform", `translate(${margin}, 0)`)
    .call(yAxis);

/***********************************
 DRAW CIRCLES
************************************/
svg.selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("cx", d => xScale(d.hoursOfSleep))
    .attr("cy", d => yScale(d.sleepQuality))
    .attr("r", circleRadius)
    .attr("fill", "black");

/***********************************
 AXIS LABELS
************************************/
svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - margin / 3)
    .attr("text-anchor", "middle")
    .text("Total Hours of Sleep (hours)");

svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", margin / 2.5)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Sleep Quality Rating (1 = very poor, 5 = excellent)");

/***********************************
 VALUE LABELS
************************************/
// Bottom-left domain value
svg.append("text")
    .attr("x", margin)
    .attr("y", svgHeight - margin / 3)
    .attr("text-anchor", "middle")
    .text("5,1");

// Maximum x value label
svg.append("text")
    .attr("x", xScale(11))
    .attr("y", svgHeight - margin / 3)
    .attr("text-anchor", "middle")
    .text("11");

// Maximum y value label
svg.append("text")
    .attr("x", margin - 5)
    .attr("y", yScale(5))
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .text("5");

/***********************************
 GRAPH TITLE
************************************/
svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", margin / 2)
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .text("Relationship Between Hours Slept and Sleep Quality");
