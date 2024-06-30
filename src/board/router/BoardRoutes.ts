import BoardRegisterPage from "@/board/pages/register/BoardRegisterPage.vue";
import BoardListPage from "@/board/pages/list/BoardListPage.vue";
import BoardReadPage from "@/board/pages/read/BoardReadPage.vue";
import BoardModifyPage from "@/board/pages/modify/BoardModifyPage.vue";


const BoardRoutes = [
    {
        path: '/board/register',
        name: 'BoardRegisterPage',
        component: BoardRegisterPage
    },
    {
        path: '/board/list',
        name: 'BoardListPage',
        component: BoardListPage
    },
    {
        path: '/board/read/:board_id',
        name: 'BoardReadPage',
        components: {
            default: BoardReadPage,
        },
        props: {
            default: true,
        }
    },
    {
        path: '/board/modify/:board_id',
        name: 'BoardModifyPage',
        components: {
            default: BoardModifyPage,
        },
        props: {
            default: true
        }
    },
]

export default BoardRoutes;