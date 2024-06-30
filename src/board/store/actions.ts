import { ActionContext } from 'vuex'
import { Board, BoardState } from './states'
import axios, { AxiosResponse } from 'axios'
import axiosInst from '@/utility/axiosInstance'


export type BoardActions = {
    requestCreateBoardToDjango(context: ActionContext<BoardState, unknown>, payload: {
        title: string,
        writer: string,
        content: string,
    }): Promise<AxiosResponse>
}

const actions: BoardActions = {
    async requestCreateBoardToDjango(context: ActionContext<BoardState, unknown>, payload: {
        title: string,
        writer: string,
        content: string
    }): Promise<AxiosResponse> {
        const { title, writer, content } = payload
        try {
            const res: AxiosResponse = await axiosInst.djangoAxiosInst.post('/board/register', { title, writer, content })
            return res.data
        } catch (error) {
            alert('게시글 등록 실패.')
            throw error
        }
    }
}

export default actions