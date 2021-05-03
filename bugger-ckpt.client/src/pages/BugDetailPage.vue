<template>
  <div class="home bug-detail container-fluid" v-if="state.activeBug">
    <div class="row mx-1 my-1 justify-content-between">
      <div class="col-md-4">
        <div>
          <h3>{{ state.activeBug.title }}</h3>
        </div>
      </div>
      <div class="col-md-3 d-flex">
        <div v-if="state.activeBug.closed"></div>
        <div v-else>
          <button class="btn btn-outline-danger">
            Close This Bug
          </button>
        </div>
      </div>
    </div>

    <div class="row mx-1 my-1 justify-content-between">
      <div class="col-md-6 d-flex flex-row">
        <h4 class="font-weight-lighter">
          Reported by: <b>{{ state.activeBug.creator.name }}</b>
        </h4>
      </div>
      <div class="col-md-3">
        <h4 class="font-weight-lighter">
          Status:
          <span v-if="state.activeBug.closed" class="font-weight-bold text-danger">Closed</span>
          <span v-else class="text-success font-weight-bold">Open</span>
        </h4>
      </div>
    </div>

    <div class="row mx-1 my-1">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            {{ state.activeBug.description }}
          </div>
        </div><p class="text-black-50 mb-0 mb-1 ml-1">
          Description of {{ state.activeBug.title }}
        </p>
      </div>
    </div>

    <div class="row mx-1 mt-4 align-items-center">
      <div class="col-md-12">
        <h5>Notes</h5>

        <button class="btn btn-outline-primary"
                title="Add A Note"
                data-toggle="collapse"
                data-target="#new-note"
                v-if="state.user.isAuthenticated"
        >
          Add A Note
        </button>
        <div class="collapse w-100" id="new-note">
          <div class="card card-body bg-transparent mt-2 text-left">
            <!-- Inject new note component here -->
            <NewNoteComponent />
          </div>
        </div>
      </div>
    </div>

    <div class="row mx-1">
      <div class="col-md-12 mt-2">
        <table class="table table-hover table-dark">
          <caption>List of {{ state.activeBug.title }}'s Notes</caption>
          <thead>
            <tr>
              <th scope="col">
                Name
              </th>
              <th scope="col">
                Message
              </th>
              <th scope="col">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Inject Note Component here. -->
            <NoteComponent v-for="note in state.notes" :key="note.id" :note="note" />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
export default {
  name: 'BugDetailPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      activeBug: computed(() => AppState.activeBug),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      notes: computed(() => AppState.notes)
    })
    onMounted(async() => {
      try {
        // debugger
        await bugsService.getActiveBug(route.params.id)
      } catch (error) {
        Notification.toast('error:' + error, 'warning')
      }
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
