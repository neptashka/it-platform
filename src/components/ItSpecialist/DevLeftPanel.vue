<template>
  <div v-if="itSpecialist" class="left-panel">
    <div class="profile__avatar">
      <v-avatar size="100">
        <img :src="getImage" alt="" />
      </v-avatar>
    </div>
    <div class="profile__title profile__entity">
      <span>{{ itSpecialist.fullName }}</span>
    </div>
    <div class="profile__progress">
      <v-progress-linear height="15" value="60"></v-progress-linear>
    </div>
    <v-btn
        flat
        class="profile__button green-button ">
      Надіслати дані
    </v-btn>
    <v-btn
      @click.stop = "showJobDataModal = true"
      flat
      class="profile__button">
      Професійні дані
    </v-btn>
    <JobDataModal
      :visible="showJobDataModal"
      @close="showJobDataModal = false">
    </JobDataModal>
    <v-btn
        flat
        class="profile__button">
      Персональні дані
    </v-btn>
    <v-btn
        flat
        @click="logout"
        class="profile__button">
      Вийти
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import loadImageMixin from '../../mixins/loadImage'
const noAvatar = 'images/profile/no-avatar.svg'
import firebase from 'firebase'
import JobDataModal from '../modals/JobDataModel'
export default {
  name: 'DevLeftPanel',
  data() {
    return {
      showJobDataModal: false
    }
  },
  mixins: [loadImageMixin],
  components: {
    JobDataModal
  },
  computed: {
    ...mapGetters([
      'itSpecialist'
    ]),
    getImage() {
      return this.itSpecialist.image || this.loadImage(noAvatar)
    }
  },
  methods: {
    ...mapActions([
      'updateItSpecialist',
      'updateUser'
    ]),
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login')
          this.updateUser(null)
          this.updateItSpecialist(null)
        })
    }
  }
}
</script>

<style>
.left-panel {
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
}
.profile__avatar {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  border-radius: 100%;
  border: 2px solid #4ad59e;
}
.profile__button {
  margin-bottom: 10px;
  width: 80%;
}
.profile__title {
  font-size: 20px;
  color: #707070;
  font-weight: bold;
}
.profile__entity {
  margin-top: 10px;
}
.profile__progress {
  width: 80%;
}
.profile__progress .v-progress-linear__background {
  background-image: linear-gradient(to top right, #54e38e, #41c7af);
  border-radius: 15px;
}
.profile__progress .v-progress-linear__bar__determinate.primary {
  background-color: #4ad59e !important;
  border-color: #4ad59e !important;
  border-radius: 15px;
}
.profile__button {
  background-color: #ebebeb;
  border-radius: 8px;
}
.green-button {
  background-image: linear-gradient(to top right, #54e38e, #41c7af);
}
</style>
