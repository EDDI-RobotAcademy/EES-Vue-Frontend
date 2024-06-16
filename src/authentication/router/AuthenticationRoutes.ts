import KakaoRedirection from "@/authentication/redirection/kakao/KakaoRedirection.vue"

const AuthenticationRoutes = [
    {
        path: '/kakao_oauth/access-token',
        name: 'KakaoRedirection',
        component: KakaoRedirection
    },
]

export default AuthenticationRoutes