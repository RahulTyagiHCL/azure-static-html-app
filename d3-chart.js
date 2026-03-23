// ---------- Configuration ----------
const margin = { top: 30, right: 30, bottom: 50, left: 60 };
const width = 700 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;
console.log("D3 loaded:", typeof d3);
// ---------- Sample Data ----------
const data = [
    { label: "HR", value: 40 },
    { label: "Finance", value: 25 },
    { label: "IT", value: 60 },
    { label: "Operations", value: 35 },
    { label: "Security", value: 50 }
];

// ---------- Create SVG ----------
const svg = d3
    .select("#chartContainer")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// ---------- X Scale ----------
const x = d3
    .scaleBand()
    .domain(data.map(d => d.label))
    .range([0, width])
    .padding(0.3);

// ---------- Y Scale ----------
const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .nice()
    .range([height, 0]);

// ---------- X Axis ----------
svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

// ---------- Y Axis ----------
svg.append("g")
    .call(d3.axisLeft(y));

// ---------- Bars ----------
svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.label))
    .attr("y", d => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.value))
    .attr("fill", "#0d6efd");

// ---------- Value Labels ----------
svg.selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .attr("x", d => x(d.label) + x.bandwidth() / 2)
    .attr("y", d => y(d.value) - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "#000")
    .text(d => d.value);
``
