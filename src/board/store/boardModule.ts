import actions, { BoardActions } from './actions'
import mutations, { BoardMutations } from './mutations'
import state, { BoardState } from './states'


export interface BoardModule {
    namedspaced: true
    state: BoardState
    actions: BoardActions
    mutations: BoardMutations
}

const boardModule: BoardModule = {
    namedspaced: true,
    state,
    actions,
    mutations
}

export default boardModule