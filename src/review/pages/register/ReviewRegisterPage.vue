<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card class="elevation-2 card-custom">
                    <v-card-title class="headline"></v-card-title>
                    <v-card-text>
                        <v-form ref="form">
                            <v-text-field v-model="title" label="제목" outlined dense class="input-custom mt-3"/>
                            <v-text-field v-model="writer" label="작성자" outlined dense class="input-custom mt-3"/>
                            <v-textarea v-model="content" label="내용" auto-grow outlined dense class="input-custom mt-3"/>
                            <v-rating 
                              v-model="rating" 
                              background-color="yellow" 
                              color="yellow darken-3" 
                              dense
                              half-increments 
                              hover
                            ></v-rating>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-space-between">
                        <v-btn @click="onCancel" class="btn-custom">
                            <v-icon class="icon-red">mdi-undo</v-icon>
                        </v-btn>
                        <v-btn @click="onSubmit" class="btn-custom">
                            <v-icon class="icon-green">mdi-check</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
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
      rating: 0 // 추가된 부분
    }
  },
  methods: {
    ...mapActions(reviewModule, ['requestCreateReviewToDjango']),
    async onSubmit () {
      const payload = {
        title: this.title,
        writer: this.writer,
        content: this.content,
        rating: this.rating // 추가된 부분
      }
      await this.requestCreateReviewToDjango(payload)
      this.$router.push({ name: 'ReviewListPage' }) // 리뷰 리스트 페이지로 이동
    },
    onCancel () {
      this.$router.push({ name: 'ReviewListPage' })
    }
  }
}
</script>

<style scoped>
.card-custom {
    background-color: #2c2c2c;
    color: #fff;
    border-radius: 8px;
    padding: 16px;
}

.input-custom {
    background-color: #3c3c3c;
    color: #fff;
    border-radius: 4px;
}

.input-custom .v-label {
    color: #bdbdbd;
}

.btn-custom {
    color: #fff;
    margin: 0 8px;
    transition: background-color 0.3s ease;
}

.btn-custom:hover {
    background-color: #fff;
}

.btn-custom:hover .v-icon {
    color: #000;
}

.icon-green {
    color: #4caf50; /* 초록색 */
}

.icon-red {
    color: #f05650;
}

.v-icon {
    font-size: 24px; /* 아이콘 두께 증가 */
}
</style>
