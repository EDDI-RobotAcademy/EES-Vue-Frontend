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
        <v-card-text class="image-placeholder">
          이미지 구현 예정
        </v-card-text>
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
import '@mdi/font/css/materialdesignicons.css'  // MDI 아이콘 CSS를 가져옵니다.

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
    navigateToList() {
      this.$router.push('/review/list');
    }
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
  max-width: 1200px;
  margin: 0 auto;
}

.question-card {
  max-width: 800px;
  width: 100%;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.question-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
}

.title-section {
  background-color: #000000;
  color: #ffffff;
  padding: 16px 24px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1.2rem;
  text-align: center;
}

.subtitle-section {
  padding: 16px 24px;
  color: #757575;
  font-size: 1rem;
  border-bottom: 1px solid #eeeeee;
  text-align: center;
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  background-color: #f5f5f5;
  color: #757575;
  font-size: 1.2rem;
  font-weight: bold;
  border-top: 1px solid #eeeeee;
}

.content-section {
  padding: 16px 24px;
  color: #333333;
  font-size: 1rem;
  line-height: 1.5;
  border-top: 1px solid #eeeeee;
  text-align: center;
}

.left-arrow, .right-arrow {
  font-size: 3rem;
  cursor: pointer;
  color: #000000;
}

.left-arrow:hover, .right-arrow:hover {
  color: #555555;
}

.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #000000; /* 검은색 배경 */
  color: #ffffff; /* 흰색 아이콘 */
  padding: 10px 20px;
  border-radius: 50%;
  text-align: center;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
}

.floating-button:hover {
  background-color: #333333; /* hover 시 약간 어두운 검은색 */
}

.mdi-icon-white {
  color: #ffffff;
}
</style>
