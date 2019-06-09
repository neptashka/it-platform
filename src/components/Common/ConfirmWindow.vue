<template>
  <v-dialog v-model="dialog" persistent max-width="330">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ text }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal" flat @click.stop="dialog = false"
          >Ні</v-btn
        >
        <v-btn color="teal" flat @click.stop="sendData">Так</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { sendContacts } from '../../modules/databaseManager/contactsQueries'

export default {
  name: 'ConfirmWindow',
  props: {
    vacancy: Object,
    title: String,
    text: String,
    visible: Boolean
  },
  computed: {
    ...mapGetters(['user']),
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
    sendData() {
      const hrId = this.vacancy.content.hrManagerId
      const itSpecialistId = this.user.userId
      sendContacts({ hrId, itSpecialistId })
      this.dialog = false
    }
  }
}
</script>

<style scoped></style>
