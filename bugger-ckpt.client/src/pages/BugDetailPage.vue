<template>
  <div class="home bug-detail container-fluid" v-if="state.activeBug">
    <div class="row mx-1 my-1 justify-content-between">
      <div class="col-md-4">
        <div>
          <h3>{{ state.activeBug.title }}</h3>
        </div>
      </div>
      <div class="col-md-3 d-flex">
        <div v-if="state.activeBug.closed">
          {{ state.activeBug.closedDate }}
        </div>
        <div v-else>
          <button class="btn btn-outline-danger text-dark" title="Close This Bug" v-if="state.user.isAuthenticated && state.account.id === state.activeBug.creatorId" @click="closeBug">
            <b>Close This Bug</b>
          </button>
        </div>
      </div>
    </div>

    <div class="row mx-1 my-1 justify-content-between">
      <div class="col-md-6 d-flex flex-row">
        <p class="font-weight-lighter">
          Reported by: <img :src="state.activeBug.creator.picture" height="30" alt="" class="user-photo rounded-circle"><b> {{ state.activeBug.creator.name }}</b>
        </p>
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

        <button class="btn btn-outline-primary text-dark"
                title="Add A Note"
                data-toggle="collapse"
                data-target="#new-note"
                v-if="state.user.isAuthenticated"
        >
          <b>Add A Note</b>
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
import { notesService } from '../services/NotesService'
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
        await bugsService.getActiveBug(route.params.id)
        await notesService.getNotesByBugId(route.params.id)
      } catch (error) {
        Notification.toast('error:' + error, 'warning')
      }
    })
    return {
      state,
      route,
      async closeBug() {
        try {
          if (await Notification.confirmAction('Are you sure?', 'This bug will be permanently closed!', 'warning', 'Yes, close bug!')) {
            await bugsService.closeBug(state.activeBug, state.activeBug.id)
          }
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
