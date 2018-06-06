import test from '../../components/test'
new Vue({
    el: '#pc-app',
    store,
    computed: {
        username() {
            return this.$store.state.project.username
        }
    },
    components: {
        test,
    },
})