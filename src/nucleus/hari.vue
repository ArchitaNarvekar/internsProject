<!-- <template>
  <div class="q-page background" id="div-bg">
     <h4 style="text-align: center;">ROAD DEFECT COMPLAINTS</h4>
     <div class="q-ml-md q-mt-xs q-mr-md">

       cursor-pointer

       <div class="row inline q-mb-md">
         <q-card style="width: 260px" class="bg-light-green-2">
   <q-card-section class="full-width">
     <div class="row justify-between">
       <div class="col text-h6 ellipsis">Created Count : {{ createdCount }}</div>
     </div>
   </q-card-section>
   <q-separator />

   <q-card-section>
     <div class="text-center">
       <div class="q-pa-md">
         <q-img
           class="shadow-8"
           src="../assets/car.webp"
           style="width: 70px; height: 70px; border-radius: 50%;"
         />
       </div>
     </div>
   </q-card-section>

    <q-separator />
    <q-card-section>
   </q-card-section>
 </q-card>


 <q-card style="width: 260px" class="bg-light-green-2">
   <q-card-section class="full-width">
     <div class="row justify-between">
       <div class="col text-h6 ellipsis">Fixed Count : {{ fixedCount }}</div>
     </div>
   </q-card-section>
   <q-separator />

   <q-card-section>
     <div class="text-center">
       <div class="q-pa-md">
         <q-img
           class="shadow-8"
           src="../assets/car.webp"
           style="width: 70px; height: 70px; border-radius: 50%;"
         />
       </div>
     </div>
   </q-card-section>

   <q-separator /> -->
   <!-- <q-card-section>
   </q-card-section>
 </q-card>


 <q-card style="width: 260px" class="bg-light-green-2">
   <q-card-section class="full-width">
     <div class="row justify-between">
       <div class="col text-h6 ellipsis">Verified Count : {{ verifiedCount }}</div>
     </div>
   </q-card-section>
   <q-separator />

   <q-card-section>
     <div class="text-center">
       <div class="q-pa-md">
         <q-img
           class="shadow-8"
           src="../assets/car.webp"
           style="width: 70px; height: 70px; border-radius: 50%;"
         />
       </div>
     </div>
   </q-card-section>
 </q-card>



 <q-card style="width: 260px" class="bg-light-green-2">
   <q-card-section class="full-width">
     <div class="row justify-between">
       <div class="col text-h6 ellipsis">Total Completed : {{ completedCount }}</div>
     </div>
   </q-card-section>
   <q-separator />

   <q-card-section>
     <div class="text-center">
       <div class="q-pa-md">
         <q-img
           class="shadow-8"
           src="../assets/car.webp"
           style="width: 70px; height: 70px; border-radius: 50%;"
         />
       </div>
     </div>
   </q-card-section>
 </q-card>


 <q-card style="width: 260px" class="bg-light-green-2">
   <q-card-section class="full-width">
     <div class="row justify-between">
       <div class="col text-h6 ellipsis">Total Remaining : {{ remainingCount }}</div>
     </div>
   </q-card-section>
   <q-separator />

   <q-card-section>
     <div class="text-center">
       <div class="q-pa-md">
         <q-img
           class="shadow-8"
           src="../assets/car.webp"
           style="width: 70px; height: 70px; border-radius: 50%;"
         />
       </div>
     </div>
   </q-card-section>
 </q-card>

         <div class="container mt-5 text-center">
       <div class="q-ml-md q-mt-md q-mr-md" style="display: flex; justify-content: center; align-items: center;">
         <App1/>
         <App2/>
       </div>
     </div>

       </div>
     </div>
   </div>
 </template>


 <script>
 // import file from "./test2.vue";
 import App1 from "./test3.vue";
 import App2 from "./test4.vue";

 import { defineComponent } from 'vue'
 import jsonData from "./DashboardData.json"; // Update the path accordingly

 export default {
   name : "Dashboard",
   components: {
     App1,App2,
   },
   data() {
     return {
       createdCount: 0,
       verifiedCount: 0,
       fixedCount: 0,
       completedCount: 0,
       remainingCount: 0
     };
   },

   mounted() {
     this.$q.loading.hide();
   },
   created() {
     const communications = jsonData.ResponseJson.Communications;

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
       if (communication.WorkflowStepId === "500") {
         this.completedCount++;
       }
       if (communication.WorkflowStepId === "300") {
         this.remainingCount++;
       }
     });
   }
 }
 </script> -->
