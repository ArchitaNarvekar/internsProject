<template>
  <div class="q-page background" id="div-bg">
    <div class="q-ml-md q-mt-xs q-mr-md">
      <div class="row inline q-mb-md cursor-pointer q-mx-sm">

        <q-card @click="redirectToDashboard('TableDashboard', 'Nucleus')" class="cardStyle">
          <q-img spinner-color="black" src="statics/Nucleus_Dashboard.png" />
          <q-separator />
          <q-card-section class="full-width">
            <div class="row justify-between">
              <div class="col text-h6 ellipsis">Table Dashboard</div>
              <div class="no-wrap items-center">
                <q-img class="absolute shadow-8" src="statics/Nucleuslogo.png"
                  style="top: 0; right: 12px; transform: translateY(-50%); width: 50px; height: 50px; border-radius: 20%;" />
                <div class="col-auto text-secondary text-subtitle2 q-pt-md row no-wrap items-center"> Nucleus </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <div class="q-mx-sm"></div>
       <q-card @click="redirectToPage('abc')" class="cardStyle">
        <q-img spinner-color="black" src="statics/607284-pothole.jpg" />
        <q-separator />
        <q-card-section class="full-width">
            <div class="row justify-between">
              <div class="col text-h6 ellipsis">GOOGLE CHARTS</div>
              <div class="no-wrap items-right">
                <div class="col-auto text-secondary text-subtitle2 q-pt-md row no-wrap items-right"> Google charts </div>
              <div class="no-wrap items-center">
                <!-- <div class="col-auto text-secondary text-subtitle2 q-pt-md row no-wrap items-center"> ANALYTICS </div> -->
              </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <div class="q-mx-sm"></div>
        <q-card @click="redirectToDashboard('test', 'Nucleus')" style="width: 350px">
          <q-img spinner-color="black" src="statics/road-pavement-defects.jpg" />
          <q-separator />
          <q-card-section class="full-width">
            <div class="row justify-between">
              <div class="col text-h6 ellipsis">Dashboard(archita)</div>
              <div class="no-wrap items-center">
                <!-- <div class="col text-subtitle1">ROAD DEFECTS</div> -->
                <div class="col-auto text-secondary text-subtitle2 q-pt-md row no-wrap items-center"> D3 charts </div>
              </div>
            </div>
          </q-card-section>
          <!-- Add the custom content below -->

        <!-- </q-card>
        <div class="q-mx-sm"></div>
        <q-card @click="redirectToDashboard('bal', 'Nucleus')" style="width: 350px">
          <q-img spinner-color="black" src="statics/road-pavement-defects.jpg" />
          <q-separator />
          <q-card-section class="full-width">
            <div class="row justify-between">
              <div class="col text-h6 ellipsis">DASHBOARD(balraj)</div>
              <div class="no-wrap items-center">
                 <div class="col text-subtitle1">ROAD DEFECTS</div>
                <div class="col-auto text-secondary text-subtitle2 q-pt-md row no-wrap items-center"> D3 charts </div>
              </div>
            </div>
          </q-card-section>
          Add the custom content below

        </q-card>
           <div class="q-mx-sm"></div>
        <q-card @click="redirectToDashboard('hari', 'Nucleus')" style="width: 350px">
          <q-img spinner-color="black" src="statics/road-pavement-defects.jpg" />
          <q-separator />
          <q-card-section class="full-width">
            <div class="row justify-between">
              <div class="col text-h6 ellipsis">DASHBOARD(hari)</div>
              <div class="no-wrap items-center">
                 <div class="col text-subtitle1">ROAD DEFECTS</div>
                <div class="col-auto text-secondary text-subtitle2 q-pt-md row no-wrap items-center"> D3 charts </div>
              </div>
            </div>
          </q-card-section> -->
          <!-- Add the custom content below -->

        </q-card>
        <!-- <div class="q-mx-sm"></div>
        <q-card @click="redirectToDashboard('test', 'Nucleus')" style="width: 350px">

          <q-separator />
          <q-card-section class="full-width">
            <div class="row justify-between">
              <div class="col text-h6 ellipsis">DATA DISPLAY</div>
              <div class="no-wrap items-center">
                <div class="col-auto text-secondary text-subtitle2 q-pt-md row no-wrap items-center"> Nucleus </div>
              </div>
            </div>
          </q-card-section>

       </q-card> -->
      </div>
    </div>
    <div class="q-ml-md q-mt-md q-mr-md">
<!--
<slot>
 put date
</slot> -->
<!-- <div class="container mt-5 text-center"> -->
  <!-- <div class="q-ml-md q-mt-md q-mr-md">
    <testChart />
  </div> -->

    </div>
    </div>
  <!-- </div> -->
</template>
<script>
import serviceHandlerMixin from './serviceHandlerMixin';
// import testChart from "src/nucleus/test.vue";
export default {
  name: 'LandingPage',
  // components: {
  //   testChart // Register the testChart component
  // },
  data() {
    return {
      selectedDateRange: null, // Holds the selected date range
    };
  },
  methods: {
    redirectToDashboard: function (dashboard, module) {
      if (module === "Nucleus" && dashboard === "TableDashboard") {
        this.$q.loading.show();
        this.$router.push("/nucleus");
      }
      if (module === "Nucleus" && dashboard === "test") {
        // this.$q.loading.show();
        this.$router.push("/test");
      }
      // if (module === "Nucleus" && dashboard === "hari") {
      //   // this.$q.loading.show();
      //   this.$router.push("/hari");
      // }
      // if (module === "Nucleus" && dashboard === "bal") {
      //   // this.$q.loading.show();
      //   this.$router.push("/bal");
      // }
    },
    redirectToPage: function (abc) {
      this.$router.push({ name: 'abc' }); // Assuming you've configured routes properly
    },
  },
  computed: {},
  mounted() { },
  mixins: [serviceHandlerMixin],
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 200px;
}

.background {
  min-height: 90vh;
  background: repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.cardStyle {
  width: 350px;
}
</style>


