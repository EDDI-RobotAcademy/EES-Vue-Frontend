export interface BoardState {
    boards: Board[]
    board: Board | null
}

export interface Board {
    board_id: number
    title: string
    writer: string
    content: string
    register_date: string
    update_date: string
}

const state: BoardState = {
    boards: [],
    board: null
}

export default state