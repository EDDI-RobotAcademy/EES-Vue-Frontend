<template>
  <v-container>
    <v-row class="my-5" justify="center">
      <v-col cols="12" class="text-center">
        <h2>PHOTO REVIEW</h2>
            <router-link :to="{ name: 'ReviewRegisterPage' }">
                게시물 작성
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
                v-for="review in filteredReviews"
                :key="review.reviewId"
                cols="12"
                md="6"
                lg="4"
              >
                <v-card class="mx-auto" max-width="400">
                  <v-img :src="review.imageUrl" height="200px"></v-img>
                  <v-card-title>{{ review.title }}</v-card-title>
                  <v-card-subtitle class="text-truncate"
                    >{{ review.writer }} - {{ review.regDate }}</v-card-subtitle
                  >
                  <v-card-text>{{ review.content }}</v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-row align="center" class="grey--text">
                      <v-col cols="6">
                        <v-rating :value="review.rating" dense readonly></v-rating>
                      </v-col>
                      <v-col cols="6" class="text-right">
                        <v-btn text small @click="readRow(review)">보기</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// eslint-disable-next-line
import { mapActions, mapState } from "vuex";

const reviewModule = "reviewModule";

export default {
  computed: {
    ...mapState(reviewModule, ["reviews"]),
    filteredReviews() {
      let filtered = this.reviews;

      if (this.selectedCategory !== "전체") {
        filtered = filtered.filter((review) => review.category === this.selectedCategory);
      }

      if (this.search) {
        filtered = filtered.filter(
          (review) =>
            review.title.includes(this.search) ||
            review.writer.includes(this.search) ||
            review.content.includes(this.search)
        );
      }

      if (this.selectedSort === "최신순") {
        filtered.sort((a, b) => new Date(b.regDate) - new Date(a.regDate));
      } else if (this.selectedSort === "평점 높은 순") {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (this.selectedSort === "리뷰 많은 순") {
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      }

      return filtered;
    },
  },
  mounted() {
    this.requestReviewListToDjango();
  },
  methods: {
    ...mapActions(reviewModule, ["requestReviewListToDjango"]),
    readRow(review) {
      console.log("지금 할 수 있는게 없다!");
    },
  },
  data() {
    return {
      sortOptions: ["최신순", "평점 높은 순", "리뷰 많은 순"],
      selectedSort: "최신순",
      categoryOptions: ["전체", "카테고리1", "카테고리2", "카테고리3"],
      selectedCategory: "전체",
      selectedToggle: "베스트 리뷰", // 선택된 토글 버튼 상태
      search: "",
    };
  },
};
</script>

<style scoped>
h2 {
  font-family: "Arial", sans-serif;
  font-weight: bold;
}

.v-btn-toggle .v-btn {
  font-family: "Arial", sans-serif;
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

.v-card-title,
.v-card-subtitle,
.v-card-text {
  font-family: "Arial", sans-serif;
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
</style>
