<template>
  <div class="login">
    <Header header-color="#000"></Header>
    <LogIn></LogIn>
  </div>
</template>

<script>
import LogIn from '../components/Authentication/LogIn'
import Header from '../components/Fixed/Header'

export default {
  name: 'Login',
  components: {
    LogIn,
    Header
  }
}
</script>

<style>
.login {
  background-color: #f8f8f8;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
