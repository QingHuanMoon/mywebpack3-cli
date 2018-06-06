new Vue({
    el: '#pc-app',
    store,
    computed: {
      username() {
          return this.$store.state.project.username
      }
    },
    mounted() {
        this.username
    }
})