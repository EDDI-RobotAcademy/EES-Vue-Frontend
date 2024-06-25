import { ActionContext } from "vuex"
import { Review, ReviewState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"
import { REQUEST_REVIEW_LIST_TO_DJANGO } from "./mutation-types"

export type ReviewActions = {
    requestReviewToDjango(context: ActionContext<ReviewState, any>, reviewId: number): Promise<void>
    requestReviewListToDjango(context: ActionContext<ReviewState, any>): Promise<void>
    requestCreateReviewToDjango(context: ActionContext<ReviewState, unknown>, payload: {
        title: string, writer: string, content: string
    }): Promise<AxiosResponse>
}

const actions: ReviewActions = {
    async requestReviewToDjango(context: ActionContext<ReviewState, any>, reviewId: number): Promise<void> {
        try {
            const res: AxiosResponse<Review> = await axiosInst.djangoAxiosInst.get(`/review/read/${reviewId}`);
            console.log('data:', res.data)
            context.commit('REQUEST_REVIEW_TO_DJANGO', res.data);
        } catch (error) {
            console.error('requestReviewToDjango() 문제 발생:', error);
            throw error
        }
    },
    async requestReviewListToDjango(context: ActionContext<ReviewState, any>): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.get('/review/list/');
            const data: Review[] = res.data;
            context.commit('REQUEST_REVIEW_LIST_TO_DJANGO', data);
        } catch (error) {
            console.error('Error fetching review list:', error);
            throw error
        }
    },
    async requestCreateReviewToDjango(context: ActionContext<ReviewState, unknown>, payload: {
        title: string, writer: string, content: string, rating: number
    }): Promise<AxiosResponse> {

        console.log('requestCreateReviewToDjango()')

        const { title, writer, content, rating } = payload
        console.log('전송할 데이터:', { title, writer, content, rating })

        try {
            const res: AxiosResponse = await axiosInst.djangoAxiosInst.post(
                '/review/register', { title, writer, content, rating})

            console.log('res:', res.data)
            return res.data
        } catch (error) {
            alert('requestCreateReviewToDjango() 문제 발생!')
            throw error
        }
    }
};

export default actions;