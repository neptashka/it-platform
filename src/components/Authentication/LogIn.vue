<template>
  <v-form>
    <v-container>
      <v-flex xs12 md4>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
      </v-flex>

      <v-flex xs12 md4>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'visibility' : 'visibility_off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Normal with hint text"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 md4>
        <v-btn @click="logIn">Log In</v-btn>
      </v-flex>
    </v-container>
  </v-form>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'LogIn',
  data() {
    return {
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      show1: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      }
    }
  },
  methods: {
    logIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          function(user) {
            alert(`Welcome ${user.additionalUserInfo}, ${user.user}`)
          },
          function(err) {
            alert('Oops' + err.message)
          }
        )
    }
  }
}
</script>

<style scoped>
</style>
