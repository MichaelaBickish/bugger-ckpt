<template class="note-component">
  <tr>
    <th scope="row">
      <p class="font-weight-lighter">
        <img :src="note.creator.picture" height="20" alt="" class="user-photo rounded-circle">
        {{ note.creator.name }}
      </p>
    </th>
    <td>{{ note.body }}</td>
    <td><i class="fas fa-trash cursor-pointer" @click="deleteNote" title="Delete this Note" v-if="state.user.isAuthenticated && state.account.id === note.creatorId"></i></td>
  </tr>

  <!-- <tr v-else>
    <th scope="row">
      No Notes to Display
    </th>
  </tr> -->
</template>

<script>
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import Notification from '../utils/Notification'
export default {
  name: 'NoteComponent',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    return {
      state,
      route,
      async deleteNote() {
        try {
          if (await Notification.confirmAction()) {
            await notesService.deleteNote(props.note.id, props.note.bug)
          }
        } catch (error) {
          Notification.toast('Error: ' + error, ' error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.cursor-pointer{
  cursor: pointer;
}
</style>
