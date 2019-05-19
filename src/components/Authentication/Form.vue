<template>
  <div class="form">
    <div class="form__horizontal-container">
      <v-btn flat class="form__google-btn">
        GOOGLE
      </v-btn>
      <v-btn flat class="form__google-btn">
        FACEBOOK
      </v-btn>
    </div>
    <v-form class="form__vertical-container" v-model="valid">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required>
      </v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'visibility' : 'visibility_off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Normal with hint text"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1">
      </v-text-field>
      <v-btn @click="signUp">Sign up</v-btn>
    </v-form>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Form',
  data: () => ({
    valid: false,
    firstname: '',
    lastname: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    show1: false,
    password: 'Password',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters'
    }
  }),
  methods: {
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          function(user) {
            alert('Your account has been created!' + user)
          },
          function(err) {
            alert('OOPS' + err.message)
          }
        )
    }
  }
}
</script>

<style>
.form {
  width: 600px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form__vertical-container {
  display: flex;
  flex-direction: column;
  width: 80%;
}
</style>
