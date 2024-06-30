<template>
  <v-container class="container">
    <v-row justify="center" align="center" class="full-height">
      <v-col cols="12" md="8">
        <h2 v-if="step === 1" class="rating-text">{{ displayedText }}<span v-if="showCursor" class="cursor">|</span></h2>
        <div v-if="step === 1" class="rating-section">
          <div class="stars-wrapper">
            <v-icon
              v-for="n in 5"
              :key="n"
              :style="{ visibility: n <= showStars ? 'visible' : 'hidden', color: n <= hoverRating ? '#FFD700' : '#C0C0C0' }"
              class="star"
              @click="rating = n"
              @mouseover="hoverRating = n"
              @mouseleave="hoverRating = rating"
            >
              mdi-star
            </v-icon>
          </div>
        </div>
        <div v-if="step === 2">
          <v-row justify="center">
            <v-col cols="12" class="d-flex justify-center">
              <v-text-field v-model="title" label="제목" outlined dense class="input-custom mt-3" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" class="d-flex justify-center">
              <v-text-field v-model="writer" label="작성자" outlined dense class="input-custom mt-3" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" class="d-flex justify-center">
              <v-textarea v-model="content" label="내용" auto-grow outlined dense class="input-custom mt-3" />
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-icon class="left-arrow" @click="previousStep" v-if="step > 1">mdi-chevron-left</v-icon>
    <v-icon class="right-arrow" @click="handleNextClick">
      {{ step === 2 ? 'mdi-check' : 'mdi-chevron-right' }}
    </v-icon>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

const reviewModule = 'reviewModule'

export default {
  data() {
    return {
      product: '',
      title: '',
      writer: '',
      content: '',
      rating: 0,
      hoverRating: 0,
      step: 1, // 초기 step을 1로 설정
      fullText: '별점을 선택해 주세요.',
      displayedText: '',
      showCursor: true,
      showStars: 0,
      starsDisplayed: false // 별이 이미 표시되었는지를 추적하는 상태 변수
    }
  },
  mounted() {
    if (this.step === 1) {
      this.typeText()
    }
    setInterval(() => {
      this.showCursor = !this.showCursor
    }, 500) // 커서 깜빡임 간격 설정
  },
  methods: {
    ...mapActions(reviewModule, ['requestCreateReviewToDjango']),
    typeText() {
      if (this.starsDisplayed) {
        return; // 별이 이미 표시되었으면 함수 종료
      }

      this.displayedText = ''; // displayedText 초기화
      let index = 0
      const typingInterval = setInterval(() => {
        if (index < this.fullText.length) {
          this.displayedText += this.fullText.charAt(index)
          index++
        } else {
          clearInterval(typingInterval)
          this.showStarIncrementally()
        }
      }, 100) // 각 글자가 100ms 간격으로 나타나게 설정
    },
    showStarIncrementally() {
      if (this.starsDisplayed) {
        return; // 별이 이미 표시되었으면 함수 종료
      }

      let starCount = 0
      const starInterval = setInterval(() => {
        if (starCount < 5) {
          starCount++
          this.showStars = starCount
        } else {
          clearInterval(starInterval)
          this.starsDisplayed = true; // 별이 모두 표시되었음을 추적
        }
      }, 300) // 각 별이 300ms 간격으로 나타나게 설정
    },
    nextStep() {
      console.log('Next Step called. Current step:', this.step); // 디버깅용 로그 추가
      if (this.step === 1) {
        this.showStars = 0
        this.starsDisplayed = false; // step 변경 시 별 표시 상태 초기화
      }
      this.step++
      console.log('Step increased. New step:', this.step); // 디버깅용 로그 추가
      if (this.step === 1) {
        this.typeText()
      }
      if (this.step === 2) {
        this.showStars = 0
      }
    },
    previousStep() {
      this.step--
      if (this.step === 1) {
        this.starsDisplayed = false; // step 변경 시 별 표시 상태 초기화
        this.showStars = 0; // 별의 표시 상태 초기화
        this.typeText(); // 별점 텍스트와 별을 다시 표시
      }
    },
    async onSubmit() {
      const payload = {
        product: this.product,
        title: this.title,
        writer: this.writer,
        content: this.content,
        rating: this.rating
      }
      console.log('Submitting form with payload:', payload); // 디버깅용 로그 추가
      await this.requestCreateReviewToDjango(payload)
      this.$router.push({ name: 'ReviewListPage' })
    },
    handleNextClick() {
      if (this.step === 2) {
        this.onSubmit()
      } else {
        this.nextStep()
      }
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  height: 100vh;
}

.full-height {
  height: 100%;
}

.card-custom {
  background-color: #2c2c2c;
  color: #fff;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.input-custom {
  background-color: #3c3c3c;
  color: #fff;
  border-radius: 4px;
  width: 100%;
  margin: 0;
}

.full-width {
  width: 80% !important; /* 너비를 80%로 설정하고 우선순위를 높임 */
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
  left: 16px;
}

.right-arrow {
  right: 16px;
}

.left-arrow:hover, .right-arrow:hover {
  color: #4caf50;
}

.icon-green {
  color: #4caf50;
}

.rating-text {
  color: #000000;
  margin-bottom: 16px;
  font-size: 1.5em;
  text-align: center;
}

.product-text {
  color: #000000;
  margin-bottom: 16px;
  font-size: 1.5em;
  text-align: center;
}

.cursor {
  display: inline-block;
  background-color: #000;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.stars-wrapper {
  display: flex;
  justify-content: center;
}

.star {
  font-size: 2rem;
  margin: 0 15px; /* 별 사이 간격 조절 */
  cursor: pointer;
  transition: color 0.3s;
}
</style>