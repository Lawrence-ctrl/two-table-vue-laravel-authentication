<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="6" lg="6">
        <v-card>
          <v-card-text>
            <v-alert text color="error">
              <h3 class="headline">Please Verify Your Email!</h3>
              <div>Your Email is not verified yet!</div>
              <v-row align="center">
                <v-spacer></v-spacer>
                <v-col class="shrink">
                  <v-btn color="error" router to="/admin/verify" outlined>Verify</v-btn>
                </v-col>
              </v-row>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "admin-verify",
  data() {
    return {};
  },
  methods: {

  },
  created() {
   
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
