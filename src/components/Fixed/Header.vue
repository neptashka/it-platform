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
      @click="$router.push('/')"
    />
    <div class="header__buttons" v-if="isHomePage">
      <v-btn
        flat
        round
        append
        color="white"
        @click="$router.push('/login')"
      >
        Log in
      </v-btn>
      <v-btn
        flat
        round
        append
        outline
        color="white"
        @click="$router.push('/register')">
        Sign up
      </v-btn>
    </div>
    <div class="header__buttons" v-if="isRegisterPage">
      <v-btn
        flat
        round
        append
        color="white"
        @click="$router.push('/login')">
        Log in
      </v-btn>
    </div>
  </v-toolbar>
</template>

<script>
const HOME_PATH = '/'
const REGISTER_PATH = '/register'

export default {
  name: 'Header',
  props: {
    headerColor: String
  },
  computed: {
    isHomePage() {
      return this.$route.path === HOME_PATH
    },
    isRegisterPage() {
      return this.$route.path === REGISTER_PATH
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
</style>
