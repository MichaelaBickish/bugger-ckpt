<template>
  <div class="about container-fluid">
    <div class="about container-fluid">
      <h2>Account Page</h2>
      <div class="row mx-4 my-5">
        <div class="col-md-6 d-flex flex-row align-items-center">
          <img class="rounded-circle my-3 mx-3" :src="account.picture" alt="" />
          <div><h3>Welcome,</h3><b>{{ account.name }}</b></div>
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center">
          <p class="font-weight-bold mb-0">
            My email
          </p>
          <p class="mb-0">
            {{ account.email }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
