document.addEventListener("DOMContentLoaded", function () {

    // ---------- Sample Enterprise Data ----------
    const data = [
        { team: "HR", compliant: 40, nonCompliant: 10 },
        { team: "Finance", compliant: 30, nonCompliant: 20 },
        { team: "IT", compliant: 55, nonCompliant: 5 },
        { team: "Operations", compliant: 25, nonCompliant: 15 },
        { team: "Security", compliant: 45, nonCompliant: 10 }
    ];

    const keys = ["compliant", "nonCompliant"];

    // ---------- Dimensions ----------
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // ---------- SVG ----------
    const svg = d3
        .select("#chartContainer")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // ---------- Scales ----------
    const x = d3.scaleBand()
        .domain(data.map(d => d.team))
        .range([0, width])
        .padding(0.3);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.compliant + d.nonCompliant)])
        .nice()
        .range([height, 0]);

    const color = d3.scaleOrdinal()
        .domain(keys)
        .range(["#198754", "#dc3545"]); // green / red

    // ---------- Axes ----------
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    // ---------- Tooltip ----------
    const tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("background", "#fff")
        .style("border", "1px solid #ccc")
        .style("padding", "6px 10px")
        .style("border-radius", "4px")
        .style("font-size", "12px")
        .style("pointer-events", "none")
        .style("opacity", 0);

    // ---------- Stack ----------
    const stack = d3.stack().keys(keys);
    const stackedData = stack(data);

    // ---------- Bars ----------
    const layers = svg.selectAll("g.layer")
        .data(stackedData)
        .enter()
        .append("g")
        .attr("class", "layer")
        .attr("fill", d => color(d.key));

    const bars = layers.selectAll("rect")
        .data(d => d)
        .enter()
        .append("rect")
        .attr("x", d => x(d.data.team))
        .attr("width", x.bandwidth())
        .attr("y", height)
        .attr("height", 0)
        .on("mouseover", function (event, d) {
            tooltip
                .style("opacity", 1)
                .html(`
                    <strong>${d.data.team}</strong><br/>
                    Compliant: ${d.data.compliant}<br/>
                    Non‑Compliant: ${d.data.nonCompliant}
                `);
        })
        .on("mousemove", function (event) {
            tooltip
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", function () {
            tooltip.style("opacity", 0);
        });

    // ---------- Initial Animation ----------
    function animateBars() {
        bars
            .transition()
            .duration(1200)
            .delay((d, i) => i * 120)
            .attr("y", d => y(d[1]))
            .attr("height", d => y(d[0]) - y(d[1]));
    }

    animateBars();

    // ---------- Re‑Animate Button ----------
    document.getElementById("btnRedraw").addEventListener("click", () => {
        bars
            .transition()
            .duration(600)
            .attr("y", height)
            .attr("height", 0)
            .on("end", animateBars);
    });
});
