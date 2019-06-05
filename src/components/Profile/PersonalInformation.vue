<template>
  <div v-if="user" class="personal-information">
    <ItSpecialistProfile v-if="isDev()"> </ItSpecialistProfile>
    <HrProfile v-if="isHr()"> </HrProfile>
  </div>
</template>

<script>
import ItSpecialistProfile from '../ItSpecialist/ItSpecialistProfile'
import HrProfile from '../HrManager/HrProfile'
import { mapGetters } from 'vuex'
import { HR_MANAGER, IT_SPECIALIST } from '../../constants/userTypes'
export default {
  name: 'PersonalInformation',
  components: {
    ItSpecialistProfile,
    HrProfile
  },
  methods: {
    isDev() {
      return this.user.type === IT_SPECIALIST
    },
    isHr() {
      return this.user.type === HR_MANAGER
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style scoped>
.personal-information {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
