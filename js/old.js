// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

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
        .domain([0, d3.max(healthData, data=>data.poverty)])
        .range([0, chartWidth]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, data=>data.healthcare)])
        .range([chartHeight, 0]);

    // Step 6: Create Axes
  // =============================================
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    var Dline = d3 
        .line()
        .x(data => xScale(data.poverty))
        .y(data => yScale(data.healthcare));

  // Append an SVG path and plot its points using the line function
    chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for milesData
        .attr("d", Dline(healthData))
        .classed("line", true);

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


  });


