<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card class="select-company">
      <v-card-title class="headline">Обрати ІТ-спеціаліста</v-card-title>
      <v-card-text>Оберіть відповідну вакансію</v-card-text>
      <v-select
        color="teal"
        v-model="companyRequest"
        return-object
        :items="hrVacancies"
        item-text="title"
        class="select-vacancy"
      ></v-select>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal" flat @click.stop="dialog = false">Скасувати</v-btn>
        <v-btn color="teal" flat @click.stop="sendData">Надіслати</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '../../main'

export default {
  name: 'ConfirmAnnouncement',
  props: {
    request: Object,
    visible: Boolean
  },
  data() {
    return {
      companyRequest: null
    }
  },
  computed: {
    ...mapGetters(['user', 'hrVacancies', 'hrManager']),
    dialog: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  methods: {
    async sendData() {
      const { fullName, image } = this.hrManager
      const hrManager = {
        fullName,
        image,
        id: this.user.userId
      }
      console.log('company-request', this.companyRequest)
      const {
        English,
        city,
        title,
        id,
        experience,
        languages,
        requirements,
        company
      } = this.companyRequest
      const { itSpecialistId } = this.request
      db.collection('hr-request')
        .add({
          hrManager,
          vacancy: {
            English,
            city,
            title,
            id,
            experience,
            languages,
            requirements,
            company
          },
          itSpecialistId
        })
        .then(function() {})
        .catch(function(error) {
          console.warn(error)
        })
      this.$toasted.show('Дані успішно надіслані', {
        theme: 'toasted-primary',
        type: 'success',
        position: 'top-center',
        duration: 3000
      })
      // const hrId = this.vacancy.hrManagerId
      // const itSpecialistId = this.user.userId
      // sendContacts({ hrId, itSpecialistId, vacancyId: this.vacancy.id })
      this.dialog = false
    }
  }
}
</script>

<style scoped>
.select-vacancy {
  margin: 0 40px 0 40px;
}
.select-company .v-card__text {
  padding: 0 10px 0 40px !important;
}
</style>
