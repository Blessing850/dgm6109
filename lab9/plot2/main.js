// Sleep dataset
const rawData = [
{hours:10, quality:5, fallAsleep:25},
{hours:8, quality:3, fallAsleep:5},
{hours:8, quality:4, fallAsleep:50},
{hours:8, quality:5, fallAsleep:5},
{hours:8, quality:2, fallAsleep:20},
{hours:10, quality:5, fallAsleep:30},
{hours:8, quality:3, fallAsleep:20},
{hours:9, quality:4, fallAsleep:30},
{hours:8, quality:1, fallAsleep:40},
{hours:8, quality:2, fallAsleep:10},
{hours:6, quality:1, fallAsleep:40},
{hours:9, quality:5, fallAsleep:50},
{hours:6, quality:1, fallAsleep:20},
{hours:7, quality:2, fallAsleep:25},
{hours:10, quality:5, fallAsleep:10},
{hours:9, quality:5, fallAsleep:5},
{hours:9, quality:4, fallAsleep:25},
{hours:6, quality:1, fallAsleep:10},
{hours:3, quality:1, fallAsleep:15}
];

// Using Array.filter() to remove extreme outlier nights (<4 hours sleep)
const data = rawData.filter(function(d){
return d.hours >= 4;
});

const width = 700;
const height = 450;
const margin = {top:40, right:40, bottom:60, left:60};

const svg = d3.select("body")
.append("svg")
.attr("width", width)
.attr("height", height);

// X scale (Minutes to fall asleep)
const xScale = d3.scaleLinear()
.domain(d3.extent(data, function(d){ return d.fallAsleep; }))
.range([margin.left, width - margin.right]);

// Y scale (Sleep quality)
const yScale = d3.scaleLinear()
.domain(d3.extent(data, function(d){ return d.quality; }))
.range([height - margin.bottom, margin.top]);

// Circle size (hours slept)
const rScale = d3.scaleLinear()
.domain(d3.extent(data, function(d){ return d.hours; }))
.range([4,12]);

// X axis (only min & max)
const xAxis = d3.axisBottom(xScale)
.tickValues(d3.extent(data, function(d){ return d.fallAsleep; }));

// Y axis (only min & max)
const yAxis = d3.axisLeft(yScale)
.tickValues(d3.extent(data, function(d){ return d.quality; }));

svg.append("g")
.attr("transform","translate(0,"+(height-margin.bottom)+")")
.call(xAxis);

svg.append("g")
.attr("transform","translate("+margin.left+",0)")
.call(yAxis);

// Axis labels
svg.append("text")
.attr("x", width/2)
.attr("y", height-15)
.attr("text-anchor","middle")
.text("Minutes to Fall Asleep");

svg.append("text")
.attr("transform","rotate(-90)")
.attr("x",-height/2)
.attr("y",20)
.attr("text-anchor","middle")
.text("Sleep Quality (1-5)");

// Plot circles
svg.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("cx", function(d){ return xScale(d.fallAsleep); })
.attr("cy", function(d){ return yScale(d.quality); })
.attr("r", function(d){ return rScale(d.hours); })
.attr("fill","orange")
.attr("opacity",0.7);

// Legend for circle size (hours slept)

const legend = svg.append("g")
.attr("transform","translate(" + (width-160) + "," + 60 + ")");

legend.append("text")
.text("Hours Slept")
.attr("y",-10)
.attr("font-size","12px");

const legendData = [6,8,10];

legend.selectAll("circle")
.data(legendData)
.enter()
.append("circle")
.attr("cx",0)
.attr("cy",function(d,i){ return i*30; })
.attr("r",function(d){ return rScale(d); })
.attr("fill","orange")
.attr("opacity",0.7);

legend.selectAll("text.labels")
.data(legendData)
.enter()
.append("text")
.attr("class","labels")
.attr("x",20)
.attr("y",function(d,i){ return i*30 + 5; })
.text(function(d){ return d + " hrs"; })
.attr("font-size","11px");