<template>
  <v-layout row class="profile">
    <LeftPanel></LeftPanel>
    <PersonalInformation></PersonalInformation>
  </v-layout>
</template>

<script>
import LeftPanel from './LeftPanel'
import PersonalInformation from './PersonalInformation'
import { mapGetters } from 'vuex'

export default {
  name: 'ProfileContent',
  components: {
    LeftPanel,
    PersonalInformation
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style scoped>
.profile {
  width: 100%;
  height: 100%;
}
</style>
