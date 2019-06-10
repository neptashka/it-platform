<template>
  <div class="container-announcement-list">
    <AnnouncementFilter></AnnouncementFilter>
    <div class="vacancy-form">
      <div
        v-for="(request, index) in filteredRequests"
        class="announcement">
        <AnnouncementForm
          :request="request"
          :color="cardColors[index]"
          :shouldDelete="false">
        </AnnouncementForm>
      </div>
    </div>
  </div>
</template>

<script>
import AnnouncementFilter from '../Empoyee/AnnouncementFilter'
import { colors } from '../../constants/vacanciesColors'
import AnnouncementForm from '../Common/AnnouncementForm'
import { mapGetters, mapActions } from 'vuex'
import { getRequests } from '../../modules/databaseManager/vacanciesQueries'

export default {
  name: 'AnnouncementList',
  components: {
    AnnouncementFilter,
    AnnouncementForm
  },
  data() {
    return {
      cardColors: colors
    }
  },
  computed: {
    ...mapGetters(['filteredRequests'])
  },
  methods: {
    ...mapActions(['initFilteredRequests'])
  },
  beforeCreate() {
    getRequests()
  }
}
</script>

<style scoped>
.container-announcement-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.vertical-container {
  height: 100%;
}
.vacancy-form {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.announcement {
  width: 80%;
  margin: 20px 0 10px 0;
}
.vacancy-form::-webkit-scrollbar {
  width: 10px;
}
.vacancy-form::-webkit-scrollbar-track {
  background: #fffdfc;
}
.vacancy-form::-webkit-scrollbar-thumb {
  background: #d5d5d5;
  border-radius: 15px;
}
.vacancy-form::-webkit-scrollbar-thumb:hover {
  background: #d5d5d5;
}
</style>
