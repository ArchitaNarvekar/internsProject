<template>
  <div class="blank-page">
    <h1>Empty Page with Google Chart</h1>
    <div class="container mt-5 text-center">
      <GoogleChart />
      <graphline />
    </div>
  </div>
</template>

<script>
import GoogleChart from "src/components/GoogleChart.vue";
import graphline from "src/components/graphline.vue";

export default {
  components: {
    GoogleChart,
    graphline,
  },
};
</script>
