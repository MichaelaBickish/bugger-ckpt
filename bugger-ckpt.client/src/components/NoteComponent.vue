<template class="note-component">
  <!-- <div v-if="note"> -->
  <tr>
    <th scope="row">
      <p class="font-weight-lighter">
        <img :src="note.creator.picture" height="20" alt="" class="user-photo rounded-circle">
        {{ note.creator.name }}
      </p>
    </th>
    <td>{{ note.body }}</td>
    <td><i class="fas fa-trash"></i></td>
  </tr>
  <!-- </div>
  <div v-else> -->
  <!-- <tr>
      <th scope="row">
        No Notes to Display
      </th>
    </tr>
  </div> -->
</template>

<script>
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
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
      route
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
