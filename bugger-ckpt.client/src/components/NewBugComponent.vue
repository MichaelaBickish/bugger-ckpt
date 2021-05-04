<template>
  <div class="new-bug-component">
    <form @submit.prevent="createBug ">
      <div class="form-group">
        <label for="title">Title of New Bug Report</label>
        <input type="text"
               class="form-control"
               id="title"
               placeholder="Title..."
               required
               minlength="4"
               v-model="state.newBug.title"
        >
      </div>
      <label for="description">New Bug Report Description</label>
      <input type="text"
             class="form-control"
             id="description"
             rows="3"
             placeholder="Description..."
             required
             minlength="5"
             v-model="state.newBug.description"
      >
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-outline-success mt-1 text-dark" title="Submit New Report">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import Notification from '../utils/Notification'
import { bugsService } from '../services/BugsService'
export default {
  name: 'NewBugComponent',
  setup() {
    const state = reactive({
      newBug: {}
    })
    return {
      state,
      async createBug() {
        try {
          state.newBug.closedDate = null
          await bugsService.createBug(state.newBug)
          state.newBug = {}
          Notification.toast('Your Bug Has Been Reported.', 'success')
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
