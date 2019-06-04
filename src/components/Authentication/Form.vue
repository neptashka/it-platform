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
        required
        v-model="email"
        :rules="emailRules"
        label="E-mail">
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
        @click:append="show1 = !show1"
      >
      </v-text-field>
      <v-btn
        v-if="formType === 'signUp'"
        @click="signUp">
        Реєстрація
      </v-btn>
      <v-btn
        v-if="formType === 'logIn'"
        @click="logIn">
        Вхід
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters, mapActions } from 'vuex'
import { addITSpecialist } from '../../modules/databaseManager/usersQueries'

export default {
  name: 'Form',
  data: () => ({
    valid: false,
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
  computed: {
    ...mapGetters(['user'])
  },
  props: {
    userType: String,
    formType: String
  },
  methods: {
    ...mapActions(['updateUser']),
    signUp() {
      const self = this
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            const collection = `${this.userType}s`
            this.updateUser(
              {
                email: this.email
              },
              collection
            )
            addITSpecialist({
              email: this.email,
              collection: `${this.userType}s`
            })
            self.$router.replace('profile')
          },
          function(err) {
            alert(err.message)
          }
        )
    },
    logIn() {
      const self = this
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            this.updateUser({
              email: this.email,
              type: this.userType
            })
            self.$router.replace('profile')
          },
          err => alert(err.message)
        )
    }
  }
}
</script>

<style scoped>
.form {
  padding: 10px 0 20px 0;
  width: 90%;
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
