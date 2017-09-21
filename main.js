let colors = ["red", "brown", "blue", "purple", "yellow", "orange", "gray", "green", "crimson", "lavender", "indigo",
            "moccasin", "orchid", "plum", "silver", "tan", "red", "brown", "blue", "purple", "yellow", "orange",
            "gray", "green", "crimson", "lavender", "indigo", "moccasin", "orchid", "plum", "silver", "tan"];

let svgContainer,
    svgWidth = 800,
    svgHeight = 500,
    svgMargin = {
        top: 20,
        right: 50,
        bottom: 20,
        left: 50
    },
    startPoint = {
        x: svgMargin.left,
        y: svgMargin.top + svgHeight
    },
    xAxisLength = 750,
    yAxisLength = 450,
    scale = 300;

let a = 11;
let m = 5;
let Ro = 1;
let n = 100000;


function init() {
    drawSvgContainer(svgWidth, svgHeight, svgMargin);
    drawAxes(xAxisLength, yAxisLength, startPoint, scale);
    let numbers = generateRandomNumbers(a, m, Ro, n);
    drawPoints(numbers, colors[12]);
}

function task1() {
    clearSvgContainer(svgContainer);
    drawAxes(xAxisLength, yAxisLength, startPoint, scale);
}

function task2() {
    clearSvgContainer(svgContainer);
    drawAxes(xAxisLength, yAxisLength, startPoint, scale);
}


function generateRandomNumbers(a, m, Ro, n) {
    let result = [];
    //result.push(Ro / m);
    let prevRemnant = Ro;
    for(let i = 1; i < n; i++) {
        let remnant = getNextRandomRemnant(a, m, prevRemnant);
        result.push({x: i, y: remnant / m});
        prevRemnant = remnant;
    };
    return result;
}

function getNextRandomRemnant(a, m, R) {
    return (a * R) % m;
}



function drawSvgContainer(width, height, margin) {
    svgContainer = d3.select("body").append("svg")
    .attr("width", margin.left + width + margin.right)
    .attr("height", margin.top + height + margin.bottom);
}

function clearSvgContainer(svg) {
    svg.selectAll("*").remove();
}

function drawAxes(xLength, yLength, startPoint, scale) {
    let xScale = d3.scaleLinear().domain([0, xLength * scale * 5]).range([0, xLength]);
    let yScale = d3.scaleLinear().domain([0, yAxisLength / scale]).range([yLength, 0]);
    let xAxis = d3.axisBottom().scale(xScale);
    let yAxis = d3.axisLeft().scale(yScale);

    svgContainer
    .append("g")
    .attr('class', 'axis')
    .attr('transform', 'translate(' + startPoint.x + ',' + Math.round(svgMargin.top * 3.5) + ')')
    .call(yAxis);

    svgContainer
    .append("g")
    .attr('class', 'axis')
    .attr('transform', 'translate(' + startPoint.x + ',' + startPoint.y + ')')
    .call(xAxis);
}

function drawPoints(functionResults, color) {
    functionResults.forEach( point => {
        drawPoint(point, color);
    });
}

function drawPoint(point, color, size) {
    svgContainer.append("circle")
    .attr("cx", point.x + startPoint.x)
    .attr("cy", startPoint.y - (point.y * scale))
    .attr("r", size || 1)
    .style("fill", color);
}