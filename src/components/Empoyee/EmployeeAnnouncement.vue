<template>
  <AnnouncementForm
    :shouldDelete="true"
    color="#3B579D"
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
  data() {
    return {
      request: null
    }
  },
  computed: {
    ...mapGetters(['jobData'])
  },
  beforeCreate() {
    this.request = this.jobData
  }
}
</script>

<style scoped>

</style>
