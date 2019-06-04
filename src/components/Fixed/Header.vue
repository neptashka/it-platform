<template>
  <v-toolbar
    app
    flat
    height="60"
    :color="headerColor">
    <img
      class="header__logo"
      src="../../../src/images/logos/main-logo.svg"
      alt="Logo"
      @click="homeClick"
    />
    <div
      class="header__buttons"
      v-if="isHomePage">
      <v-btn
        flat
        round
        append
        color="white"
        @click="$router.push('/login')"
      >
        Вхід
      </v-btn>
      <v-btn
        flat
        round
        append
        outline
        color="white"
        @click="$router.push('/register')">
        Реєстрація
      </v-btn>
    </div>
    <div class="header__buttons" v-if="isRegisterPage">
      <v-btn
        flat
        round
        append
        color="white"
        @click="$router.push('/login')">
        Вхід
      </v-btn>
    </div>
    <div class="header__buttons" v-if="isLoginPage">
      <v-btn
        flat
        round
        append
        outline
        color="white"
        @click="$router.replace('/register')">
        Реєстрація
      </v-btn>
    </div>
    <div class="header__buttons" v-if="isRegistered">
      <v-btn
        flat
        round
        append
        color="white"
        @click="$router.replace('/it-companies')">
        ІТ-компанії
      </v-btn>
      <v-btn
        flat
        round
        append
        color="white"
        @click="$router.replace('/it-specialists')">
        ІТ-спеціалісти
      </v-btn>
      <v-btn
        flat
        round
        append
        color="white"
        @click="$router.replace('/vacancies')">
        Вакансії
      </v-btn>
      <v-btn
        flat
        round
        append
        color="white"
        fab
        small
        @click="$router.push('/profile')">
        <v-icon
        color="#fff">
          person
        </v-icon>
      </v-btn>
    </div>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
const HOME_PATH = '/'
const REGISTER_PATH = '/register'
const LOGIN_PATH = '/login'

export default {
  name: 'Header',
  data() {
    return {
      authorizedUser: false
    }
  },
  props: {
    headerColor: String
  },
  computed: {
    ...mapGetters(['user']),
    isHomePage() {
      return this.$route.path === HOME_PATH
    },
    isRegisterPage() {
      return this.$route.path === REGISTER_PATH
    },
    isLoginPage() {
      return this.$route.path === LOGIN_PATH
    },
    isRegistered() {
      const currentUser = firebase.auth().currentUser
      return currentUser && this.$route.path !== HOME_PATH
    }
  },
  methods: {
    homeClick() {
      !this.user && this.$router.push('/')
    }
  }
}
</script>

<style>
.text-button {
  font-size: 16px;
  font-weight: bold;
  border: none;
  background: none;
  color: #fff;
  padding: 0 10px 0 10px;
}
.outlined-button {
  font-size: 16px;
  font-weight: bold;
  border: 2px solid #fff;
  border-radius: 50px;
  color: #fff;
  padding: 4px 20px 4px 20px;
}
.header__buttons {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.icon-button {
  width: 24px;
}

@media only screen and (max-width: 600px) {
  .header__logo{
    display: none;
  }
}
</style>
