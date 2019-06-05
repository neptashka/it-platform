<template>
  <div class="container-it-specialists">
    <Header header-color="#000"></Header>
    <AnnouncementList></AnnouncementList>
  </div>
</template>

<script>
import Header from '../components/Fixed/Header'
import AnnouncementList from '../components/Empoyee/AnnouncementList'
export default {
  name: 'IT-specialists',
  components: {
    Header,
    AnnouncementList
  }
}
</script>

<style scoped>
.container-it-specialists {
  width: 100%;
  height: 100%;
}
</style>
