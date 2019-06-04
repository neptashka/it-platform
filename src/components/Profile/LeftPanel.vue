<template>
  <div class="left-panel">
    <div class="profile__avatar">
      <v-avatar size="100">
        <img :src="getImage" alt="" />
      </v-avatar>
    </div>
    <div class="profile__title profile__entity">
      <span>{{ user.fullName }}</span>
    </div>
    <div class="profile__progress">
      <v-progress-linear height="15" value="60"></v-progress-linear>
    </div>
    <v-btn
      flat
      class="profile__button">
      Професійні дані
    </v-btn>
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
import { mapGetters } from 'vuex'
import loadImageMixin from '../../mixins/loadImage'
const noAvatar = 'images/profile/no-avatar.svg'
import firebase from 'firebase'

export default {
  name: 'LeftPanel',
  data() {
    return {}
  },
  mixins: [loadImageMixin],
  computed: {
    ...mapGetters(['user']),
    getImage() {
      return this.user.image || this.loadImage(noAvatar)
    }
  },
  methods: {
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
</style>

<style>
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
  background-color: #EBEBEB;
  border-radius: 8px;
}
</style>
