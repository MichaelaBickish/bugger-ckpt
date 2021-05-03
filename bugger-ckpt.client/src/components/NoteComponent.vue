<template>
  <div class="note-component">
    <tr>
      <th scope="row">
        1
      </th>
      <td>Mark</td>
      <td>Otto</td>
    </tr>
  </div>
</template>

<script>
export default {
  name: 'NoteComponent',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
