<template>
    <div class="col-md-12">
        <div class="row">
            <!-- Sidebar trái -->
            <SidebarComponent />

            <!-- Feed chính -->
            <div class="col-md-6">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-2 add-story-box">
                            <div class="story-item add-story" @click="openStoryModal">
                                    <i class="bi bi-plus-lg"></i>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <!-- Story -->
                            <div class="story">
                                
                                <div class="story-item">
                                    <img src="../assets/post1.jpg" alt="Logo" />
                                </div>
                                <div class="story-item">
                                    <img src="../assets/avtgd2.jpg" alt="Logo" />
                                </div>
                                <div class="story-item">
                                    <img src="../assets/logo.png" alt="Logo" />
                                </div>
                                <div class="story-item">
                                    <img src="../assets/post1.jpg" alt="Logo" />
                                </div>
                                <div class="story-item">
                                    <img src="../assets/post1.jpg" alt="Logo" />
                                </div>
                            </div>

                            <!-- Post item -->
                            <div class="post mt-4" v-for="post in list_posts" :key="post.id">
                                <div class="post-header">
                                    <!-- <img :src="post.author_avatar || '../assets/logo.png'" alt="Avatar" /> -->
                                    <img src="../assets/avtgd2.jpg" alt="Avatar">
                                    <strong>{{ post.author_fullname }} -</strong>
                                    <span style="font-weight: lighter;">
                                        {{ formatTime(post.created_at) }}
                                    </span>
                                </div>

                                <!-- Ảnh bài viết -->
                                <!-- <img :src="post.thumbnail_url || '../assets/logo.png'" alt="Thumbnail"
                                    class="post-image" /> -->
                                <img src="../assets/svt5.jpg" alt="Thumbnail" class="post-image" />
                                <!-- Nút thích & bình luận -->
                                <div class="post-actions">
                                    <!-- LIKE -->
                                    <button class="action-btn">
                                        <i class="bi bi-heart"></i>
                                    </button>
                                    <!-- COMMENT -->
                                    <button class="action-btn" data-bs-toggle="offcanvas"
                                        data-bs-target="#commentPanel">
                                        <i class="bi bi-chat-left-text"></i> {{ post.total_comment }}
                                    </button>
                                    <!-- SAVE (đẩy sang phải) -->
                                    <button class="action-btn ms-auto">
                                        <i class="bi bi-bookmark"></i>
                                    </button>
                                </div>
                                <!-- Caption -->
                                <div class="box-detail" style="margin-left: 1rem; margin-bottom: 1rem;">
                                    <div class="post-caption" style="font-weight: bold;">
                                        {{ post.total_like }} lượt thích
                                    </div>
                                    <div class="post-caption mt-2">
                                        <label style="font-weight: bold;">{{ post.author_fullname }}📝</label>{{
                                            post.caption }}
                                    </div>
                                    <div class="post-caption mt-2" style="font-weight: lighter;">
                                        Xem tất cả {{ post.total_comment }} bình luận
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right-menu gợi ý -->
            <div class="col-md-4 right-menu">
                <div class="col-md-7">
                    <div class="user-info d-flex align-items-center gap-3 mb-4">
                        <img src="../assets/logo.png" class="rounded-circle" height="60" width="60" alt="Logo" />
                        <div>
                            <strong>apr.peidbh</strong><br />
                            <small class="text-muted">Diệp Bíchh</small>
                        </div>
                        <div class="ms-auto">
                            <a href="#" class="text-danger" style="font-weight: 600;">Đăng xuất</a>
                        </div>
                    </div>

                    <h6 class="text-muted mb-3">Gợi ý cho bạn</h6>

                    <div class="suggest-item">
                        <div class="d-flex align-items-center gap-2">
                            <img src="../assets/post1.jpg" alt="Logo" />
                            <div>
                                <strong>_user1</strong><br />
                                <small class="text-muted">Mới tham gia</small>
                            </div>
                        </div>
                        <button class="follow-btn">Theo dõi</button>
                    </div>

                    <div class="suggest-item">
                        <div class="d-flex align-items-center gap-2">
                            <img src="../assets/avtgd2.jpg" alt="Logo" />
                            <div>
                                <strong>_user2</strong><br />
                                <small class="text-muted">Gợi ý</small>
                            </div>
                        </div>
                        <button class="follow-btn">Theo dõi</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- PANEL COMMENT -->
        <div class="offcanvas offcanvas-bottom" tabindex="-1" id="commentPanel" style="height: 60vh;">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title">Bình luận</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
            </div>

            <div class="offcanvas-body">
                <div class="text-center mb-3">
                    <img src="../assets/logo.png" class="img-fluid rounded" alt="Logo" />
                </div>

                <div class="comment-list">
                    <div class="d-flex gap-2 mb-3">
                        <img src="../assets/logo.png" class="rounded-circle" width="40" alt="Logo" />
                        <div>
                            <strong>user123</strong>
                            <p class="m-0">Ảnh đẹp quáá 😍</p>
                        </div>
                    </div>

                    <div class="d-flex gap-2 mb-3">
                        <img src="../assets/logo.png" class="rounded-circle" width="40" alt="Logo" />
                        <div>
                            <strong>diệp_bích</strong>
                            <p class="m-0">Yêu cái style này 😭💗</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-3 border-top">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Thêm bình luận..." />
                    <button class="btn btn-pink">Gửi</button>
                </div>
            </div>
        </div>

        <!-- Modal Upload Story -->
        <div class="modal fade" id="storyModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Tạo Story</h5>
                        <button class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <label class="btn btn-outline-primary">
                        Chọn ảnh/video
                        <input type="file" hidden @change="handleStoryUpload" accept="image/*,video/*" />
                        </label>
                        <!-- Preview -->
                        <div v-if="storyPreview" class="mt-3">
                        <img v-if="isStoryImg" :src="storyPreview" class="img-fluid rounded"/>
                        <video v-if="isStoryVideo" :src="storyPreview" controls class="img-fluid rounded"></video>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button class="btn btn-primary">Đăng</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script setup>
import SidebarComponent from '@/components/SidebarComponent.vue';
import axios from "axios";

import {
    ref,
    reactive,
    watch,
    watchEffect,
    onMounted,
    onUnmounted,
    onUpdated
} from "vue";
import api from "../api/client";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
const storyPreview = ref(null);
const isStoryImg = ref(false);
const isStoryVideo = ref(false);

const handleStoryUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    storyPreview.value = URL.createObjectURL(file);

    if (file.type.startsWith("image/")) {
        isStoryImg.value = true;
        isStoryVideo.value = false;
    } else {
        isStoryImg.value = false;
        isStoryVideo.value = true;
    }
};
const openStoryModal = () => {
    const modal = new bootstrap.Modal(document.getElementById("storyModal"));
    modal.show();
};

</script>
    
<script>
export default {
    props: {

    },

    data() {
        return {
            list_posts: [],
        };
    },

    created() {
        console.log("Component created");
    },

    mounted() {
        this.listPost();
    },

    updated() {
        console.log("Component updated");
    },

    unmounted() {
        console.log("Component destroyed");
    },

    watch: {

    },

    methods: {
        /**
         * Lấy danh sách bài viết từ API
         * @return {Promise<void>}
         */
        listPost() {
            this.loading = true;
            this.error = null;

            try {
                /**
                 * Gọi API GET /api/list-post
                 * @return {Promise<AxiosResponse>}
                 */
                api.get('/api/post/list-post')
                    .then((res) => {
                        if (res.status === 200) {
                            /**
                             * Gán dữ liệu bài viết vào list_posts
                             * @param {Object[]} posts - danh sách bài đăng
                             */
                            this.list_posts = res.data.data;
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        this.error = "Lỗi khi tải danh sách bài viết";
                    })
                    .finally(() => {
                        this.loading = false;
                    });

            } catch (error) {
                console.error(error);
                this.error = "Lỗi không xác định";
                this.loading = false;
            }
        },
        formatTime(time) {
            const date = new Date(time);
            const now = new Date();
            const diff = (now - date) / 1000; // tính theo giây

            if (diff < 60) return "Vừa xong";

            const minute = diff / 60;
            if (minute < 60) return `${Math.floor(minute)} phút trước`;

            const hour = minute / 60;
            if (hour < 24) return `${Math.floor(hour)} giờ trước`;

            const day = hour / 24;
            if (day < 7) return `${Math.floor(day)} ngày trước`;

            const week = day / 7;
            if (week < 4) return `${Math.floor(week)} tuần trước`;

            const month = day / 30;
            if (month < 12) return `${Math.floor(month)} tháng trước`;

            const year = day / 365;
            return `${Math.floor(year)} năm trước`;
        },
    },
};
</script>


<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css');

body {
    background-color: #fafafa;
}

/* Layout chính */
/* SIDEBAR */

/* END SIDEBAR */

.story { 
    display: flex; 
    gap: 15px; 
    padding: 15px 0; 
    border-bottom: 1px solid #ddd; 
    background: #fff; 
    border-radius: 10px; 
} 
.story-item img { 
    width: 90px; 
    height: 90px; 
    border-radius: 50%; 
    border: 3px solid #f06292; 
}
/* Ô tạo story */
.add-story-box {
    display: flex;
    justify-content: center;
    align-items: center;
}

.add-story {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: white;
    border: 3px dashed #ccc;
    cursor: pointer;
    display: flex;
    justify-content: center; /* căn giữa ngang */
    align-items: center;     /* căn giữa dọc */
}

.add-story i {
    font-size: 32px;
    color: #ff90c2;
}


.add-story:hover {
    border-color: #ff90c2;
}
.add-story i {
    font-size: 32px;
    color: #ff90c2;
}

.post {
    background: #fff;
    margin-top: 20px;
    border-radius: 10px;
    border: 1px solid #ddd;
}

.post img {
    width: 100%;
}

.post-header {
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.post-header img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.post-actions {
    display: flex;
    gap: 15px;
    padding: 5px 5px;
    border-top: 1px solid #eee;
}

.action-btn {
    background: none !important;
    color: #333;
    border: none;
    padding: 6px 10px;
    font-size: 20px;
    cursor: pointer;
    transition: 0.2s;
}

.action-btn:hover {
    color: #ff4081;
}

.btn-pink {
    background-color: #ff7fc8;
    color: #fff;
    border-radius: 6px;
}

.btn-pink:hover {
    background-color: #ff5daf;
}

.offcanvas-bottom {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    height: 80vh !important;
}

/* RIGHT MENU */
.user-info {
    margin-top: 1rem;
}

.suggest-item img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
}

.suggest-item {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 10px;
}

.follow-btn {
    background-color: #ff7fc8;
    color: white;
    border: none;
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
    margin-left: auto;
}

.follow-btn:hover {
    background-color: #ff5daf;
}
</style>