<template>
  <v-container>
    <v-row class="my-5" justify="center">
      <v-col cols="12" class="text-center">
        <h2>PHOTO REVIEW</h2>
        <router-link
          class="floating-button"
          :to="{ name: 'ReviewRegisterPage' }"
        >
          <v-icon left>mdi-pencil</v-icon>
        </router-link>
      </v-col>
      <v-col cols="12" class="text-center mb-4">
        <v-btn-toggle class="mx-auto" rounded>
          <v-btn
            class="toggle-btn"
            :class="{ 'active-btn': selectedToggle === '베스트 리뷰' }"
            @click="selectedToggle = '베스트 리뷰'"
          >
            베스트 리뷰
          </v-btn>
          <v-btn
            class="toggle-btn"
            :class="{ 'active-btn': selectedToggle === '스태프 리뷰' }"
            @click="selectedToggle = '스태프 리뷰'"
          >
            스태프 리뷰
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="12" class="d-flex justify-center mb-4">
        <v-select
          :items="sortOptions"
          v-model="selectedSort"
          label="정렬"
          class="mr-4"
          hide-details
        ></v-select>
        <v-select
          :items="categoryOptions"
          v-model="selectedCategory"
          label="카테고리별 리뷰 보기"
          class="mr-4"
          hide-details
        ></v-select>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="원하는 단어를 검색하세요"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-card class="pa-5">
          <v-card-text>
            <v-row>
              <v-col
                v-for="review in displayedReviews"
                :key="review.reviewId"
                cols="12"
                sm="6"
                md="3"
                class="px-1"
              >
                <v-card class="mx-auto text-center" max-width="400" @click="readRow(review)">
                  <v-img :src="review.imageUrl" height="200px"></v-img>
                  <v-card-title class="review-title">{{ review.title }}</v-card-title>
                  <v-card-subtitle class="review-writer">{{ review.writer }}</v-card-subtitle>
                  <v-card-subtitle>{{ formatDate(review.regDate) }}</v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-row align="center" class="grey--text">
                      <v-col cols="12">
                        <v-rating :value="review.rating" dense readonly></v-rating>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <div ref="loadMoreTrigger" style="height: 20px;"></div>
          </v-card-text>
        </v-card>
        <v-row class="d-flex justify-center">
          <v-col cols="12" class="text-center">
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
const reviewModule = 'reviewModule';

export default {
  data() {
    return {
      sortOptions: ['최신순', '평점 높은 순', '리뷰 많은 순'],
      selectedSort: '최신순',
      categoryOptions: ['전체', '카테고리1', '카테고리2', '카테고리3'],
      selectedCategory: '전체',
      selectedToggle: '베스트 리뷰',
      search: '',
      perPage: 8,
      displayedReviews: [],
      observer: null,
      loading: false,
    };
  },
  computed: {
    ...mapState(reviewModule, ['reviews']),
    filteredReviews() {
      let filtered = this.reviews;

      if (this.selectedCategory !== '전체') {
        filtered = filtered.filter((review) => review.category === this.selectedCategory);
      }

      if (this.search) {
        filtered = filtered.filter(
          (review) =>
            review.title.includes(this.search) ||
            review.writer.includes(this.search)
        );
      }

      if (this.selectedSort === '최신순') {
        filtered.sort((a, b) => new Date(b.regDate) - new Date(a.regDate));
      } else if (this.selectedSort === '평점 높은 순') {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (this.selectedSort === '리뷰 많은 순') {
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      }

      return filtered;
    },
  },
  mounted() {
    this.requestReviewListToDjango();
    this.initializeObserver();
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    ...mapActions(reviewModule, ['requestReviewListToDjango']),
    readRow(review) {
      this.$router.push({
        name: 'VuetifyReviewReadPage',
        params: { reviewId: review.reviewId.toString() }
      });
    },
    updateItems() {
      // 페이지네이션 변경 시 처리할 로직을 여기에 작성
    },
    initializeObserver() {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.loadMoreReviews();
        }
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      });

      this.$nextTick(() => {
        this.observer.observe(this.$refs.loadMoreTrigger);
      });
    },
    loadMoreReviews() {
      if (this.loading) return;

      this.loading = true;
      console.log('Loading more reviews...');
      setTimeout(() => {
        const currentLength = this.displayedReviews.length;
        if (currentLength < this.filteredReviews.length) {
          const nextReviews = this.filteredReviews.slice(currentLength, currentLength + this.perPage);
          this.displayedReviews = this.displayedReviews.concat(nextReviews);
        }
        this.loading = false;
      }, 1000);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}. ${month}. ${day}`;
    },
  },
  watch: {
    reviews(newReviews) {
      this.displayedReviews = newReviews.slice(0, this.perPage);
    },
    filteredReviews() {
      this.displayedReviews = this.filteredReviews.slice(0, this.perPage);
      this.observer.observe(this.$refs.loadMoreTrigger);
    }
  },
};
</script>

<style scoped>
h2 {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
}

.v-btn-toggle .v-btn {
  font-family: 'Arial', sans-serif;
  color: #555;
  background-color: white;
  border: 1px solid #ccc;
  margin: 0 5px;
  border-radius: 25px;
  min-width: 120px;
}

.v-btn-toggle .v-btn--active,
.v-btn-toggle .active-btn {
  background-color: black;
  color: white;
}

.v-select,
.v-text-field {
  max-width: 250px;
}

.v-card-title {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  text-align: center;
}

.v-card-subtitle {
  font-family: 'Arial', sans-serif;
  font-weight: normal;
  text-align: center;
}

.review-writer {
  font-weight: bold;
  color: #333;
}

.v-card {
  border-radius: 10px;
  background-color: #fafafa;
}

.v-rating {
  color: #ffd700;
}

.v-btn {
  color: #3f51b5;
}

.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #000;
  color: #fff;
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
  background-color: #333;
}
</style>
