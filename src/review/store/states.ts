export interface ReviewState {
    reviews: Review[]
    review: Review | null
}

export interface Review {
    reviewId: number
    title: string
    writer: string
    content: string
    regDate: string
    updDate: string
}

const state: ReviewState = {
    reviews: [],
    review: null
}

export default state