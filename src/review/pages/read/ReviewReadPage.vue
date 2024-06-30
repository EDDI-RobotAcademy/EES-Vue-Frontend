<template>
  <v-container>
    <div class="navigation-container">
      <v-icon class="left-arrow" @click="navigateToPrevious">mdi-chevron-left</v-icon>
      <v-card v-if="review" class="question-card">
        <v-card-title class="title-section">
          {{ review.title }}
        </v-card-title>
        <v-card-subtitle class="subtitle-section">
          {{ review.writer }}
        </v-card-subtitle>
        <div class="image-placeholder">
          이미지 구현 예정
        </div>
        <v-card-text class="content-section">
          {{ review.content }}
        </v-card-text>
      </v-card>
      <v-icon class="right-arrow" @click="navigateToNext">mdi-chevron-right</v-icon>
    </div>
    <router-link class="floating-button" :to="{ name: 'ReviewListPage' }">
      <v-icon color="white">mdi-undo</v-icon>
    </router-link>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import '@mdi/font/css/materialdesignicons.css'

const reviewModule = 'reviewModule'
export default {
  props: {
    reviewId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(reviewModule, ['review']),
  },
  methods: {
    ...mapActions(reviewModule, ['requestReviewToDjango']),
    navigateToPrevious() {
      const previousId = Number(this.reviewId) - 1;
      if (previousId > 0) {
        this.$router.push(`/review/read/${previousId}`);
      }
    },
    navigateToNext() {
      const nextId = Number(this.reviewId) + 1;
      this.$router.push(`/review/read/${nextId}`);
    },
  },
  watch: {
    reviewId(newId) {
      this.requestReviewToDjango(newId);
    }
  },
  created() {
    this.requestReviewToDjango(this.reviewId)
  },
}
</script>

<style scoped>
.navigation-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 40px auto; /* 상단 네비게이션바와 거리 조정 */
}

.question-card {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 20px; /* 네비게이션바와 카드 사이 거리 조정 */
}

.image-placeholder {
  height: 300px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #757575;
  font-size: 1.2rem;
}

.title-section {
  padding: 16px;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: left;
  background-color: #fafafa;
  border-bottom: 1px solid #eeeeee;
}

.subtitle-section {
  padding: 8px 16px;
  color: #757575;
  font-size: 1rem;
  text-align: left;
  background-color: #fafafa;
  border-bottom: 1px solid #eeeeee;
}

.content-section {
  padding: 16px;
  color: #333333;
  font-size: 1rem;
  line-height: 1.5;
  background-color: #ffffff;
  text-align: left;
}

.left-arrow, .right-arrow {
  font-size: 3rem;
  cursor: pointer;
  color: #000000;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.left-arrow {
  left: 100px;
}

.right-arrow {
  right: 100px;
}

.left-arrow:hover, .right-arrow:hover {
  color: #4caf50;
}

.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #000000;
  color: #ffffff;
  padding: 10px;
  border-radius: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
}

.floating-button:hover {
  background-color: #333333;
}

.mdi-icon-white {
  color: #ffffff;
}
</style>
