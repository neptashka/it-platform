<template>
  <div class="form">
    <div class="form__horizontal-container">
      <v-btn flat outline class="form__google-btn">
        GOOGLE
      </v-btn>
      <v-btn flat outline class="form__facebook-btn">
        FACEBOOK
      </v-btn>
    </div>
    <v-divider dark></v-divider>
    <v-form class="form__vertical-container" v-model="valid">
      <v-text-field
        required
        v-model="email"
        outline
        :rules="emailRules"
        label="Е-мейл"
      >
      </v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'visibility' : 'visibility_off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        hint="Щонайменше 8 символів"
        label="Пароль"
        counter
        outline
        @click:append="show1 = !show1"
      >
      </v-text-field>
      <v-btn
        :disabled="!valid"
        class="green-button button-round-white"
        v-if="formType === 'signUp'"
        @click="signUp"
      >
        Реєстрація
      </v-btn>
      <v-btn
        :disabled="!valid"
        class="green-button button-round-white"
        v-if="formType === 'logIn'"
        @click="logIn"
      >
        Вхід
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters, mapActions } from 'vuex'
import {
  addTypeUser,
  getUserByEmail
} from '../../modules/databaseManager/usersQueries'

export default {
  name: 'Form',
  data: () => ({
    valid: false,
    email: '',
    emailRules: [
      v => !!v || `Це поле повинне бути заповнене`,
      v => /.+@.+/.test(v) || 'Не коректний е-мейл'
    ],
    show1: false,
    password: '',
    rules: {
      required: value => !!value || `Обов'язкове поле`,
      min: v => v.length >= 8 || 'Щонайменше 8 символів'
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
            this.updateUser({
              email: this.email,
              type: this.userType
            })
            addTypeUser(
              {
                email: this.email
              },
              collection
            )
            this.$toasted.show(
              `Користувач типу ${this.userType} успішно створений`,
              {
                theme: 'toasted-primary',
                type: 'success',
                position: 'top-center',
                duration: 3000
              }
            )
            self.$router.replace('profile')
          },
          function(err) {
            this.$toasted.show('Відсутній Інтернет', {
              theme: 'toasted-primary',
              type: 'error',
              position: 'top-center',
              duration: 3000
            })
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
            getUserByEmail(this.email)
            self.$router.replace('profile')
          },
          err => {
            this.$toasted.show('Такого користувача не існує в системі', {
              theme: 'toasted-primary',
              type: 'error',
              position: 'top-center',
              duration: 3000
            })
          }
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
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 80%;
}
.form__horizontal-container {
  display: flex;
  width: 90%;
  justify-content: center;
}
.form__google-btn {
  border-radius: 8px;
  border: 1px solid #b3b3b3;
  height: 45px;
  width: 43%;
}
.form__facebook-btn {
  border-radius: 8px;
  border: 1px solid #b3b3b3;
  height: 45px;
  width: 43%;
}
.v-btn.v-btn--outline.form__facebook-btn {
  background-color: #4267b2 !important;
  color: #fff !important;
}
</style>

<style>
.button-round-white {
  border-radius: 10px;
}
.button-round-white.theme--light.v-btn {
  color: #fff;
}
</style>
