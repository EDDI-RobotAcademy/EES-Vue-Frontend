<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="title" label="제목"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="writer" label="작성자"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="content" label="내용" auto-grow/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="text-right">
                <v-btn class="ml-2" color="primary" @click="onSubmit">작성 완료</v-btn>
                <v-btn class="ml-1" color="error" @click="onCancel">취소</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
const reviewModule = 'reviewModule'
export default {
    data () {
        return {
            title: '',
            writer: '',
            content: '',
        }
    },
    methods: {
        ...mapActions(reviewModule, ['requestCreateReviewToDjango']),
        async onSubmit () {
            console.log('작성 완료 버튼 눌럿지 ?')
            const payload = {
                title: this.title,
                writer: this.writer,
                content: this.content,
            }
            console.log('payload check:', payload)
            const board = await this.requestCreateReviewToDjango(payload)
        },
        async onCancel () {
            console.log('취소 버튼 눌럿지 ?')
        }
    }
}
</script>