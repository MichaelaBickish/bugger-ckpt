<template>
  <div class="home container-fluid">
    <div class="row mx-2 my-4">
      <div class="col-md-6 d-flex justify-content-start">
        <h2 class="text-dark mb-0">
          Bug Report
        </h2>
      </div>

      <div class="col-md-6 d-flex justify-content-end">
        <span>Filter Checkbox</span>
      </div>
    </div>

    <div class="row mx-2 mb-1">
      <div class="col-md-12 d-flex flex-column align-items-start">
        <button class="btn btn-outline-primary"
                title="Report a New Bug"
                type="button"
                data-toggle="collapse"
                data-target="#new-bug-report"
                v-if="state.user.isAuthenticated"
                aria-expanded="false"
        >
          Report a New Bug!
        </button>
        <div class="collapse w-100" id="new-bug-report">
          <div class="card card-body bg-transparent mt-2 text-left">
            <!-- Inject new bug form component here -->
            <NewBugComponent />
          </div>
        </div>
      </div>
    </div>

    <div class="row mx-1">
      <!-- bug table -->
      <div class="bug-component col-md-12 table-responsive">
        <table class="table table-hover table-dark text-left">
          <caption>List of Bugs</caption>
          <thead>
            <tr>
              <th scope="col">
                Title
              </th>
              <th scope="col">
                Reported By
              </th>
              <th scope="col">
                Status
              </th>
              <th scope="col">
                Last Modified
              </th>
              <th scope="col">
                Bug Details
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- inject bug comp here into the table rows -->
            <BugComponent v-for="bug in state.bugs" :key="bug.id" :bug="bug" />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { bugsService } from '../services/BugsService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await bugsService.getAllBugs()
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
