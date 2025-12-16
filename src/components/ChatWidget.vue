<template>
  <!-- Nút mở chat -->
  <div class="chat-toggle" @click="toggleChat">
    <i class="bi bi-chat-dots-fill"></i>
    <span v-if="unread" class="badge"></span>
  </div>

  <!-- Hộp chat -->
  <div v-if="isOpen" class="chat-box">
    <!-- Header -->
    <div class="chat-header">
      <span>Tin nhắn</span>
      <div class="chat-actions">
        <!-- Nút chuyển sang màn Message -->
        <i
          class="bi bi-chat-dots"
          title="Mở trang tin nhắn"
          @click="goToMessage"
        ></i>
        <i class="bi bi-x-lg" @click="toggleChat"></i>
      </div>
    </div>

    <!-- Danh sách chat -->
    <div class="chat-body">
      <div class="chat-item" v-for="user in users" :key="user.id">
        <img :src="user.avatar" />
        <div class="chat-info">
          <strong>{{ user.name }}</strong>
          <small>{{ user.lastMessage }}</small>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="chat-footer">
      <input type="text" placeholder="Tìm kiếm..." />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isOpen = ref(false);
const unread = ref(true);

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  unread.value = false;
};

const goToMessage = () => {
  isOpen.value = false;
  router.push("/message");
};

const users = ref([
  {
    id: 1,
    name: "lavieducanh",
    lastMessage: "Có anh việt và 2 người khác",
    avatar: "https://i.pravatar.cc/50?img=12",
  },
  {
    id: 2,
    name: "ha_zil.17",
    lastMessage: "Có vàngnguyên04",
    avatar: "https://i.pravatar.cc/50?img=32",
  },
  {
    id: 3,
    name: "tranparis_totoro",
    lastMessage: "Có qunz 2812",
    avatar: "https://i.pravatar.cc/50?img=56",
  },
]);
</script>

<style scoped>
  /*Button chat chuyển màn Message  */
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid #eee;
  font-weight: 600;
}

.chat-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-actions i {
  cursor: pointer;
  font-size: 16px;
  color: #555;
  transition: 0.2s;
}

.chat-actions i:hover {
  color: #ff4081;
}

/* Nút chat góc phải */
.chat-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #fff;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
}

.chat-toggle i {
  font-size: 24px;
}

/* Badge đỏ */
.badge {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
}

/* Hộp chat */
.chat-box {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 340px;
  height: 420px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  z-index: 1000;
}

/* Header */
.chat-header {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
}

.chat-header i {
  cursor: pointer;
}

/* Body */
.chat-body {
  flex: 1;
  overflow-y: auto;
}

.chat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-bottom: 1px solid #f1f1f1;
}

.chat-item img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.chat-info {
  flex: 1;
}

.chat-info small {
  display: block;
  color: #777;
  font-size: 12px;
}

/* Footer */
.chat-footer {
  padding: 10px;
  border-top: 1px solid #eee;
}

.chat-footer input {
  width: 100%;
  padding: 8px 10px;
  border-radius: 20px;
  border: 1px solid #ddd;
  outline: none;
}
</style>
