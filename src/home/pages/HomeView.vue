<template>
  <div class="home-container">
    <img :src="imageSrc" alt="Home Image" class="home-image"/>
    <div class="text-container">
      <p class="subtitle">나이키 페가수스 41</p>
      <h2 class="title">에너지를 낭비하지 마세요</h2>
      <p class="description">페가수스를 신고 달려 보세요.<br>에어 줌이 선사하는 탁월한 에너지 반환력과 완전히 새롭게 태어난 리액트X 폼을 직접 느껴 보세요.</p>
      <div class="buttons">
        <button class="buy-button">남성용 구매하기</button>
        <button class="buy-button">여성용 구매하기</button>
        <button class="buy-button">키즈용 구매하기</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import imageSrc from '@/assets/images/homeImages/image1.jpg';

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      imageSrc
    };
  }
});
</script>

<style scoped>
.home-container {
  margin-top: 20px; /* 네비게이션 바와의 여유 공간 */
  text-align: center;
}

.home-image {
  width: 100%;
  max-width: 1200px; /* 적절한 크기로 설정 */
  height: auto;
  margin: auto;
  display: block;
  border-radius: 10px;
  object-fit: cover;
}

.text-container {
  margin-top: 20px;
}

.subtitle {
  font-size: 18px;
  color: #555;
}

.title {
  font-size: 36px;
  font-weight: bold;
  margin: 10px 0;
}

.description {
  font-size: 18px;
  color: #777;
}

.buttons {
  margin-top: 20px;
}

.buy-button {
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.buy-button:hover {
  background-color: #444;
}
</style>
