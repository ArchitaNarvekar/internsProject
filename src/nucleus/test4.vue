<!-- fixed and created -->

<template>
  <div>
    <h7 class="chart-title">DIFFERENCE OF FIXED-ON W.R.T. CREATED-ON</h7>
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
  name: 'App2',
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
      const width = 500 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

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
        .range(['orange', 'red']);

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
          created: counts[timeKey].total - counts[timeKey].created === 0 ? 400 : 0 ,
          fixed: counts[timeKey].total - counts[timeKey].fixed,
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
</style>
