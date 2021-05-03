<template>
  <div class="new-note-component">
    <form @submit.prevent="createNote">
      <div class="form-group">
      </div>
      <label for="description">New Note Description</label>
      <input type="text"
             class="form-control"
             id="description"
             rows="3"
             placeholder="Write a Note..."
             required
             minlength="5"
             v-model="state.newNote.body"
      >
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-outline-success mt-1" title="Submit New Note">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import Notification from '../utils/Notification'
import { notesService } from '../services/NotesService'
import { useRoute } from 'vue-router'
export default {
  name: 'NewNoteComponent',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      newNote: {}
    })
    return {
      route,
      state,
      async createNote() {
        try {
          await notesService.createNote(route.params.id, state.newNote)
          state.newNote = {}
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
