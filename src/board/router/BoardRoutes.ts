import BoardRegisterPage from "@/board/pages/register/BoardRegisterPage.vue";


const BoardRoutes = [
    {
        path: '/board/register',
        name: 'BoardRegisterPage',
        component: BoardRegisterPage
    {
        path: '/board/list',
        name: 'BoardListPage',
        component: BoardListPage
    },
    }
]

export default BoardRoutes;