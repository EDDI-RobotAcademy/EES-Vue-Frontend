<template>
    <div></div>
</template>

<script>
import { mapActions } from 'vuex'

const authenticationModule = 'authenticationModule'
const accountModule = 'accountModule'

export default {
    methods: {
        ...mapActions(authenticationModule, ['requestAccessTokenToDjangoRedirection', 'requestUserInfoToDjango']),
        ...mapActions(accountModule, ['requestEmailDuplicationCheckToDjango']),

        async setRedirectData () {
            const code = this.$route.query.code
            await this.requestAccessTokenToDjangoRedirection({ code })
            const userInfo = await this.requestUserInfoToDjango()
            const email = userInfo.kakao_account.email
            console.log('email: ', email)

            const isEmailDuplication = await this.requestEmailDuplicationCheckToDjango(email)
            if (isEmailDuplication === true) {
                console.log('기존 가입 고객입니다.')
                this.$router.push('/')
            } else {
                console.log('신규 가입 고객입니다.')
            }
        }
    },
    async created () {
        await this.setRedirectData()
    }
}
</script>