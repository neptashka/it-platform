<template>
  <div v-if="hrManager" class="left-panel">
    <div class="profile__avatar">
      <v-avatar @click="pickFile" size="100">
        <img :src="getImage()" alt="" />
      </v-avatar>
    </div>
    <div class="hr-profile__name">
      <v-text-field v-model="fullName"></v-text-field>
    </div>
    <div class="profile__progress">
      <v-progress-linear :value="hrProgress" height="15"></v-progress-linear>
    </div>
    <v-btn
      @click.stop="showPersonalDataModal = true"
      flat
      class="profile__button"
      :disabled="hrProgress < 60"
    >
      Створити вакансію
    </v-btn>
    <AddVacancy
      :visible="showPersonalDataModal"
      @close="showPersonalDataModal = false"
    >
    </AddVacancy>
    <v-btn
      @click="sendContacts"
      flat
      class="profile__button"
      :disabled="hrProgress >= 60"
    >
      Існуючі ІТ-компанії
    </v-btn>
    <ExistingJob
      :visible="showJobModal"
      @close="showJobModal = false"
    ></ExistingJob>
    <v-btn
      @click="showItCompany = true"
      flat
      class="profile__button"
      :disabled="hrProgress >= 60"
    >
      Створити ІТ-компанію
    </v-btn>
    <AddItCompany :visible="showItCompany" @close="showItCompany = false">
    </AddItCompany>
    <v-btn flat @click="logout" class="profile__button">
      Вийти
    </v-btn>
    <input
      type="file"
      style="display: none"
      ref="image"
      accept="image/*"
      @change="onFilePicked"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import loadImageMixin from '../../mixins/loadImage'
import firebase from 'firebase'
import ExistingJob from '../modals/ExistingJob'
import AddVacancy from '../modals/AddVacancy'
import AddItCompany from '../modals/AddItCompany'
import { addPersonalInfo } from '../../modules/databaseManager/hrManagerQueries'

const noAvatar = 'images/profile/no-avatar.svg'
export default {
  name: 'HrLeftPanel',
  data() {
    return {
      showJobModal: false,
      showPersonalDataModal: false,
      showItCompany: false,
      showPwesonalInfo: false,
      fullName: 'Name Surname',
      hrManagerImage: null
    }
  },
  computed: {
    ...mapGetters([
      'hrManager',
      'hrProgress',
      'selectedItCompany',
      'itCompany',
      'hrPersonalInfo',
      'user',
      'hrVacancies',
      'sentVacancy'
    ])
  },
  mixins: [loadImageMixin],
  methods: {
    getImage() {
      return this.hrManagerImage || this.loadImage(noAvatar)
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.updateHrProgress(null)
          this.updateHrPersonalInfo(null)
          this.updateItCompany(null)
          this.updateHrVacanciesIds([])
          this.updateHrVacancies([])
          this.updateUser(null)
          this.$router.replace('login')
        })
    },
    sendContacts() {
      this.showJobModal = true
    },
    pickFile() {
      this.$refs.image.click()
    },
    onFilePicked(e) {
      const file = e.target.files[0]
      if (file) {
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.hrManagerImage = fr.result
          let personalInfo = {
            image: fr.result,
            fullName: this.fullName
          }
          this.updateHrPersonalInfo(personalInfo)
          personalInfo = {
            ...personalInfo,
            email: this.user.email
          }
          if (this.itCompany) {
            personalInfo = {
              ...personalInfo,
              company: this.itCompany,
            }
          }
          addPersonalInfo(personalInfo, this.user.userId)
          this.$forceUpdate()
        })
      }
    },
    calculateHrProgress() {
      let hrProgress = 0
      if (this.hrPersonalInfo) {
        hrProgress += 20
      }
      if (this.itCompany) {
        hrProgress += 40
      }
      if (this.hrVacancies.length > 0) {
        hrProgress += 40
      }
      this.updateHrProgress(hrProgress)
    },
    ...mapActions([
      'updateHrPersonalInfo',
      'updateHrProgress',
      'updateItCompany',
      'updateHrVacancies',
      'updateHrVacanciesIds',
      'updateUser'
    ])
  },
  mounted() {
    if (this.hrPersonalInfo) {
      this.hrManagerImage = this.hrPersonalInfo.image
      this.fullName = this.hrPersonalInfo.fullName
    }
    this.calculateHrProgress()
  },
  watch: {
    hrPersonalInfo(value) {
      value && this.calculateHrProgress()
      if (value.image) this.hrManagerImage = value.image
      if (value.fullName) this.fullName = value.fullName
    },
    itCompany(value) {
      value && this.calculateHrProgress()
    },
    hrVacancies(value) {
      if (value.length) {
        this.calculateHrProgress()
      }
    }
  },
  components: {
    ExistingJob,
    AddVacancy,
    AddItCompany
  }
}
</script>

<style scoped>
.hr-profile__name {
  width: 40%;
}
</style>
