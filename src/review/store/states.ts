export interface ReviewState {
    reviews: Review[];
    review: Review | null;
    pagedItems: {
        page: number;
        items: Review[];
    };
}

export interface Review {
    reviewId: number;
    title: string;
    writer: string;
    content: string;
    regDate: string;
    updDate: string;
}

const state: ReviewState = {
    reviews: [],
    review: null,
    pagedItems: {
        page: 1,
        items: []
    }
}

export default state;
