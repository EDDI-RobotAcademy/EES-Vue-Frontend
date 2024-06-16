import { MutationTree } from "vuex";
import { ReviewState, Review } from "./states";
import { REQUEST_REVIEW_LIST_TO_DJANGO } from "./mutation-types";

export interface ReviewMutations extends MutationTree<ReviewState> {
    'REQUEST_REVIEW_LIST_TO_DJANGO' (state: ReviewState, receiveData: Review[]): void
}

const mutations: MutationTree<ReviewState> = {
    [REQUEST_REVIEW_LIST_TO_DJANGO] (state: ReviewState, receiveData: Review[]): void {
        state.reviews = receiveData
    }
}

export default mutations as ReviewMutations;
