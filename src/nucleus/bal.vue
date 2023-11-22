<!-- <template>
  <div class="q-page background" id="div-bg">
    <div class="q-pa-md">
      <q-toolbar class="bg-primary glossy text-white">
        <div>SELECT THE GRAPH .</div>
        <select v-model="selectedOptions" id="select-option" label="Form or USER DETAILS" outlined
          style="  padding-top: 5%; width: 90px; margin-top: 0.25%; height: 5px" required>
          <option v-for="option in optionss" :value="option.value" :key="option.value">
            {{ option.label }}
          </option>
        </select>
        <q-btn @click="$router.push('/theHub')" style="
                width: 90px;
                height: 50px;
                margin-top :0.5%;
                padding: 2%;
                margin-left: 900px;
              " class="bg-info text-white q-pa-sm">BACK</q-btn>
      </q-toolbar>
    </div>
    <q-img src="./back.png" style="height: 1100px;" class="background-image"
>
      <div class="row inline q-mb-md cursor-pointer q-mx-sm q-pa-md">
        <q-card dark bordered class="bg-grey-9 my-card">
          <q-card-section>
            <div class="text-h6">TOTAL NUMBER OF COMPLAINT</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section>
            {{ createdCount }}
          </q-card-section>
        </q-card>
        <q-card dark bordered class="bg-grey-9 my-card">
          <q-card-section>
            <div class="text-h6">NUMBER OF COMPLAINT VERIFIED</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section>
            {{ verifiedCount }}
          </q-card-section>
        </q-card>
        <q-card dark bordered class="bg-grey-9 my-card">
          <q-card-section>
            <div class="text-h6">NUMBER OF COMPLAINT FIXED</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section>
            {{ fixedCount }}
          </q-card-section>
        </q-card>
      </div>
      <br><br><br><br><br><br><br><br>
      <div class="q-pa-md">
      <div class="q-pb-sm">
        Model: {{ model }}
      </div>
      <q-date v-model="model" range class="custom-date-picker" />
    </div>
      <div class="row inline q-mb-md cursor-pointer q-mx-sm q-pa-md">

        <q-card dark bordered class="bg-grey-9 my-card">
          <q-card-section>
            To Find Status Of Your Complaint
          </q-card-section>
          <q-separator dark inset />
          <q-card-section>
            <label for="idInput">Enter ID:</label>
            <input type="number" id="idInput" v-model="inputId">
            <button @click="getData">Fetch Data</button>
            <button @click="cleardata">Clear Data</button>
          </q-card-section>
        </q-card>
        <q-card dark bordered class="bg-grey-9 my-card">

          <q-card-section>
            <div v-if="data">
              <p>WorkflowDataTypeName: {{ this.WorkflowDataTypeName }}</p>
              <q-separator dark inset />

              <p>Name: {{ this.name }}</p>
              <q-separator dark inset />

              <p>CreatedOn: {{ this.CreatedOn }}</p>
              <q-separator dark inset />

              <p>VerifiedOn: {{ this.VerifiedOn }}</p>
              <q-separator dark inset />
            </div>
          </q-card-section>

        </q-card>
        <q-card dark bordered class="bg-grey-9 my-card">
          <q-card-section>
            <div v-if="data">


              <p>FixedOn: {{ this.FixedOn }}</p>
              <q-separator dark inset />

              <p>Geom: {{ this.Geom }}</p>
              <q-separator dark inset />

              <p>ConstituencyId: {{ this.ConstituencyId }}</p>
              <q-separator dark inset />

              <p>SubDivision: {{ this.SubDivision }}</p>
            </div>
            <div v-else>
              <p>No data available</p>
            </div>
          </q-card-section>

        </q-card>
      </div>
      <br><br><br><br><br><br><br><br><br><br>

      <div style="background-color:black;">
          <div v-if="selectedOptions === 'Null'">
          </div>
          <div v-if="selectedOptions === 'Created'">
            <div class="col-6">
              <div> NO OF COMPLAINT CREATED</div>
              <created />
            </div>
          </div>
          <div v-if="selectedOptions === 'Fixed'">
            <div class="col-6">
              <div> NO OF COMPLAINT FIXED</div>
              <fixed />
            </div>
          </div>
          <div v-if="selectedOptions === 'Verified'">
            <div class="col-6">
              <div> NO OF COMPLAINT VERIFIED</div>
              <verified />
            </div>
          </div>
      </div>
    </q-img>
  </div>
</template>
<script>
import created from '../components/created.vue';
import fixed from '../components/fixed.vue'
import verified from '../components/verified1.vue';

import jsonData from "../nucleus/DashboardData.json";
import { ref } from 'vue'


export default {
  name: "DashBoard",
  components: {
    created,
    fixed,
    verified
  },
  setup() {
    return {
      model: ref({ from: '2023/08/08', to: '2023/08/17' }),
      // text: ref(''),
      // ph: ref(''),
    }
  },
  data() {
    return {
      createdCount: 0, // Initialize createdCount as a data property
      verifiedCount: 0, // You can also initialize other counts here
      fixedCount: 0,
      createdCounts: 0, // Initialize createdCount as a data property
      verifiedCounts: 0, // You can also initialize other counts here
      fixedCounts: 0,
      name: "",
      VerifiedOn: "",
      FixedOn: "",
      CreatedOn: "",
      ConstituencyId: "",
      SubDivision: "",
      WorkflowDataTypeName: "",
      Geom: "",
      selectedOptions: "",
      optionss: [
        { label: "Created", value: "Created" },
        { label: "Fixed", value: "Fixed" },
        { label: "Verified", value: "Verified" },
        { label: "Null", value: "Null" },
      ],
      inputId: null,
      data: null,
      jsonData: jsonData
    };
  },
  mounted() {
    this.$q.loading.hide();
  },
  created() {
    const communications = jsonData.ResponseJson.Communications;

    // Count occurrences of CreatedOn, VerifiedOn, and FixedOn
    communications.forEach(communication => {

      if (communication.Detail.CreatedOn) {
        this.createdCount++; // Increment the createdCount data property
      }
      if (communication.Detail.VerifiedOn) {
        this.verifiedCount++;
      }
      if (communication.Detail.FixedOn) {
        this.fixedCount++;
      }
    });

  },
  methods: {
    getData() {
      const communications = jsonData.ResponseJson.Communications;

      communications.forEach(communication => {
        if (communication.EntityId === this.inputId) {
          this.data = true;
          this.name = communication.Detail.Name
          this.VerifiedOn = communication.Detail.VerifiedOn
          this.FixedOn = communication.Detail.FixedOn
          this.CreatedOn = communication.Detail.CreatedOn
          this.WorkflowDataTypeName = communication.WorkflowDataTypeName
          this.Geom = communication.Geom
          this.ConstituencyId = communication.Detail.ConstituencyId
          this.SubDivision = communication.Detail.SubDivision
        }
      });
    },
    cleardata() {
      this.data = false;
      this.inputId = null
    }
  }
}
</script>
<style>
.custom-date-picker {
  /* Change the color properties to your desired color */
  color: #000000;
  /* Text color */
  background-color: #ffffcc;
  /* Background color */
  border: 1px solid #000000;
  /* Border color */
}

.q-dialog__backdrop.fixed-full {
  background-image: blur(400px);
}
.background-container {
  position: relative;
  filter: blur(50px); /* Adjust the blur amount as needed */
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
  /* Add any additional styling for your content container here */
}

</style>
<style lang="sass" scoped>
.shadow-box
  width: 120px
  height: 120px
  margin: 120px
  border-radius: 10%
  font-size: 10px
  background-color: $dark
  color: $negative

</style> -->
