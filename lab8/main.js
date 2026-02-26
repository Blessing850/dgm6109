"use strict";

/* =========================
   CONFIGURATION VARIABLES
   ========================= */

let svgWidth = 800;
let svgHeight = 600;

let marginTop = 60;
let marginRight = 300;   // extra space for keys
let marginBottom = 70;
let marginLeft = 80;

/* Resize container to match SVG width */
d3.select("#container")
    .style("width", svgWidth + "px");

/* Create SVG canvas */
let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Optional outer border */
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* =========================
   DATASET (20 observations)
   ========================= */

let dataset = [
    {date:"Feb 4", hours:10, quality:5, minutesAwake:25},
    {date:"Feb 5", hours:8, quality:3, minutesAwake:5},
    {date:"Feb 6", hours:8, quality:4, minutesAwake:50},
    {date:"Feb 7", hours:8, quality:5, minutesAwake:5},
    {date:"Feb 8", hours:8, quality:2, minutesAwake:20},
    {date:"Feb 9", hours:10, quality:5, minutesAwake:30},
    {date:"Feb 10", hours:8, quality:3, minutesAwake:20},
    {date:"Feb 11", hours:9, quality:4, minutesAwake:30},
    {date:"Feb 12", hours:8, quality:1, minutesAwake:40},
    {date:"Feb 13", hours:8, quality:2, minutesAwake:10},
    {date:"Feb 14", hours:6, quality:1, minutesAwake:40},
    {date:"Feb 15", hours:9, quality:5, minutesAwake:50},
    {date:"Feb 16", hours:6, quality:1, minutesAwake:20},
    {date:"Feb 17", hours:7, quality:2, minutesAwake:25},
    {date:"Feb 18", hours:10, quality:5, minutesAwake:10},
    {date:"Feb 19", hours:9, quality:5, minutesAwake:5},
    {date:"Feb 20", hours:9, quality:4, minutesAwake:25},
    {date:"Feb 21", hours:6, quality:1, minutesAwake:10},
    {date:"Feb 22", hours:3, quality:1, minutesAwake:15}
];

/* =========================
   SORT DATA
   Sort by minutesAwake descending
   So large circles appear in back
   ========================= */

dataset.sort(function(a, b) {
    return b.minutesAwake - a.minutesAwake;
});

/* =========================
   SCALE FUNCTIONS
   ========================= */

/* X scale: Hours Slept */
let xMin = d3.min(dataset, d => d.hours);
let xMax = d3.max(dataset, d => d.hours);

let xScale = d3.scaleLinear()
    .domain([xMin, xMax])
    .range([marginLeft, svgWidth - marginRight]);

/* Y scale: Sleep Quality */
let yMin = d3.min(dataset, d => d.quality);
let yMax = d3.max(dataset, d => d.quality);

let yScale = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([svgHeight - marginBottom, marginTop]);

/* Radius scale (square root for area accuracy) */
let rScale = d3.scaleSqrt()
    .domain([
        d3.min(dataset, d => d.minutesAwake),
        d3.max(dataset, d => d.minutesAwake)
    ])
    .range([5, 40]);

/* =========================
   DRAW AXIS LINES
   ========================= */

/* X axis line */
svg.append("line")
    .attr("x1", xScale(xMin))
    .attr("x2", xScale(xMax))
    .attr("y1", yScale(yMin))
    .attr("y2", yScale(yMin))
    .attr("stroke", "black");

/* Y axis line */
svg.append("line")
    .attr("x1", xScale(xMin))
    .attr("x2", xScale(xMin))
    .attr("y1", yScale(yMin))
    .attr("y2", yScale(yMax))
    .attr("stroke", "black");

/* =========================
   AXIS LABELS
   ========================= */

svg.append("text")
    .attr("x", (marginLeft + (svgWidth - marginRight)) / 2)
    .attr("y", svgHeight - 25)
    .attr("text-anchor", "middle")
    .text("Hours Slept (hours)");

svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", 25)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Sleep Quality (1–5)");

/* =========================
   AXIS VALUE LABELS
   (Low and High values)
   ========================= */

/* X low */
svg.append("text")
    .attr("x", xScale(xMin))
    .attr("y", yScale(yMin) + 20)
    .attr("text-anchor", "middle")
    .text(xMin);

/* X high */
svg.append("text")
    .attr("x", xScale(xMax))
    .attr("y", yScale(yMin) + 20)
    .attr("text-anchor", "middle")
    .text(xMax);

/* Y low */
svg.append("text")
    .attr("x", xScale(xMin) - 15)
    .attr("y", yScale(yMin))
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .text(yMin);

/* Y high */
svg.append("text")
    .attr("x", xScale(xMin) - 15)
    .attr("y", yScale(yMax))
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .text(yMax);

/* =========================
   DRAW CIRCLES
   ========================= */

svg.selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("cx", d => xScale(d.hours))
    .attr("cy", d => yScale(d.quality))
    .attr("r", d => rScale(d.minutesAwake))
    .attr("fill", function(d) {

        /* Color by quality using ranges */
        if (d.quality <= 2) { return "red"; }
        else if (d.quality <= 4) { return "orange"; }
        else { return "green"; }

    })
    .attr("opacity", 0.7);

/* =========================
   SIZE KEY (Boxed)
   ========================= */

let sizeKeyX = svgWidth - 180;
let sizeKeyY = 100;

svg.append("rect")
    .attr("x", sizeKeyX - 30)
    .attr("y", sizeKeyY - 40)
    .attr("width", 180)
    .attr("height", 200)
    .attr("fill", "none")
    .attr("stroke", "black");

svg.append("text")
    .attr("x", sizeKeyX)
    .attr("y", sizeKeyY - 15)
    .text("Minutes Awake (Size)");

[10, 30, 50].forEach(function(value, i) {

    svg.append("circle")
        .attr("cx", sizeKeyX)
        .attr("cy", sizeKeyY + i * 60)
        .attr("r", rScale(value))
        .attr("fill", "gray")
        .attr("opacity", 0.5);

    svg.append("text")
        .attr("x", sizeKeyX + 50)
        .attr("y", sizeKeyY + i * 60)
        .attr("alignment-baseline", "middle")
        .text(value + " mins");
});

/* =========================
   COLOR KEY (Boxed)
   ========================= */

let colorKeyY = 350;

svg.append("rect")
    .attr("x", sizeKeyX - 30)
    .attr("y", colorKeyY - 40)
    .attr("width", 180)
    .attr("height", 170)
    .attr("fill", "none")
    .attr("stroke", "black");

svg.append("text")
    .attr("x", sizeKeyX)
    .attr("y", colorKeyY - 15)
    .text("Sleep Quality (Color)");

let colors = [
    {label:"1-2 Low", color:"red"},
    {label:"3-4 Medium", color:"orange"},
    {label:"5 High", color:"green"}
];

colors.forEach(function(item, i) {

    svg.append("rect")
        .attr("x", sizeKeyX)
        .attr("y", colorKeyY + i * 40)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", item.color);

    svg.append("text")
        .attr("x", sizeKeyX + 30)
        .attr("y", colorKeyY + i * 40 + 10)
        .attr("alignment-baseline", "middle")
        .text(item.label);
});