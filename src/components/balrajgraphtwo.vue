<template>
  <div>
    <h2>NUMBER OF COMPLAINT CREATED, VERIFIED, AND FIXED</h2>
    <button @click="toggleView">Toggle View</button>
    <GChart type="ComboChart" :options="options" :data="chartData" />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
import jsonData from "../nucleus/DashboardData.json"; // Update the path accordingly

export default {
  name: "ChartDemo",
  components: {
    GChart
  },
  data() {
    return {
      chartData: [],
      options: {
        width: 1100,
        height: 400,
        seriesType: "bars",
        series: {
          0: { type: "line" }, // Created On as line chart
          1: { type: "bars" }, // Verified On as bar chart
          2: { type: "bars" }  // Fixed On as bar chart
        }
      },
      showByDate: true // Flag to indicate the current view mode
    };
  },
  created() {
    this.generateChartData();
  },
  methods: {
    generateChartData() {
      const communications = jsonData.ResponseJson.Communications;

      // Initialize counts
      const countsPerDay = {}; // Object to store counts for each day
      const countsPerMonth = {}; // Object to store counts for each month

      // Count occurrences of CreatedOn, VerifiedOn, and FixedOn
      communications.forEach(communication => {
        const createdDate = new Date(communication.Detail.CreatedOn);
        const createdDay = createdDate.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short"
        });
        const createdMonth = createdDate.toLocaleDateString("en-US", {
          month: "short"
        });

        if (!countsPerDay[createdDay]) {
          countsPerDay[createdDay] = { created: 0, verified: 0, fixed: 0 };
        }
        if (!countsPerMonth[createdMonth]) {
          countsPerMonth[createdMonth] = { created: 0, verified: 0, fixed: 0 };
        }

        if (communication.Detail.CreatedOn) {
          countsPerDay[createdDay].created++;
          countsPerMonth[createdMonth].created++;
        }
        if (communication.Detail.VerifiedOn) {
          countsPerDay[createdDay].verified++;
          countsPerMonth[createdMonth].verified++;
        }
        if (communication.Detail.FixedOn) {
          countsPerDay[createdDay].fixed++;
          countsPerMonth[createdMonth].fixed++;
        }
      });

      // Prepare data for the chart based on the current view mode
      const chartData = this.showByDate
        ? [["Day", "Created no", "Verified no", "Fixed no"]]
        : [["Month", "Created no", "Verified no", "Fixed no"]];

      const countsData = this.showByDate ? countsPerDay : countsPerMonth;

      for (const key in countsData) {
        chartData.push([
          key,
          countsData[key].created,
          countsData[key].verified,
          countsData[key].fixed
        ]);
      }

      this.chartData = chartData;
    },
    toggleView() {
      this.showByDate = !this.showByDate;
      this.generateChartData();
    }
  }
};
</script>
