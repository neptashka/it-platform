<template>
  <div v-if="hrManager" class="left-panel">
    <div class="profile__avatar">
      <v-avatar
        size="100">
        <img :src="getImage()" alt="" />
      </v-avatar>
    </div>
    <div v-if="hrManager.image" class="profile__title profile__entity">
      <span>{{ hrManager.fullName }}</span>
    </div>
    <div class="profile__progress">
      <v-progress-linear :value="hrProgress" height="15"></v-progress-linear>
    </div>
    <v-btn
      flat
      class="profile__button">
      Створити вакансію
    </v-btn>
    <v-btn
      flat
      class="profile__button">
      ІТ-компанія
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
import { mapGetters } from 'vuex'
import loadImageMixin from '../../mixins/loadImage'
import firebase from 'firebase'

const noAvatar = 'images/profile/no-avatar.svg'
export default {
  name: 'HrLeftPanel',
  computed: {
    ...mapGetters(['hrManager'])
  },
  data() {
    return {
      hrProgress: 0
    }
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
    }
  }
}
</script>

<style scoped>

</style>
