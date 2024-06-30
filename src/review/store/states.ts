export interface ReviewState {
    reviewList: Review[]
    review: Review | null
}

export interface Review {
    reviewId: number
    title: string
    writer: string
    content: string
    registeredDate: string
    updatedDate: string
}

const state: ReviewState = {
    reviewList: [],
    review: null,
}

export default state