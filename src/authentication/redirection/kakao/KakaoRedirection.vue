<template>
    <div></div>
</template>

<script>
import { mapActions } from 'vuex'

const authenticationModule = 'authenticationModule'

export default {
    methods: {
        async setRedirectData () {
            const code = this.$route.query.code
            console.log('code:', code)
        }
    },
    async created () {
        await this.setRedirectData()
    }
}
</script>