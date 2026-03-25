"use strict"

let svgWidth = 1200
let svgHeight = 900

let margin = {
    top: 80,
    right: 220,
    bottom: 100,
    left: 100
}

let width = svgWidth - margin.left - margin.right
let height = svgHeight - margin.top - margin.bottom

let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

let viz = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)

let tooltip = d3.select("#tooltip")

let xScale, yScale, rScale, colorScale

// ---------------- LOAD DATA ----------------
(async function () {
    let data = await d3.json("data.json")
    let renderData = organizeData(data)
    buildScales(renderData)
    drawVisualization(renderData)
})();

// ---------------- ORGANIZE DATA ----------------
function organizeData(data) {

    return data.map(function(d) {

        let time = d.bedtime.toLowerCase()
        let hour = parseInt(time.split(":")[0])
        let isPM = time.includes("pm")

        if (isPM && hour !== 12) hour += 12
        if (!isPM && hour === 12) hour = 0

        let category

        if (hour < 23 && hour >= 6) {
            category = "before11"
        } 
        else if (hour >= 23 || hour === 0 || hour === 1) {
            category = "11to1"
        } 
        else {
            category = "after1"
        }

        return {
            date: d.date,
            bedtime: d.bedtime,
            hours: +d.hoursSlept,
            quality: +d.sleepQuality,
            minutesAwake: +d.timeToFallAsleep,
            notes: d.notes,
            bedtimeCategory: category
        }
    })
}

// ---------------- SCALES ----------------
function buildScales(data) {

    xScale = d3.scaleLinear()
        .domain([0, 10])
        .range([0, width])

    yScale = d3.scaleLinear()
        .domain([0, 5])
        .range([height, 0])

    rScale = d3.scaleSqrt()
        .domain([5, 50])
        .range([6, 32])

    colorScale = d3.scaleOrdinal()
        .domain(["before11", "11to1", "after1"])
        .range(["#033280", "#f6fe04", "#fd0318"])
}

// ---------------- DRAW ----------------
function drawVisualization(data) {

    let xAxis = d3.axisBottom(xScale)
        .tickValues([0,1,2,3,4,5,6,7,8,9,10])
        .tickFormat(d3.format("d"))

    let yAxis = d3.axisLeft(yScale)
        .tickValues([0, 1,2,3,4,5])
        .tickFormat(d3.format("d"))

    viz.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)

    viz.append("g")
        .attr("class", "axis")
        .call(yAxis)

    viz.append("text")
        .attr("class", "axisLabel")
        .attr("x", width / 2)
        .attr("y", height + 60)
        .attr("text-anchor", "middle")
        .text("Hours Slept (hours)")

    viz.append("text")
        .attr("class", "axisLabel")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -70)
        .attr("text-anchor", "middle")
        .text("Sleep Quality (1–5)")

    function jitter() {
        return (Math.random() - 0.5) * 12
    }

    data.sort(function(a, b) {
        return b.minutesAwake - a.minutesAwake
    })

    viz.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return xScale(d.hours) + jitter() })
        .attr("cy", function(d) { return yScale(d.quality) + jitter() })
        .attr("r", function(d) { return rScale(d.minutesAwake) })
        .attr("fill", function(d) { return colorScale(d.bedtimeCategory) })
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("opacity", 0.75)

        .on("mouseover", function (event, d) {
            tooltip
                .style("opacity", 1)
                .html(
                    `<strong>${d.date}</strong><br>
                    Bedtime: ${d.bedtime}<br>
                    Hours Slept: ${d.hours}<br>
                    Sleep Quality: ${d.quality}<br>
                    Minutes Awake: ${d.minutesAwake}<br>
                    <em>${d.notes}</em>`
                )
        })

        .on("mousemove", function (event) {
            tooltip
                .style("left", (event.pageX + 15) + "px")
                .style("top", (event.pageY - 20) + "px")
        })

        .on("mouseout", function () {
            tooltip.style("opacity", 0)
        })

    drawLegend()
}

// ---------------- LEGEND ----------------
function drawLegend() {

    let legendX = width + margin.left + 40

    let legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${legendX},370)`)

    legend.append("text")
        .text("Bedtime")
        .attr("y", -20)

    let categories = [
        { label: "Before 11pm", color: "#033280" },
        { label: "11pm – 1am", color: "#f6fe04" },
        { label: "After 1am", color: "#fd0318" }
    ]

    legend.selectAll("rect")
        .data(categories)
        .enter()
        .append("rect")
        .attr("y", function(d, i) { return i * 30 })
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", function(d) { return d.color })

    legend.selectAll("text.label")
        .data(categories)
        .enter()
        .append("text")
        .attr("x", 30)
        .attr("y", function(d, i) { return i * 30 + 14 })
        .text(function(d) { return d.label })

    let sizeLegend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${legendX},550)`)

    sizeLegend.append("text")
        .text("Minutes Awake")
        .attr("y", -20)

    let sizes = [5, 25, 50]

    sizeLegend.selectAll("circle")
        .data(sizes)
        .enter()
        .append("circle")
        .attr("cy", function(d, i) { return i * 70 + rScale(d) })
        .attr("r", function(d) { return rScale(d) })
        .attr("fill", "gray")
        .attr("opacity", 0.6)

    sizeLegend.selectAll("text.sizeLabel")
        .data(sizes)
        .enter()
        .append("text")
        .attr("class", "sizeLabel")
        .attr("x", 45)
        .attr("y", function(d, i) { return i * 70 + rScale(d) + 5 })
        .attr("dominant-baseline", "middle")
        .text(function(d) { return d + " minutes" })
}