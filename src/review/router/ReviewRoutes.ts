import ReviewListPage from "@/review/pages/list/ReviewListPage.vue"
import ReviewRegisterPage from "@/review/pages/register/ReviewRegisterPage.vue"
import ReviewReadPage from "@/review/pages/read/ReviewReadPage.vue"
const ReviewRoutes = [
    {
        path: '/review/list',
        name: 'ReviewListPage',
        component: ReviewListPage,
    },
    {
        path: '/review/register',
        name: 'ReviewRegisterPage',
        component: ReviewRegisterPage,
    },
    {
        path: '/review/read',
        name: 'ReviewReadPage',
        component: ReviewReadPage,
    }
]


export default ReviewRoutes