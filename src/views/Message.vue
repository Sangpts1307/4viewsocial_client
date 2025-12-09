<template>
  <!-- <div class="container-fluid"> -->
    <div class="col-md-12">
        <div class="row">
        <!-- SIDEBAR -->
        
            <SidebarComponent />
       
      <!-- LIST CHAT -->
      <div class="col-md-3 border-end p-4">
        <h5 class="fw-bold mb-3">Tin nhắn</h5>

        <div v-for="item in chatList" :key="item.id"
             class="d-flex align-items-center p-2 chat-list-item border rounded mb-2"
             @click="openChat(item)">
          <img :src="item.avatar" class="rounded-circle me-3" width="50" />
          <div>
            <b>{{ item.name }}</b>
            <div class="text-muted small">{{ item.lastMessage }}</div>
          </div>
        </div>
      </div>

      <!-- CHAT BOX -->
      <div class="col-md-7 p-4">

        <div v-if="activeChat" class="d-flex align-items-center border-bottom pb-3 mb-3">
          <img :src="activeChat.avatar" class="rounded-circle me-3" width="50" />
          <h5 class="fw-bold mb-0">{{ activeChat.name }}</h5>
        </div>

        <div v-if="activeChat" class="chat-container mb-3">

          <div v-for="(msg, index) in activeChat.messages" :key="index"
              class="message-row">
            <div :class="msg.me ? 'chat-bubble-me' : 'chat-bubble-other'">
              {{ msg.text }}
            </div>
          </div>
        </div>

        <!-- INPUT -->
        <div v-if="activeChat" class="d-flex mt-3">
          <input v-model="messageText" type="text" class="form-control me-2" placeholder="Nhắn tin..." />
          <button class="btn btn-primary" @click="sendMessage">Gửi</button>
        </div>

        <p v-else class="text-center text-muted">Chọn 1 cuộc trò chuyện để bắt đầu.</p>

      </div>

    </div>
  </div>
</template>

<script>
import SidebarComponent from '@/components/SidebarComponent.vue';

export default {
  name: "MessagePage",

  components: {
    SidebarComponent
  },

  data() {
    return {
      messageText: "",

      chatList: [
        {
          id: 1,
          name: "Nam",
          avatar: "https://picsum.photos/50",
          lastMessage: "Hôm nay đi ăn không?",
          messages: [
            { text: "Hôm nay rảnh không?", me: false },
            { text: "Rảnh nè ", me: true },
            { text: "Đi ăn chung không?", me: false }
          ]
        },
        {
          id: 2,
          name: "Ngọc",
          avatar: "https://picsum.photos/51",
          lastMessage: "Để mai t gửi file nhé",
          messages: [
            { text: "Mai nhớ gửi t file bài nha", me: false },
            { text: "Ok để t làm 💗", me: true }
          ]
        },
        {
          id: 3,
          name: "Linh",
          avatar: "https://picsum.photos/52",
          lastMessage: "Ok nha",
          messages: [
            { text: "Chiều đi học hong?", me: false },
            { text: "Đi đi, trễ chết 😭", me: true }
          ]
        }
      ],

      activeChat: null,
    };
  },

  methods: {
    openChat(chat) {
      this.activeChat = chat;
    },

    sendMessage() {
      if (!this.messageText.trim()) return;

      this.activeChat.messages.push({
        text: this.messageText,
        me: true,
      });

      this.messageText = "";

      // Auto scroll to bottom
      this.$nextTick(() => {
        const container = document.querySelector(".chat-container");
        if (container) container.scrollTop = container.scrollHeight;
      });
    }
  }
};
</script>

<style scoped>
body {
  background: #fafafa;
}

.sidebar-icon {
  font-size: 22px;
  margin-right: 10px;
}

.chat-list-item:hover {
  background: #f5f5f5;
  cursor: pointer;
}

.chat-container {
  height: 70vh;
  overflow-y: auto;
}

.message-row {
  width: 100%;
  display: flex;
}

.message-row .chat-bubble-me {
  margin-left: auto;
}

.message-row .chat-bubble-other {
  margin-right: auto;
}

.chat-bubble-me,
.chat-bubble-other {
  padding: 10px 15px;
  border-radius: 15px;
  display: inline-block;
  max-width: 75%;
  word-break: break-word;
}
.chat-bubble-me {
  background: #ff90c2;
  color: #fff;
}
.chat-bubble-other {
  background: #e9ecef;
}
</style>
