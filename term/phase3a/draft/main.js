"use strict";

/* -------------------- Configuration Variables -------------------- */

let svgWidth = 700;
let svgHeight = 450;
let margin = 60;

/* Resize container to match SVG width */
d3.select("#container")
    .style("width", String(svgWidth) + "px");

/* Create SVG drawing area */
let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


/* Draw inner dashed margin border */
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "6,4")
    .attr("x", margin)
    .attr("y", margin)
    .attr("width", svgWidth - margin * 2)
    .attr("height", svgHeight - margin * 2);

/* -------------------- Dataset -------------------- */

let dataset = [
    { hours: 10, quality: 5, latency: 25 },
    { hours: 8, quality: 3, latency: 5 },
    { hours: 8, quality: 4, latency: 50 },
    { hours: 8, quality: 5, latency: 5 },
    { hours: 8, quality: 2, latency: 20 },
    { hours: 10, quality: 5, latency: 30 },
    { hours: 8, quality: 3, latency: 20 },
    { hours: 9, quality: 4, latency: 30 },
    { hours: 8, quality: 1, latency: 40 },
    { hours: 8, quality: 2, latency: 10 },
    { hours: 6, quality: 1, latency: 40 },
    { hours: 9, quality: 5, latency: 50 },
    { hours: 6, quality: 1, latency: 20 },
    { hours: 7, quality: 2, latency: 25 },
    { hours: 10, quality: 5, latency: 10 },
    { hours: 9, quality: 5, latency: 5 },
    { hours: 9, quality: 4, latency: 25 },
    { hours: 6, quality: 1, latency: 10 },
    { hours: 3, quality: 1, latency: 15 }
];

/* -------------------- Scales -------------------- */

let plotWidth = svgWidth - margin * 2 - 180;

let xScale = d3.scaleLinear()
    .domain([0, 10])
    .range([margin, margin + plotWidth]);

let yScale = d3.scaleLinear()
    .domain([0, 5])
    .range([svgHeight - margin, margin]);

let rScale = d3.scaleLinear()
    .domain([5, 50])
    .range([5, 20]);

/* -------------------- Plot Data -------------------- */

let circles = svg.selectAll("circle.data")
    .data(dataset)
    .join("circle")
    .attr("class", "data");

circles
    .attr("cx", function (d) {
        return xScale(d.hours);
    })
    .attr("cy", function (d) {
        return yScale(d.quality);
    })
    .attr("r", function (d) {
        return rScale(d.latency);
    })
    .attr("fill", "steelblue")
    .attr("opacity", 0.7);

/* -------------------- Axis Labels -------------------- */

svg.append("text")
    .attr("x", svgWidth / 2 - 60)
    .attr("y", svgHeight - 15)
    .attr("text-anchor", "middle")
    .text("Hours Slept (hours)");

svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", 25)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Sleep Quality (1–5)");

/* -------------------- Axis Value Labels -------------------- */

/* X-axis: 0 */
svg.append("text")
    .attr("x", margin)
    .attr("y", svgHeight - margin + 18)
    .attr("text-anchor", "middle")
    .text("0");

/* X-axis: 10 */
svg.append("text")
    .attr("x", margin + plotWidth)
    .attr("y", svgHeight - margin + 25)
    .attr("text-anchor", "middle")
    .text("10");


/* Y-axis: 0 */
svg.append("text")
    .attr("x", margin - 15)
    .attr("y", yScale(0))
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .text("0");

/* Y-axis: 5 (max quality) */
svg.append("text")
    .attr("x", margin - 15)
    .attr("y", yScale(5))
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .text("5");

/* -------------------- Key (Legend) -------------------- */

let keyX = margin + plotWidth + 40;
let keyY = margin + 60;


svg.append("text")
    .attr("x", keyX)
    .attr("y", keyY - 5)
    .attr("text-anchor", "start")
    .text("Minutes Before Sleep");


/* Small */
svg.append("circle")
    .attr("cx", keyX)
    .attr("cy", keyY + 20)
    .attr("r", rScale(5))
    .attr("fill", "steelblue")
    .attr("opacity", 0.7);

svg.append("text")
    .attr("x", keyX + 35)
    .attr("y", keyY + 25)
    .text("5 mins");

/* Medium */
svg.append("circle")
    .attr("cx", keyX)
    .attr("cy", keyY + 65)
    .attr("r", rScale(25))
    .attr("fill", "steelblue")
    .attr("opacity", 0.7);

svg.append("text")
    .attr("x", keyX + 35)
    .attr("y", keyY + 70)
    .text("25 mins");

/* Large */
svg.append("circle")
    .attr("cx", keyX)
    .attr("cy", keyY + 120)
    .attr("r", rScale(50))
    .attr("fill", "steelblue")
    .attr("opacity", 0.7);

svg.append("text")
    .attr("x", keyX + 35)
    .attr("y", keyY + 125)
    .text("50 mins");
