<!-- <template>
  <div>
    <h4>Vue.js and D3 Pie Chart</h4>
    <svg ref="chart"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import jsonData from "../nucleus/DashboardData.json"; // Update the path accordingly

export default {
  mounted() {
    const width = 450;
    const height = 450;

    const svg = d3.select(this.$refs.chart)
      .attr("width", width)
      .attr("height", height);

    const communications = jsonData.ResponseJson.Communications;

    // Initialize counts
    let createdCount = 0;
    let verifiedCount = 0;
    let fixedCount = 0;

    // Count occurrences of CreatedOn, VerifiedOn, and FixedOn
    communications.forEach(communication => {
      if (communication.Detail.CreatedOn) {
        createdCount++;
      }
      if (communication.Detail.VerifiedOn) {
        verifiedCount++;
      }
      if (communication.Detail.FixedOn) {
        fixedCount++;
      }
    });

    const total = createdCount + verifiedCount + fixedCount;

    const data = [
      { label: "Created On", value: createdCount },
      { label: "Verified On", value: verifiedCount },
      { label: "Fixed On", value: fixedCount },
    ];

    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const arcs = g.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.label));

    arcs.append("text")
      .attr("transform", d => {
        const centroid = arc.centroid(d);
        const x = centroid[0];
        const y = centroid[1];
        const angle = Math.atan2(y, x);
        const angleDeg = angle * (180 / Math.PI);
        const rotate = angleDeg > 90 ? angleDeg + 180 : angleDeg;
        return `translate(${x},${y}) rotate(${rotate})`;
      })
      .attr("dy", "0.35em")
      .attr("text-anchor", d => (d.endAngle + d.startAngle) / 2 > Math.PI ? "end" : "start")
      .text(d => `${d.data.label} (${((d.value / total) * 100).toFixed(2)}%)`);
  },
};
</script>

<style scoped>
.arc text {
  font-size: 12px;
  text-anchor: middle;
}
</style> -->

<!-- <template>
  <div>
    <h4>Vue.js and D3 Bar Chart</h4>
    <svg ref="chart"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import jsonData from "../nucleus/DashboardData.json"; // Update the path accordingly

export default {
  mounted() {
    const width = 450;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    const svg = d3.select(this.$refs.chart)
      .attr("width", width)
      .attr("height", height);

    const communications = jsonData.ResponseJson.Communications;

    // Initialize counts
    let createdCount = 0;
    let verifiedCount = 0;
    let fixedCount = 0;

    // Count occurrences of CreatedOn, VerifiedOn, and FixedOn
    communications.forEach(communication => {
      if (communication.Detail.CreatedOn) {
        createdCount++;
      }
      if (communication.Detail.VerifiedOn) {
        verifiedCount++;
      }
      if (communication.Detail.FixedOn) {
        fixedCount++;
      }
    });

    const data = [
      { label: "Created On", value: createdCount },
      { label: "Verified On", value: verifiedCount },
      { label: "Fixed On", value: fixedCount },
    ];

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg.selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("x", d => xScale(d.label))
      .attr("y", d => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(0) - yScale(d.value))
      .attr("fill", d => color(d.label));

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

  },
};
</script>

<style scoped>
.axis text {
  font-size: 12px;
}
</style> -->

<!-- <template>
  <div>
    <h2>AVERAGE NUMBER OF DAYS REQUIRED</h2>
    <h4>Vue.js and D3 Bar Chart for Verification and Fixed</h4>
    <div class="radio-buttons">
      <label>
        <input type="radio" v-model="selectedView" value="day" /> Day
      </label>
      <label>
        <input type="radio" v-model="selectedView" value="month" /> Month
      </label>
      <label>
        <input type="radio" v-model="selectedView" value="week" /> Week
      </label>
    </div>
    <svg ref="chart"></svg>
  </div>
</template>

<script>
import jsonData from "../nucleus/DashboardData.json"; // Update the path accordingly
import * as d3 from "d3";

export default {
  data() {
    return {
      selectedView: "day"
    };
  },
  mounted() {
    const width = 1100;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    const svg = d3.select(this.$refs.chart)
      .attr("width", width)
      .attr("height", height);

    const communications = jsonData.ResponseJson.Communications;

    // Initialize counters
    let verificationDaysSum = 0;
    let fixedDaysSum = 0;
    let createdDaysSum = 0;
    let countWithVerification = 0;
    let countWithFixed = 0;
    let countWithCreated = 0;

    communications.forEach(communication => {
      const createdDate = new Date(communication.Detail.CreatedOn);
      if (communication.Detail.VerifiedOn) {
        const verifiedDate = new Date(communication.Detail.VerifiedOn);
        const daysForVerification = Math.floor(
          (verifiedDate - createdDate) / (1000 * 60 * 60 * 24)
        );
        verificationDaysSum += daysForVerification;
        countWithVerification++;
      }
      if (communication.Detail.FixedOn) {
        const fixedDate = new Date(communication.Detail.FixedOn);
        const daysForFixed = Math.floor(
          (fixedDate - createdDate) / (1000 * 60 * 60 * 24)
        );
        fixedDaysSum += daysForFixed;
        countWithFixed++;
      }
      const daysForCreated = Math.floor(
        (new Date() - createdDate) / (1000 * 60 * 60 * 24)
      );
      createdDaysSum += daysForCreated;
      countWithCreated++;
    });

    const avgVerificationDays = countWithVerification
      ? verificationDaysSum / countWithVerification
      : 0;
    const avgFixedDays = countWithFixed ? fixedDaysSum / countWithFixed : 0;
    const avgCreatedDays = countWithCreated
      ? createdDaysSum / countWithCreated
      : 0;

    const data = [
      { event: "Verification", averageDays: avgVerificationDays },
      { event: "Fixed", averageDays: avgFixedDays },
      { event: "CreatedOn", averageDays: avgCreatedDays }
    ];

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.event))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.averageDays)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("x", d => xScale(d.event))
      .attr("y", d => yScale(d.averageDays))
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(0) - yScale(d.averageDays))
      .attr("fill", "steelblue");

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // Display average value text labels
    svg.selectAll(".average-label")
      .data(data)
      .enter().append("text")
      .attr("class", "average-label")
      .attr("x", d => xScale(d.event) + xScale.bandwidth() / 2)
      .attr("y", d => yScale(d.averageDays) - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text(d => d.averageDays.toFixed(2));
  },
};
</script>

<style scoped>
.axis text {
  font-size: 12px;
}
</style> -->
<template>
  <div>
    <h7 class="chart-title">PROBABILITY OF THE FIXEDON WITH RESPECT TO CREATEDON</h7>
    <br>
  </div>

  <div id="app">
    <div class="chart-options">
      <label>
        <input type="radio" value="month" v-model="timeInterval" @change="drawChart" />
        Month
      </label>
      <label>
        <input type="radio" value="week" v-model="timeInterval" @change="drawChart" />
        Week
      </label>
      <label>
        <input type="radio" value="year" v-model="timeInterval" @change="drawChart" />
        Year
      </label>
    </div>
    <div class="chart-container">
      <svg ref="chart"></svg>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import jsonData from '../nucleus/DashboardData.json';

export default {
  name: 'App',
  data() {
    return {
      jsonData,
      timeInterval: 'month', // Default time interval
    };
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      // Clear the previous chart
      d3.select(this.$refs.chart).selectAll('*').remove();

      const margin = { top: 20, right: 30, bottom: 60, left: 60 }; // Adjusted bottom margin for axis labels
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const svg = d3.select(this.$refs.chart)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const timeKeys = this.getTimeKeys();
      timeKeys.sort((a, b) => {
      const weekA = parseInt(a.replace('Week ', ''));
      const weekB = parseInt(b.replace('Week ', ''));
      return weekA - weekB;
    });

      const counts = this.getCounts(timeKeys);

      const avgCounts = this.calculateAverageCounts(counts);

      const x = d3.scaleBand()
        .domain(timeKeys)
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(timeKeys, key => Math.max(avgCounts[key].created, avgCounts[key].fixed))])
        .nice()
        .range([height, 0]);

      const color = d3.scaleOrdinal()
        .domain(['created', 'fixed'])
        .range(['steelblue', 'red']);

      svg.selectAll('.bar-group')
        .data(timeKeys)
        .enter().append('g')
        .attr('class', 'bar-group')
        .attr('transform', d => `translate(${x(d)},0)`)
        .selectAll('.bar')
        .data(d => ['created', 'fixed'].map(key => ({ key, value: avgCounts[d][key] || 0 })))
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x.bandwidth() / 2 * (d.key === 'fixed' ? 1 : 0))
        .attr('y', d => y(d.value))
        .attr('width', x.bandwidth() / 2)
        .attr('height', d => height - y(d.value))
        .attr('fill', d => color(d.key))
        .append('title')
        .text(d => `${d.key}: ${d.value.toFixed(2)}`);


      svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        // .selectAll('text') // Rotate x-axis labels for better readability
        // .attr('transform', 'rotate(-45)')
        // .attr('text-anchor', 'end');

      svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y).ticks(5));
    },
    getTimeKeys() {
      return this.jsonData.ResponseJson.Communications.map(data => {
        const createdAt = new Date(data.Detail.CreatedOn);
        if (this.timeInterval === 'month') {
          return createdAt.toLocaleString('default', { month: 'long' });
        } else if (this.timeInterval === 'week') {
          return 'Week ' + Math.ceil(createdAt.getDate() / 7);
        } else if (this.timeInterval === 'year') {
          return createdAt.getFullYear().toString();
        }
        return '';
      });
    },
    getCounts(timeKeys) {
      const counts = {};
      timeKeys.forEach((timeKey, index) => {
        const data = this.jsonData.ResponseJson.Communications[index];
        if (!counts[timeKey]) {
          counts[timeKey] = {
            created: 0,
            fixed: 0,
            total: 0,
          };
        }
        counts[timeKey].created += data.Detail.CreatedOn ? 1 : 0;
        counts[timeKey].fixed += data.Detail.FixedOn ? 1 : 0;
        counts[timeKey].total += 1;
      });
      return counts;
    },
    calculateAverageCounts(counts) {
      const avgCounts = {};
      Object.keys(counts).forEach(timeKey => {
        avgCounts[timeKey] = {
          created: counts[timeKey].created / counts[timeKey].total,
          fixed: counts[timeKey].fixed / counts[timeKey].total,
        };
      });
      return avgCounts;
    },
  },
};
</script>

<style>
#app {
  text-align: center;
  padding: 20px;
}

.chart-options {
  margin-bottom: 20px;
}

.chart-options label {
  margin-right: 10px;
}

.chart-container {
  margin-bottom: 30px;
}

.bar {
  opacity: 0.7;
  transition: opacity 0.2s;
}
.chart-wrapper {
  text-align: center;
}

.chart-title {
  margin: 0 auto; /* Center horizontally */
  padding-top: 20px; /* Add some space above the title */
}
.bar:hover {
  opacity: 1;
}
.bold-text {
  font-weight: bold;
}

/* Apply the bold-text class to the desired element */
.chart-title {
  font-size: 16px; /* Adjust font size as needed */
}


</style>

