<template>
  <div id="app">
    <div class="chart-container">
      <svg ref="chartYear"></svg>
      <svg ref="chartMonth"></svg>
      <svg ref="chartWeek"></svg>
      <!-- <svg ref="chartDay"></svg> -->
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
    this.drawCharts();
  },
  methods: {
    drawCharts() {
      this.drawChartForInterval('year', this.$refs.chartYear);
      this.drawChartForInterval('month', this.$refs.chartMonth);
      this.drawChartForInterval('week', this.$refs.chartWeek);
      this.drawChartForInterval('day', this.$refs.chartDay);
    },
    drawChartForInterval(interval, chartRef) {
      // Clear the previous chart
      d3.select(chartRef).selectAll('*').remove();

      const margin = { top: 20, right: 30, bottom: 40, left: 40 };
      const width = 500 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const svg = d3.select(chartRef)
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

      const counts = {};

      this.jsonData.ResponseJson.Communications.forEach(data => {
        const createdAt = new Date(data.Detail.CreatedOn);
        const timeKey = this.getTimeKey(createdAt, interval);

        if (!counts[timeKey]) {
          counts[timeKey] = {
            created: 0,
            verified: 0,
            fixed: 0,
          };
        }

        // counts[timeKey].created += data.Detail.CreatedOn ? 1 : 0;
        counts[timeKey].verified += data.Detail.VerifiedOn ? 1 : 0;
        // counts[timeKey].fixed += data.Detail.FixedOn ? 1 : 0;
      });

      const timeKeys = Object.keys(counts);

      const x = d3.scaleBand()
          .domain(timeKeys)
          .range([0, width])
          .padding(0.1);

      const y = d3.scaleLinear()
          .domain([0, d3.max(timeKeys, key => Math.max(counts[key].created, counts[key].verified, counts[key].fixed))])
          .nice()
          .range([height, 0]);

      const color = d3.scaleOrdinal()
          .domain(['created', 'verified', 'fixed'])
          .range(['steelblue', 'orange', 'green']);

      svg.selectAll('.bar-group')
          .data(timeKeys)
          .enter().append('g')
          .attr('class', 'bar-group')
          .attr('transform', d => `translate(${x(d)},0)`)
          .selectAll('.bar')
          .data(d => ['created', 'verified', 'fixed'].map(key => ({ key, value: counts[d][key] || 0 })))
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', d => x.bandwidth() / 3 )
          .attr('y', d => y(d.value))
          .attr('width', x.bandwidth() / 3)
          .attr('height', d => height - y(d.value))
          .attr('fill', d => color(d.key));

      svg.append('g')
          .attr('class', 'x-axis')
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(x));

      svg.append('g')
          .attr('class', 'y-axis')
          .call(d3.axisLeft(y).ticks(5));
    },
    getTimeKey(date, interval) {
      if (interval === 'month') {
        return date.toLocaleString('default', { month: 'long' });
      } else if (interval === 'year') {
        return date.getFullYear().toString();
      } else if (interval === 'week') {
        return 'Week ' + Math.ceil(date.getDate() / 7);
      } else if (interval === 'day') {
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      }
      return '';
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

.bar:hover {
  opacity: 1;
}</style>
