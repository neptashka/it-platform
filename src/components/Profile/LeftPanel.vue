<template>
  <div v-if="user" class="left-panel-container">
    <DevLeftPanel v-if="isUserDev()"></DevLeftPanel>
    <HrLeftPanel v-if="isHr()"></HrLeftPanel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DevLeftPanel from '../ItSpecialist/DevLeftPanel'
import HrLeftPanel from '../HrManager/HrLeftPanel'
import { IT_SPECIALIST, HR_MANAGER } from '../../constants/userTypes'

export default {
  name: 'LeftPanel',
  data() {
    return {}
  },
  components: {
    DevLeftPanel,
    HrLeftPanel
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    isUserDev() {
      return this.user.type === IT_SPECIALIST
    },
    isHr() {
      return this.user.type === HR_MANAGER
    }
  }
}
</script>

<style scoped>
.left-panel-container {
  width: 400px;
  height: 100%;
}
</style>

<style>
</style>
