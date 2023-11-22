<template>
  <div>
    <div class="background-container">
      <!-- <q-img
        spinner-color="black"
        src="statics/Road-Defects-Can-Be-a-Major-Cause-of-Traffic-Accidents.jpg"
        class="background-image"
      ></q-img> -->
    </div>
    <div class="content-container">
          <h3> DATA OF ROAD DEFECTS</h3>
          <div class="row inline q-mb-md cursor-pointer q-mx-sm">

            <q-card  class="cardStyle">
              <q-card-section class="full-width">
                <div class="row justify-between">
                  <div class="col text-h6 ellipsis" style="font-weight: bold; color: black;">DATA DISPLAY</div>
                  <div class="no-wrap items-center">
                    <!-- <div class="col-auto text-secondary text-subtitle2 q-pt-md row no-wrap items-center"> Nucleus </div> -->
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <div class="row justify-between">
                  <div class="col text-subtitle1">Cerified On</div>
                  <div class="col text-subtitle1">Days</div>
                  <div class="col text-subtitle1">Count :{{ createdCount }}</div>
                </div>
                <div class="row justify-between">
                  <div class="col"> </div>
                  <div class="col"> </div>
                  <div class="col"> </div>
                </div>
                <div class="row justify-between">
                  <div class="col"> </div>
                  <div class="col"> </div>
                  <div class="col"> </div>
                </div>
                <!-- Add more rows as needed -->
              </q-card-section>
              <q-card-section>
                </q-card-section>
            </q-card>

            <q-card  class="cardStyle">
              <q-card-section class="full-width">
                <div class="row justify-between">
                  <div class="col text-h6 ellipsis" style="font-weight: bold; color: black;">DATA DISPLAY</div>
                  <div class="no-wrap items-center">
                    <!-- <div class="col-auto text-secondary text-subtitle2 q-pt-md row no-wrap items-center"> Nucleus </div> -->
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <div class="row justify-between">
                  <div class="col text-subtitle1">Fixed On</div>
                  <div class="col text-subtitle1">Days</div>
                  <div class="col text-subtitle1">Count :{{ fixedCount }}</div>
                </div>
                <div class="row justify-between">
                  <div class="col"> </div>
                  <div class="col"> </div>
                  <div class="col"> </div>
                </div>
                <div class="row justify-between">
                  <div class="col"> </div>
                  <div class="col"> </div>
                  <div class="col"> </div>
                </div>
                <!-- Add more rows as needed -->
              </q-card-section>
              <q-card-section>
                </q-card-section>
            </q-card>

            <q-card  class="cardStyle">
              <q-card-section class="full-width">
                <div class="row justify-between">
                  <div class="col text-h6 ellipsis" style="font-weight: bold; color: black;">DATA DISPLAY</div>
                  <div class="no-wrap items-center">
                    <!-- <div class="col-auto text-secondary text-subtitle2 q-pt-md row no-wrap items-center"> Nucleus </div> -->
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <div class="row justify-between">
                  <div class="col text-subtitle1">Verified On</div>
                  <div class="col text-subtitle1">Days</div>
                  <div class="col text-subtitle1">Count :{{ verifiedCount }}</div>
                </div>
                <div class="row justify-between">
                  <div class="col"> </div>
                  <div class="col"> </div>
                  <div class="col"> </div>
                </div>
                <div class="row justify-between">
                  <div class="col"> </div>
                  <div class="col"> </div>
                  <div class="col"> </div>
                </div>
                <!-- Add more rows as needed -->
              </q-card-section>
              <q-card-section>
                </q-card-section>
            </q-card>
          </div>
          <!-- Date Picker Section -->
          <div class="q-mx-sm"></div>

          <!-- <q-date
      v-model="selectedDateRange"
      mask="DD-MM-YYYY"
      format="DD-MM-YYYY"
      @input="handleDateRangeChange"
      use-input
    >
      <template v-slot:default="{ ref, value, inputValue, toggle }">
        <q-input ref="input" v-model="inputValue" dense placeholder="Select date" readonly clearable @click.native="toggle" />
      </template>
    </q-date> -->
          <div class="q-mx-sm"></div>
          <!-- <slot> select the date for that particular date data.</slot> -->
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <!-- D3.js Pie Chart Section -->
          <div class="container mt-5 text-center">
            <div class="q-ml-md q-mt-md q-mr-md" style="display: flex; justify-content: center; align-items: center;">

              <dthree />
              <verified />
            </div>
          </div>
    <!-- </q-img> -->
  </div>
  </div>
</template>




<script>
import dthree from "src/components/dthree.vue";
import verified from "src/components/verified.vue";
import jsonData from "../nucleus/DashboardData.json";
export default {
  components: {
    dthree,
    verified,
  },
  data() {
    return {
      createdCount: 0,
      verifiedCount: 0,
      fixedCount: 0,
      selectedDateRange: "", // Holds the selected date range in DD-MM-YYYY format
    };
  },
  methods: {
    handleDateRangeChange() {
      // Handle the date range change here
      // You can use the this.selectedDateRange value for processing
    },
  },
  created() {
    const communications = jsonData.ResponseJson.Communications;

    // Initialize counts


    // Count occurrences of CreatedOn, VerifiedOn, and FixedOn
    communications.forEach(communication => {
      if (communication.Detail.CreatedOn) {
        this.createdCount++;
      }
      if (communication.Detail.VerifiedOn) {
        this.verifiedCount++;
      }
      if (communication.Detail.FixedOn) {
        this.fixedCount++;
      }
    });
  }
};
</script>
<style scoped>
.q-card {
  width: 575px;
  margin-right: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.q-card-section {
  padding: 10px;
  border-radius: 4px;
}

.text-subtitle1 {
  font-size: 1rem;
  font-weight: 500;
  color: black;
  /* Set text color to black */
}

.cardStyle {
  max-width: 3000px;
}

.q-mb-xs {
  margin-bottom: 8px;
}
.background-container {
  position: relative;
  filter: blur(5px); /* Adjust the blur amount as needed */
}

.background-image {
  width: 100%;
  height: 100%;
}

.content-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-weight: bold;
  /* Add any additional styling for your content container here */
}
</style>
