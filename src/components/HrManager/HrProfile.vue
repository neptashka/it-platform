<template>
  <div class="dev-profile">
    <div class="dev-profile__container">
      <v-tabs v-model="active" light slider-color="#4ad59e">
        <v-tab><v-icon>home</v-icon>ІТ-компанія</v-tab>
        <v-tab><v-icon>work</v-icon>Активні вакансії</v-tab>
        <v-tab-item>
          <v-card flat>
            <div class="tab__page-container">
              <HrManageItCompany></HrManageItCompany>
            </div>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <HrManageVacancies></HrManageVacancies>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
import HrManageItCompany from './HrManageItCompany'
import HrManageVacancies from './HrManageVacancies'
import { mapGetters } from 'vuex'
import { getContacts } from '../../modules/databaseManager/contactsQueries'

export default {
  name: 'HrProfile',
  data() {
    return {
      active: null
    }
  },
  computed: {
    ...mapGetters(['user', 'hrVacancies'])
  },
  components: {
    HrManageVacancies,
    HrManageItCompany
  },
  mounted() {
    if (this.hrVacancies.length > 0) {
      getContacts(this.user.userId, this.hrVacancies)
    }
  }
}
</script>

<style scoped>
.tab__page-container {
  margin-top: 20px;
  height: 100%;
  width: 100%;
}
</style>
