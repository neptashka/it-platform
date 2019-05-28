<template>
  <div class="registration">
    <Header
      header-color="#000">
    </Header>
    <SignUp></SignUp>
  </div>
</template>

<script>
import Header from '../../src/components/Fixed/Header'
import SignUp from '../components/Authentication/SignUp'

export default {
  components: {
    Header,
    SignUp
  }
}
</script>

<style>
.registration {
  height: 100%;
  width: 100%;
}
</style>
