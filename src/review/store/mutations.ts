import { MutationTree } from "vuex";
import { ReviewState, Review } from "./states";
import { 
    REQUEST_REVIEW_TO_DJANGO,
    REQUEST_REVIEW_LIST_TO_DJANGO 
} from "./mutation-types";

export interface ReviewMutations extends MutationTree<ReviewState> {
    [REQUEST_REVIEW_TO_DJANGO] (state: ReviewState, receivedData: Review): void
    [REQUEST_REVIEW_LIST_TO_DJANGO] (state: ReviewState, receivedData: Review[]): void
}

const mutations: MutationTree<ReviewState> = {
    [REQUEST_REVIEW_TO_DJANGO] (state: ReviewState, receivedData: Review): void {
        state.review = receivedData
    },
    [REQUEST_REVIEW_LIST_TO_DJANGO] (state: ReviewState, receivedData: Review[]): void {
        state.reviews = receivedData
    }
}

// 현재 Review Domain 만 다루고 있기 때문에 사실 아래와 같은 작업이 필요 없음
// 그러나 앞으로 추가할 것들을 고려한다면 예약어인 mutations를 피해야합니다.
// 고로 as를 사용하여 Review Domain 전용 Mutations라는 것을 표기하였습니다.
export default mutations as ReviewMutations