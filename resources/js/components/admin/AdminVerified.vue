<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="6" lg="6">
        <v-card>
          <v-card-text>
            <v-alert text color="success">
              <h3 class="headline">Successfully Verified</h3>
              <div>Your Email is now verified!</div>
              <v-row align="center">
                <v-spacer></v-spacer>
                <v-col class="shrink">
                  <v-btn color="success" router to="/admin/login" outlined>Login</v-btn>
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
    initialize() {
      this.adminVerified({
        email: this.$route.query.email,
        id: this.$route.query.id
      });
    },
    ...mapActions(["adminVerified"])
  },
  created() {
    this.initialize();
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
