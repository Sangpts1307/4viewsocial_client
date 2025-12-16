<template>
  <div class="profile-page col-md-12">
    <!-- SIDEBAR -->
    <SidebarComponent />

    <!-- CONTENT -->
    <div class="profile-content">
      <!-- Profile info -->
      <div class="profile-header">
        <div class="avatar-box">
          <img src="@/assets/avtgd2.jpg" />
        </div>

        <div class="info-box">
          <h3>
            xxxibgdrgn88_
            <i class="bi bi-gear"></i>
          </h3>

          <div class="stats">
            <span><b>1041</b> bài viết</span>
            <span><b>29,9Tr</b> người theo dõi</span>
            <span><b>1</b> đang theo dõi</span>
          </div>

          <p><b>Kwon Ji Yong</b></p>

          <button class="btn btn-light border">
            Chỉnh sửa trang cá nhân
          </button>
        </div>
      </div>

      <hr />

      <!-- Menu -->
      <div class="profile-menu">
        <button class="btn btn-outline-dark btn-sm">
          <i class="bi bi-grid-3x3-gap"></i> Bài viết
        </button>
        <button class="btn btn-outline-dark btn-sm">
          <i class="bi bi-tags"></i> Yêu thích
        </button>
      </div>

      <!-- Gallery -->
      <div class="gallery">
        <div
          class="gallery-item"
          v-for="(img, i) in images"
          :key="i"
        >
          <img :src="img" />
        </div>
      </div>
    </div>

    <!-- Chat Widget -->
        <ChatWidget />
  </div>
</template>

<script setup>
import SidebarComponent from "@/components/SidebarComponent.vue";
import ChatWidget from "@/components/ChatWidget.vue";
import { ref } from "vue";

const images = ref([
  new URL("@/assets/post2.jpg", import.meta.url).href,
  new URL("@/assets/post2.jpg", import.meta.url).href,
  "https://via.placeholder.com/500",
  "https://via.placeholder.com/500",
  "https://via.placeholder.com/500",
  "https://via.placeholder.com/500",
]);
</script>

<style scoped>
/* ===== LAYOUT ===== */
.profile-page {
  display: flex;
  background: #fafafa;
}

/* Content nằm sát trên */
.profile-content {
  margin-left: 250px; /* đúng bằng width sidebar */
  padding: 20px 40px;
  width: calc(100% - 250px);
}

/* ===== PROFILE HEADER ===== */
.profile-header {
  display: flex;
  gap: 50px;
  align-items: center;
}

.avatar-box img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.stats {
  display: flex;
  gap: 30px;
  margin: 15px 0;
}

/* ===== MENU ===== */
.profile-menu {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

/* ===== GALLERY ===== */
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.gallery img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
}
</style>
