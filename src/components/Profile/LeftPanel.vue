<template>
  <div class="left-panel">
    <div class="profile__avatar">
      <v-avatar size="100">
        <img :src="getImage" alt="" />
      </v-avatar>
    </div>
    <div>
      <p>{{ user.fullName }}</p>
    </div>
    <v-btn class="profile__button">Редагувати профіль</v-btn>
    <v-btn class="profile__button" @click="logout">Вийти</v-btn>
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
  mixins: [
    loadImageMixin
  ],
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
  width: 100%;
  display: flex;
  justify-content: center;
}
.profile__button {
  margin-bottom: 10px;
  width: 80%;
}
</style>
