<template>
  <div class="profile">
    <Header header-color="#000"></Header>
    <ProfileContent></ProfileContent>
  </div>
</template>

<script>
import Header from '../components/Fixed/Header'
import ProfileContent from '../components/Profile/ProfileContent'

export default {
  name: 'Profile',
  components: {
    Header,
    ProfileContent
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
