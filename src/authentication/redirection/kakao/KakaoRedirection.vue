<template>
    <div></div>
</template>

<script>
import { mapActions } from 'vuex'

const authenticationModule = 'authenticationModule'

export default {
    methods: {
        ...mapActions(authenticationModule, 
            ['requestAccessTokenToDjangoRedirection', 'requestUserInfoToDjango']),
        async setRedirectData () {
            const code = this.$route.query.code
            await this.requestAccessTokenToDjangoRedirection({ code })
            const userInfo = this.requestUserInfoToDjango()
        }
    },
    async created () {
        await this.setRedirectData()
    }
}
</script>