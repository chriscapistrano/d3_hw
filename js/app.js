// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 70,
  left: 70
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);
 //.attr("align", "center");

 //d3.select("#chart")
//.attr("align","center");

  // Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
.attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


// Load data from hours-of-tv-watched.csv
d3.csv("data.csv")
  .then(function(healthData) { 
    console.log(healthData);


    // Cast healthcare and poverty data to a number
  healthData.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
  });



      // Create Scales
  //= ============================================
  // setup x and y
    var xScale = d3.scaleLinear()
        .domain([5, d3.max(healthData, data=>data.poverty+5)])
        .range([0, chartWidth]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, data=>data.healthcare+5)])
        .range([chartHeight, 0]);

    //  Create Axes
  // =============================================
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);


  // Append an SVG group element to the SVG area, create the left axis inside of it

    chartGroup.append("g")
        //.classed("axis", true)
        .call(leftAxis);

  // Append an SVG group element to the SVG area, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
    chartGroup.append("g")
        //.classed("axis", true)
        .attr("transform", "translate(0, " + chartHeight + ")")
       .call(bottomAxis);

    chartGroup.append("g")
       .attr("stroke", "white")
       .attr("stroke-width", 1.5)
       .attr("fill", "lightblue")
     .selectAll("circle")
     .data(healthData)
       .enter().append("circle")
       .attr("cx", data => xScale(data.poverty))
       .attr("cy", data => yScale(data.healthcare))
       .attr("r", 10);     
       
    chartGroup.append("g")
       .attr("font-family", "arial")
       .attr("font-size", 8)
       .attr("text-anchor", "middle")
     .selectAll("text")
     .data(healthData)
     .enter().append("text")
        .attr("fill", "blue")
        .attr("x", data => xScale(data.poverty))
        .attr("y", data => yScale(data.healthcare))
        .text(data => data.abbr)
      // .call(dodge);  

      // Append y-axis label
  chartGroup
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - chartMargin.left+15)
    .attr("x", 0 - chartHeight / 1.7)
    .attr("dy", "1em")
    .text("Lacks Healthcare (%)");

    // Append x-axis labels
  chartGroup  
    .append("text")
    .attr("transform", "rotate(0)")
    .attr("y", 580)
    .attr("x", 350)
    .attr("dy", "1em")
    .text("Poverty Level (%)");

});














