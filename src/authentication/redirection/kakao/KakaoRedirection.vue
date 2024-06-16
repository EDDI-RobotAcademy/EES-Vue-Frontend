<template>
    <div></div>
</template>

<script>
import { mapActions } from 'vuex'

const authenticationModule = 'authenticationModule'

export default {
    methods: {
        ...mapActions(authenticationModule, ['requestAccessTokenToDjangoRedirection', 'requestUserInfoToDjango']),
        async setRedirectData () {
            const code = this.$route.query.code
            console.log('code:', code)
            await this.requestAccessTokenToDjangoRedirection({ code })
        }
    },
    async created () {
        await this.setRedirectData()
    }
}
</script>