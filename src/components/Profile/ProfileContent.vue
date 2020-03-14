<template>
  <v-layout row class="profile">
    <LeftPanel></LeftPanel>
    <PersonalInformation></PersonalInformation>
  </v-layout>
</template>

<script>
import LeftPanel from './LeftPanel'
import PersonalInformation from './PersonalInformation'

export default {
  name: 'ProfileContent',
  components: {
    LeftPanel,
    PersonalInformation
  },
}
</script>

<style scoped>
.profile {
  width: 100%;
  height: 100%;
}
</style>
