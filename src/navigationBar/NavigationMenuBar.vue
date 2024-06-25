<template>
  <v-app-bar color="black" app dark height="64">
    <v-toolbar-title class="navbar-title">
      <v-btn text @click="goToHome" class="navbar-title-btn">
        <v-icon class="mdi-icon" left>mdi-shoe-sneaker</v-icon>
        <span> IT, SHOE</span>
      </v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn text @click="goToProductList" class="btn-text">
      <span>PRODUCTS</span>
    </v-btn>
    <v-btn text class="btn-text">
      <span>COMMUNITY</span>
    </v-btn>
    <v-btn text @click="goToReviewList" class="btn-text">
      <span>REVIEW</span>
    </v-btn>
    <v-btn text @click="goToContact" class="btn-text">
      <span>CONTACT</span>
    </v-btn>
    <v-btn v-if="!isAuthenticated" text @click="signIn" class="btn-text">
      <v-icon left>mdi-login</v-icon>
      <span>LOGIN</span>
    </v-btn>
    <v-btn v-if="isAuthenticated" text @click="signOut" class="btn-text">
      <v-icon left>mdi-logout</v-icon>
      <span>LOGOUT</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import "@mdi/font/css/materialdesignicons.css";
import router from "@/router";
import { mapActions, mapState } from 'vuex'
const authenticationModule = 'authenticationModule'

export default {
  data() {
    return {
    };
  },
  computed: {
        ...mapState(authenticationModule, ['isAuthenticated'])
    },
  methods: {
    ...mapActions(authenticationModule, ['requestLogoutToDjango']),
    goToHome() {
      router.push("/");
    },
    goToProductList() {
      router.push("/product/list");
    },
    goToCommunityList() {
      router.push("/community/list");
    },
    goToReviewList() {
      router.push("/review/list");
    },
    goToContact() {
      router.push("/contact");
    },
    signIn() {
      router.push("/account/login");
    },
    signOut() {
      this.requestLogoutToDjango()
      router.push('/')
    },
  },
};
</script>

<style scoped>
.navbar-title {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.navbar-title-btn {
  color: white;
}

.mdi-icon {
  font-size: 32px; /* 아이콘 크기 설정 */
  margin-right: 8px;
}

.btn-text {
  font-size: 18px;
  margin-right: 16px;
  color: white;
}

.v-btn {
  text-transform: uppercase;
}

.v-btn:hover {
  background-color: rgba(255, 255, 255, 0.2); /* 선택된 효과를 나타내기 위해 배경색을 변경합니다. */
}

.v-btn:hover .btn-text {
  color: black; /* 마우스를 올렸을 때 텍스트 색상 변경 */
}
</style>
