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
    requestBoardListToDjango(context: ActionContext<BoardState, any>): Promise<void>
    requestBoardToDjango(context: ActionContext<BoardState, any>, board_id: number): Promise<void>
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
    },

    async requestBoardListToDjango(context: ActionContext<BoardState, any>): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.get('/board/list/');
            const data: Board[] = res.data;
            context.commit('REQUEST_BOARD_LIST_TO_DJANGO', data);
        } catch (error) {
            console.error('Error fetching board list:', error);
            throw error
        }
    },

    async requestBoardToDjango(context: ActionContext<BoardState, any>, board_id: number): Promise<void> {
        try {
            const res: AxiosResponse<Board> = await axiosInst.djangoAxiosInst.get(`/board/read/${board_id}`);
            context.commit('REQUEST_BOARD_TO_DJANGO', res.data);
        } catch (error) {
            console.error('Error fetching board:', error)
            throw error
        }
    },
}

export default actions