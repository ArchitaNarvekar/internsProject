<template>
  <div>
    <h2>NUMBER OF COMPLAINT CREATED  VERIFIED AND FIXED</h2>
    <GChart type="ColumnChart" :options="options" :data="chartData" />
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
        height: 400
      }
    };
  },
  created() {
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

    // Prepare data for the chart
    this.chartData = [
      ["Event", "Count",{ role: 'style' }],
      ["Created On", createdCount,'#6B58C5'],
      ["Verified On", verifiedCount, '#00B28F'],
      ["Fixed On", fixedCount,'#F8D12F']
    ];
  }
};
</script>











