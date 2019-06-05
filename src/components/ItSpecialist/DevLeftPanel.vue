<template>
  <div v-if="itSpecialist" class="left-panel">
    <div class="profile__avatar">
      <v-avatar
        @click="pickFile"
        size="100">
        <img :src="getImage()" alt="" />
      </v-avatar>
    </div>
    <div class="profile__title profile__entity">
      <span>{{ itSpecialist.fullName }}</span>
    </div>
    <div class="profile__progress">
      <v-progress-linear height="15" :value="profile"></v-progress-linear>
    </div>
    <v-btn
      flat
      @click="sendRequest"
      :disabled="profile !== 100 || requestSent"
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
      @click.stop = "showPersonalDataModal = true"
      class="profile__button">
      Персональні дані
    </v-btn>
    <PersonalDataModal
      :visible="showPersonalDataModal"
      @close="showPersonalDataModal = false">
    </PersonalDataModal>
    <v-btn
        flat
        @click="logout"
        class="profile__button">
      Вийти
    </v-btn>
    <input
      type="file"
      style="display: none"
      ref="image"
      accept="image/*"
      @change="onFilePicked">
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import loadImageMixin from '../../mixins/loadImage'
import firebase from 'firebase'
import JobDataModal from '../modals/JobDataModel'
import PersonalDataModal from '../modals/PersonalDataModal'
import { getJobData, getPersonalData, addRequest } from '../../modules/databaseManager/profileQueries'

const noAvatar = 'images/profile/no-avatar.svg'
export default {
  name: 'DevLeftPanel',
  data() {
    return {
      showJobDataModal: false,
      showPersonalDataModal: false,
      progress: 0
    }
  },
  mixins: [loadImageMixin],
  components: {
    JobDataModal,
    PersonalDataModal
  },
  computed: {
    ...mapGetters([
      'itSpecialist',
      'jobData',
      'personalData',
      'profile',
      'user',
      'requestSent'
    ])
  },
  mounted() {
    const id = this.user.userId
    getJobData(id)
    getPersonalData(id)
    this.calculateProgress()
  },
  methods: {
    ...mapActions([
      'updateItSpecialist',
      'updateUser',
      'updateDevImage',
      'updateJobData',
      'updatePersonalData',
      'updateProfile',
      'updateSentRequest'
    ]),
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login')
          this.updateUser(null)
          this.updateItSpecialist(null)
          this.updateJobData(null)
          this.updatePersonalData(null)
          this.updateProfile(null)
          this.updateSentRequest(null)
        })
    },
    pickFile() {
      this.$refs.image.click()
    },
    getImage() {
      return this.itSpecialist.image || this.loadImage(noAvatar)
    },
    onFilePicked(e) {
      const file = e.target.files[0]
      if (file) {
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.updateDevImage(fr.result)
        })
      }
    },
    calculateProgress() {
      let progress = 20
      if (this.jobData) progress += 40
      if (this.personalData) progress +=40
      this.updateProfile(progress)
    },
    sendRequest() {
      addRequest(this.jobData)
      this.$toasted.show(`Вакансія відправлена!`, {
        theme: 'toasted-primary',
        type: 'success',
        position: 'top-center',
        duration: 3000
      })
    }
  },
  watch: {
    jobData() {
      this.calculateProgress()
    },
    personalData() {
      this.calculateProgress()
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
.profile__avatar:hover {
  cursor: pointer;
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
