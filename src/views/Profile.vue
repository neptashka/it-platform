<template>
  <div class="profile">
    <Header header-color="#000"></Header>
    <h1>Profile</h1>
  </div>
</template>

<script>
import Header from '../components/Fixed/Header'
export default {
  name: 'Profile',
  components: {
    Header
  }
}
</script>

<style>
.profile {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
