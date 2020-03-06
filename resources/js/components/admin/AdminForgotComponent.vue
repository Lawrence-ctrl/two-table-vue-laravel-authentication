<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="success " dark flat>
            <v-toolbar-title>Find Your Email?</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-form ref="emailForm">
            <div v-if="serverError" class="text-center errorscss">
              <v-alert icon="mdi-shield-lock-outline" prominent text type="error">{{ serverError }}</v-alert>
            </div>
            <v-card-text>
              <v-text-field
                label="Email Address*"
                :rules="emailRules"
                name="email"
                v-model="email"
                clearable
                prepend-icon="person"
                type="text"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" :loading="loading" @click.prevent="reset()" color="success">Send</v-btn>
              <v-btn type="submit" @click.prevent="cancel()" color="success">Back</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "admin-forgot",
  data() {
    return {
      email: "",
      loading: false,
      emailRules: [
        v => !!v || "This field is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      serverError: ""
    };
  },
  methods: {
    ...mapActions(["adminForgotPassword"]),
    reset() {
      if (this.$refs.emailForm.validate()) {
        this.loading = true;
          this.adminForgotPassword({
            email: this.email
          })
            .then(response => {
              if (response.status === 200) {
                this.loading = false;
                this.serverError = "";
                this.$router.push({path: '/admin/fillcode'})
              }
            })
            .catch(error => {
              this.serverError = error.response.data.error;
              this.loading = false;
            });
      }
    },
    cancel() {
        this.$router.push({ path: '/admin/login'});
    }
  }
};
</script>
<style scoped>
.errorscss {
  margin: 1rem;
}
i.v-icon.notranslate.v-alert__icon.mdi.mdi-shield-lock-outline.theme--dark.error--text {
  font-size: 5px;
}
div.v-alert.v-sheet.theme--dark.v-alert--prominent.v-alert--text.error--text {
  margin: 0;
  padding: 0;
}
</style>
