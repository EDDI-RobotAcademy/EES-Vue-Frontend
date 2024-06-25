<template>
    <v-container>
        <v-card v-if="review">
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="review.title" readonly label="제목"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="review.writer" readonly label="작성자"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea v-model="review.content" readonly label="내용" auto-grow/>
                        </v-col>
                    </v-row>
                    <v-row justify="end">
                        <v-col cols="auto">
                        </v-col>
                        <v-col cols="auto">
                            <v-btn color="error" @click="onDelete">삭제</v-btn>
                        </v-col>
                        <v-col cols="auto">
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
const reviewModule = 'reviewModule'
export default {
    props: {
        reviewId: {
            type: String,
            required: true,
        }
    },
    computed: {
        ...mapState(reviewModule, ['review'])
    },
    methods: {
        ...mapActions(reviewModule, ['requestReviewToDjango']),
    },
    created () {
        this.requestReviewToDjango(this.reviewId)
    },
}
</script>