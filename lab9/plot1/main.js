// Sleep dataset
const data = [
{date:"Feb 4", hours:10, quality:5, fallAsleep:25},
{date:"Feb 5", hours:8, quality:3, fallAsleep:5},
{date:"Feb 6", hours:8, quality:4, fallAsleep:50},
{date:"Feb 7", hours:8, quality:5, fallAsleep:5},
{date:"Feb 8", hours:8, quality:2, fallAsleep:20},
{date:"Feb 9", hours:10, quality:5, fallAsleep:30},
{date:"Feb 10", hours:8, quality:3, fallAsleep:20},
{date:"Feb 11", hours:9, quality:4, fallAsleep:30},
{date:"Feb 12", hours:8, quality:1, fallAsleep:40},
{date:"Feb 13", hours:8, quality:2, fallAsleep:10},
{date:"Feb 14", hours:6, quality:1, fallAsleep:40},
{date:"Feb 15", hours:9, quality:5, fallAsleep:50},
{date:"Feb 16", hours:6, quality:1, fallAsleep:20},
{date:"Feb 17", hours:7, quality:2, fallAsleep:25},
{date:"Feb 18", hours:10, quality:5, fallAsleep:10},
{date:"Feb 19", hours:9, quality:5, fallAsleep:5},
{date:"Feb 20", hours:9, quality:4, fallAsleep:25},
{date:"Feb 21", hours:6, quality:1, fallAsleep:10},
{date:"Feb 22", hours:3, quality:1, fallAsleep:15}
];

// Using Array.sort() to arrange the dataset by hours slept
data.sort(function(a,b){
return a.hours - b.hours;
});

// SVG size
const width = 700;
const height = 450;
const margin = {top:40, right:40, bottom:60, left:60};

const svg = d3.select("body")
.append("svg")
.attr("width", width)
.attr("height", height);

// X scale (Hours Slept)
const xScale = d3.scaleLinear()
.domain(d3.extent(data, function(d){ return d.hours; }))
.range([margin.left, width - margin.right]);

// Y scale (Sleep Quality)
const yScale = d3.scaleLinear()
.domain(d3.extent(data, function(d){ return d.quality; }))
.range([height - margin.bottom, margin.top]);

// Radius scale (time to fall asleep)
const rScale = d3.scaleLinear()
.domain(d3.extent(data, function(d){ return d.fallAsleep; }))
.range([4,12]);

// X axis (only min & max ticks)
const xAxis = d3.axisBottom(xScale)
.tickValues(d3.extent(data, function(d){ return d.hours; }));

// Y axis (only min & max ticks)
const yAxis = d3.axisLeft(yScale)
.tickValues(d3.extent(data, function(d){ return d.quality; }));

// Draw axes
svg.append("g")
.attr("transform","translate(0,"+(height-margin.bottom)+")")
.call(xAxis);

svg.append("g")
.attr("transform","translate("+margin.left+",0)")
.call(yAxis);

// X label
svg.append("text")
.attr("x", width/2)
.attr("y", height-15)
.attr("text-anchor","middle")
.text("Hours Slept");

// Y label
svg.append("text")
.attr("transform","rotate(-90)")
.attr("x",-height/2)
.attr("y",20)
.attr("text-anchor","middle")
.text("Sleep Quality (1-5)");

// Scatterplot circles
svg.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("cx", function(d){ return xScale(d.hours); })
.attr("cy", function(d){ return yScale(d.quality); })
.attr("r", function(d){ return rScale(d.fallAsleep); })
.attr("fill","steelblue")
.attr("opacity",0.7);

// Legend for circle size (minutes to fall asleep)

const legend = svg.append("g")
.attr("transform","translate(" + (width-160) + "," + 200 + ")");

legend.append("text")
.text("Minutes to Fall Asleep")
.attr("y",-5)
.attr("font-size","12px");

const legendData = [10,30,50];

legend.selectAll("circle")
.data(legendData)
.enter()
.append("circle")
.attr("cx",0)
.attr("cy",function(d,i){ return i*30; })
.attr("r",function(d){ return rScale(d); })
.attr("fill","steelblue")
.attr("opacity",0.7);

legend.selectAll("text.labels")
.data(legendData)
.enter()
.append("text")
.attr("class","labels")
.attr("x",20)
.attr("y",function(d,i){ return i*30 + 5; })
.text(function(d){ return d + " mins"; })
.attr("font-size","11px");