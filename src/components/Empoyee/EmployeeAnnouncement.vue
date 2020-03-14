<template>
  <AnnouncementForm
    :shouldDelete="true"
    color="#00ABEC"
    :request="jobData"
  ></AnnouncementForm>
</template>

<script>
import AnnouncementForm from '../Common/AnnouncementForm'
import { mapGetters } from 'vuex'

export default {
  name: 'EmployeeAnnouncement',
  components: {
    AnnouncementForm
  },
  computed: {
    ...mapGetters(['jobData'])
  }
}
</script>

<style scoped>

</style>
