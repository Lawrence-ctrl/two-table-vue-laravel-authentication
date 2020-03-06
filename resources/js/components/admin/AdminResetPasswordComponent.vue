<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="success " dark flat>
            <v-toolbar-title>Reset Password</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-form ref="resetForm">
            <div v-if="serverError" class="text-center errorscss">
              <v-alert icon="mdi-shield-lock-outline" prominent text type="error">{{ serverError }}</v-alert>
            </div>
            <div v-if="serverErrors" class="text-center errorscss">
              <v-alert
                v-for="error in serverErrors"
                :key="error.id"
                icon="mdi-shield-lock-outline"
                prominent
                text
                type="error"
              >{{ error[0] }}</v-alert>
            </div>
            <v-card-text>
              <v-text-field
                id="password"
                :rules="passwordRules"
                :type="show ? 'text' : 'password'"
                label="Password*"
                name="password"
                clearable
                :counter="30"
                v-model="password"
                prepend-icon="lock"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
              />
              <v-text-field
                id="password"
                :type="showconfirm ? 'text' : 'password'"
                label="Confirm Password*"
                name="confirm password"
                clearable
                :counter="30"
                :rules="confirmRules"
                v-model="passwordConfirm"
                prepend-icon="lock"
                :append-icon="showconfirm? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showconfirm = !showconfirm"
              />
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" :loading="loading" @click.prevent="login()" color="success">Reset</v-btn>
                 <v-btn type="submit" @click.prevent="back()" color="success">Back</v-btn>
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
  name: "admin-login",
  data() {
    return {
      password: "",
      passwordRules: [
        v => !!v || "This field is required",
        v => (!!v && v.length > 6) || "Password must be more than 6 characters"
      ],
      passwordConfirm: "",
      confirmRules: [
        v => !!v || "This field is required",
        v => v == this.password || "Passwords must be same"
      ],
      show: false,
      showconfirm: false,
      serverError: "",
      serverErrors: "",
      loading: false
    };
  },
  methods: {
    ...mapActions(["adminResetPassword"]),
    login() {
      if (this.$refs.resetForm.validate()) {
          this.loading = true
        this.adminResetPassword({
          password: this.password,
          confirmPassword: this.confirmPassword,
          token: this.$route.query.token
        })
          .then(response => {
            if (response.status === 200) {
              this.$router.push({ path: "/admin/login" });
              this.serverError = "";
              this.serverErrors = "";
              this.loading = false
            }
          })
          .catch(error => {
            if (error.response.data.error) {
              this.serverErrors = "";
              this.serverError = error.response.data.error;
              this.loading = false
            } else {
              this.serverError = "";
              this.serverErrors = Object.values(error.response.data.errors);
              this.loading = false
            }
          });
      }
    },
    back() {
        this.$router.push({path: '/admin/fillcode'})
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
