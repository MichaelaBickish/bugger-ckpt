<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h1 title="Go Back to Bug Log" class="text-primary">
          the <i class="fas fa-bug text-white"></i> log
        </h1>
      </div>
    </router-link>
    <span class="navbar-text">
      <button
        class="btn btn-outline-primary text-uppercase"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>

      <div class="dropdown" v-else>
        <div
          class="dropdown-toggle"
          @click="state.dropOpen = !state.dropOpen"
        >
          <img
            :src="user.picture"
            alt="user photo"
            height="40"
            title="Account Options"
            class="rounded-circle"
          />
          <span class="mx-3" title="Account Options">{{ user.name }}</span>
        </div>
        <div
          class="dropdown-menu p-0 list-group w-100"
          :class="{ show: state.dropOpen }"
          @click="state.dropOpen = false"
        >
          <router-link :to="{ name: 'Account' }">
            <div class="list-group-item list-group-item-action hoverable" title="View My Account">
              Account
            </div>
          </router-link>
          <div
            class="list-group-item list-group-item-action hoverable"
            title="Logout"
            @click="logout"
          >
            logout
          </div>
        </div>
      </div>
    </span>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'Navbar',
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
</style>
