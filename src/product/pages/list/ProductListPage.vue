<template lang="">
  <v-container> <h2>상품 리스트</h2> <v-row v-if="productList && productList.length > 0">
  <v-alert type="info">등록된 상품이 있습니다!</v-alert> </v-row> <v-row v-else> <v-col
  cols="12" class="text-center"> <v-alert type="info">등록된 상품이 없습니다!</v-alert>
  </v-col> </v-row> </v-container>
</template>
