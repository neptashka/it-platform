<template>
  <div v-if="hrManager" class="left-panel">
    <div class="profile__avatar">
      <v-avatar size="100">
        <img :src="getImage()" alt="" />
      </v-avatar>
    </div>
    <div v-if="hrManager.image" class="profile__title profile__entity">
      <span>{{ hrManager.fullName }}</span>
    </div>
    <div class="profile__progress">
      <v-progress-linear :value="hrProgress" height="15"></v-progress-linear>
    </div>
    <v-btn @click.stop = "showPersonalDataModal = true" flat class="profile__button" :disabled="hrProgress < 60">
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
    <v-btn flat class="profile__button" :disabled="hrProgress >= 60">
      Створити ІТ-компанію
    </v-btn>
    <v-btn flat @click="logout" class="profile__button">
      Вийти
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import loadImageMixin from '../../mixins/loadImage'
import firebase from 'firebase'
import ExistingJob from '../modals/ExistingJob'
import AddVacancy from '../modals/AddVacancy'

const noAvatar = 'images/profile/no-avatar.svg'
export default {
  name: 'HrLeftPanel',
  data() {
    return {
      showJobModal: false,
      showPersonalDataModal: false
    }
  },
  computed: {
    ...mapGetters(['hrManager', 'hrProgress'])
  },
  mixins: [loadImageMixin],
  methods: {
    getImage() {
      return this.loadImage(noAvatar)
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login')
        })
    },
    sendContacts() {
      this.showJobModal = true
    }
  },
  components: {
    ExistingJob,
    AddVacancy
  }
}
</script>

<style scoped></style>
