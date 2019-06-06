<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
    <v-card>
      <v-card-title class="headline">Вибір ІТ-компанії</v-card-title>
      <v-select
        color="teal"
        class="select-company"
        v-model="selectedItem"
        :items="itCompanies"
        item-text="companyName"
        label="ІТ-компанія"
      >
      </v-select>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal" flat @click.stop="dialog = false">Скасувати</v-btn>
        <v-btn color="teal" flat @click.stop="save">Зберегти</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ExistingJob',
  props: {
    visible: Boolean
  },
  data() {
    return {
      selectedItem: null
    }
  },
  computed: {
    dialog: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      }
    },
    ...mapGetters(['itCompanies', 'hrProgress'])
  },
  methods: {
    save() {
      this.dialog = false
      this.$toasted.show(`Дані успішно збережені`, {
        theme: 'toasted-primary',
        type: 'success',
        position: 'top-center',
        duration: 3000
      })
      this.updateSelectedItCompany(this.selectedItem)
      if (this.hrProgress === 20) {
        this.updateHrProgress(60)
      }
    },
    ...mapActions(['updateSelectedItCompany', 'updateHrProgress'])
  },
  mounted() {
  	console.log(this.itCompanies)
  }
}
</script>

<style scoped>
.select-company {
  margin: 0 20px 0 20px;
}
.headline {
  font-size: 18px;
}
</style>
