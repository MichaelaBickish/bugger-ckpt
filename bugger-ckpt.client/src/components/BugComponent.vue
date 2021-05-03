<template class="bug-component">
  <tr>
    <th scope="row">
      {{ bug.title }}
    </th>
    <td>{{ bug.creator.name }}</td>
    <td>
      <span v-if="bug.closed" class="font-weight-bold text-danger">
        Closed
      </span>
      <span v-else class="text-success">Open</span>
    </td>
    <td>{{ new Date (bug.updatedAt).toLocaleString(time) }}</td>
    <router-link :to="{ name: 'BugDetailPage', params: { id: bug.id } }">
      <td title="Click to View This Bug's Details Page">
        View Details
      </td>
    </router-link>
  </tr>
</template>

<script>
export default {
  name: 'BugComponent',
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      time: {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
