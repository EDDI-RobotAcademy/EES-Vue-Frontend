<template>
    <v-container>
        <v-card flat class="pa-4">
            <v-form ref="form">
                <v-text-field
                    v-model="username"
                    label="ID"
                    prepend-icon="mdi-account"
                    type="text"
                    required
                    dense
                />
                <v-text-field
                    v-model="password"
                    type="password"
                    label="PASSWORD"
                    prepend-icon="mdi-lock"
                    required
                    dense
                />
                <v-checkbox
                    v-model="autoLogin"
                    label="자동 로그인"
                    class="mt-0 mb-0 pa-0 small-checkbox"
                />
                <v-btn color="black" class="white--text mt-1" block @click="login">로그인</v-btn>
                <div class="find-id-pw-options mt-2">
                    <div>
                        <v-icon small class="ml-2">mdi-account-search</v-icon>
                        <span class="option-text"> ID 찾기 </span>
                    </div>
                    <span class="find-id-pw-separator">|</span>
                    <div>
                        <v-icon small class="ml-2">mdi-lock-reset</v-icon>
                        <span class="option-text"> PW 찾기 </span>
                    </div>
                    <span class="find-id-pw-separator">|</span>
                    <div>
                        <router-link :to="{ name: 'AccountRegisterPage' }" class="custom-link">
                            <v-icon small class="ml-2">mdi-account-plus</v-icon>
                                <span class="option-text"> 회원 가입 </span>
                        </router-link>
                    </div>
                </div>
                <v-btn color="yellow darken-2" class="black--text mt-2" block @click="goToKakaoLogin">
                    <v-icon left>mdi-chat</v-icon>
                    카카오 로그인
                </v-btn>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
import { useStore } from 'vuex'

const authenticationModule = 'authenticationModule'

export default {
    setup () {
        const store = useStore()

        const goToKakaoLogin = async () => {
            await store.dispatch("authenticationModule/requestKakaoOauthRedirectionToDjango")
        }

        return {
            goToKakaoLogin
        }
    }
}
</script>

<style scoped>
.v-container {
    max-width: 400px;
    margin: auto;
    padding-top: 100px;
}

.find-id-pw-options {
    display: flex;
    align-items: center;
    justify-content: center;
}

.find-id-pw-separator {
    margin: 0 8px;
    color: #000000;
}

.custom-link {
  color: black;
  text-decoration: none; /* 링크 밑줄 없애기 */
}

.custom-link:hover {
  color: black; /* 링크를 마우스로 가리킬 때도 검정색 유지 */
  text-decoration: none; /* 링크를 마우스로 가리킬 때도 밑줄 없애기 */
}
</style>
