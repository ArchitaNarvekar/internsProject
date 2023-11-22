<!-- <template>
  <div class="blank-page">
    <h1>Empty Page with Google Chart</h1>
   <div class="container mt-5 text-center">
    <GoogleChart />
  </div>

  </div>
</template>

<script>
import GoogleChart from "src/components/GoogleChart.vue";
import GoogleChart from "src/components/graphline.vue";
export default {
  components: {
    GoogleChart,
  },
};
</script> -->



<template>
  <div class="blank-page">
    <h1>Empty Page with Google Chart</h1>
    <div class="container mt-5 text-center">
      <h3>Archita</h3>
      <GoogleChart />
      <graphline />
      <h3>Hari</h3>
      <harigraphone />
      <harigraphtwo />
      <h3>Balraj</h3>
      <balrajgraphone />
      <balrajgraphtwo />
    </div>
  </div>
</template>

<script>
import GoogleChart from "src/components/GoogleChart.vue";
import graphline from "src/components/graphline.vue";
import harigraphone from "src/components/harigraphone.vue";
import harigraphtwo from "src/components/harigraphtwo.vue";
import balrajgraphone from "src/components/balrajgraphone.vue";
import balrajgraphtwo from "src/components/balrajgraphtwo.vue";
export default {
  components: {
    GoogleChart,
    graphline,
    harigraphone,
    harigraphtwo,
    balrajgraphone,
    balrajgraphtwo
  },
};
</script>
