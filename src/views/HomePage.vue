<template>
    <div class="col-md-12">
        <div class="row">
            <!-- Sidebar trái -->
            <SidebarComponent />

            <!-- Feed chính -->
            <div class="col-md-6">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-2">
                        </div>
                        <div class="col-md-8">
                            <!-- Story -->
                            <div class="story-wrapper">
                                <div class="story">
                                    
                                    <!-- Story tạo mới -->
                                    <div class="story-item add-story" @click="openStoryModal">
                                        <i class="bi bi-plus-lg"></i>
                                    </div>

                                    <!-- List story ví dụ -->
                                    <div class="story-item">
                                        <img src="../assets/quang.png" alt="Story" />
                                    </div>

                                    <div class="story-item">
                                        <img src="../assets/avtgd2.jpg" alt="Story" />
                                    </div>

                                    <div class="story-item">
                                        <img src="../assets/sang.jpg" alt="Story" />
                                    </div>

                                    <div class="story-item">
                                        <img src="../assets/post1.jpg" alt="Story" />
                                    </div>

                                    <div class="story-item">
                                        <img src="../assets/post1.jpg" alt="Story" />
                                    </div>

                                </div>
                            </div>

                            <!-- Post item -->
                            <div class="post mt-2" v-for="post in list_posts" :key="post.id">
                                <div class="post-header">
                                    <div class="avatar-box">
                                        <img :src="post.author_avatar || '../assets/logo.png'" alt="Avatar" />
                                    </div>
                                    <strong>{{ post.author_fullname }} -</strong>
                                    <span style="font-weight: lighter;">
                                        {{ formatTime(post.created_at) }}
                                    </span>

                                </div>

                                <!-- Ảnh bài viết -->
                                <img 
                                    :src="post.thumbnail_url || '../assets/logo.png'" 
                                    alt="Thumbnail"
                                    class="post-image"
                                    style="cursor: pointer;"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#commentPanel"
                                    @click="openComment(post)"
                                />

                                <!-- Nút thích & bình luận -->
                                <div class="post-actions">
                                    <!-- LIKE -->
                                    <button class="action-btn" style="margin-left: 10px;" @click="likePost(post)">
                                        <i :class="post.isLiked ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"></i>
                                    </button>


                                    <!-- COMMENT -->
                                    <button class="action-btn"
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#commentPanel"
                                        @click="openComment(post)">
                                    <i class="bi bi-chat-left-text"></i> {{ post.total_comment }}
                                </button>

                                    <!-- SAVE -->
                                    <button class="action-btn ms-auto" style="margin-right: 8px;" @click="savePost(post)">
                                        <i :class="post.isSaved ? 'bi bi-bookmark-fill text-warning' : 'bi bi-bookmark'"></i>
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
                                    <div class="post-caption mt-2"
                                        style="font-weight: lighter; cursor: pointer;"
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#commentPanel"
                                        @click="openComment(post)">
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
                    <div class="user-info d-flex align-items-center gap-3 mb-4" v-if="currentUser">
                        
                        <div class="avatar-box">
                            <img :src="currentUser.avatar_url || '../assets/logo.png'" />
                        </div>

                        <div>
                            <strong>{{ currentUser.user_name }}</strong><br />
                            <small class="text-muted">{{ currentUser.full_name }}</small>
                        </div>

                        <div class="ms-auto">
                            <span 
                                @click="logout"
                                class="text-danger"
                                style="font-weight: 600; cursor: pointer;"
                            >
                                Đăng xuất
                            </span>
                        </div>
                    </div>
                    <h6 class="text-muted mb-3">Gợi ý cho bạn</h6>

                    <div v-if="loading">Đang tải...</div>
                    <div v-if="error" class="text-danger">{{ error }}</div>

                    <div 
                        v-for="user in suggest_friends" 
                        :key="user.id" 
                        class="suggest-item"
                    >
                        <div class="d-flex align-items-center gap-2">
                            <div class="avatar-box">
                                <img :src="user.avatar_url || '../assets/logo.png'" />
                            </div>
                            <div>
                                <strong>{{ user.full_name }}</strong><br />
                                <small class="text-muted">
                                    {{ user.user_name }}
                                </small>
                            </div>
                        </div>

                        <button class="follow-btn">Theo dõi</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- PANEL COMMENT -->
        <div class="offcanvas offcanvas-bottom offcanvas-comment"
            tabindex="-1"
            id="commentPanel">

            <!-- HEADER -->
            <div class="header-comment position-relative text-center py-2">
                <h6 class="m-0">Bình luận</h6>
                <button class="btn-close position-absolute top-50 end-0 translate-middle-y me-3"
                        data-bs-dismiss="offcanvas"></button>
            </div>

            <div class="comment-wrapper" v-if="currentPost">
                <!-- LEFT: IMAGE -->
                <div class="comment-left">
                    <img :src="currentPost.thumbnail_url || '../assets/logo.png'" alt="Ảnh bài viết" />
                </div>

                <!-- RIGHT -->
                <div class="comment-right">
                    <!-- LIST COMMENT -->
                    <div class="comment-list">
                        <div v-if="loadingComment" class="text-center p-3">
                            Đang tải bình luận...
                        </div>
                        <!-- COMMENT CHA -->
                        <div v-for="c in comments" :key="c.id" class="d-flex gap-2 mb-3">
                            <div class="avatar-box">
                                <img :src="c.user?.avatar_url" />
                            </div>
                            <div>
                                <p class="m-0">
                                    <strong>{{ c.user?.full_name }}</strong> {{ c.comment }}
                                </p>
                                <small class="text-muted">{{ formatTime(c.created_at) }}</small>

                                <!-- COMMENT CON -->
                                <div class="mt-2" v-for="r in c.children" :key="r.id">
                                    <div class="d-flex gap-2 mb-2">
                                        <img :src="r.user?.avatar_url" class="rounded-circle" width="35" height="35" />
                                        <div>
                                            <p class="m-0">
                                                <strong>{{ r.user.full_name }}</strong> {{ r.comment }}
                                            </p>
                                            <small class="text-muted">{{ formatTime(r.created_at) }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- INFO BÊN DƯỚI -->
                    <div class="comment-info mt-3">
                        <strong>{{ currentPost.total_like }} lượt thích</strong>
                        <p class="mt-2 mb-1">
                            <strong>{{ currentPost.author_fullname }}:</strong>
                            {{ currentPost.caption }}
                        </p>
                        <small class="text-muted">{{ formatTime(currentPost.created_at) }}</small>
                    </div>

                    <!-- INPUT COMMENT -->
                    <div class="comment-input mt-3">
                        <div class="input-group">
                            <input v-model="commentText" @keyup.enter="sendComment" type="text" class="form-control" placeholder="Thêm bình luận...">
                            <button class="btn btn-primary" @click="sendComment">Gửi</button>
                        </div>
                    </div>
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

        <!-- Modal Upload Bài viết -->
        <div class="modal fade" id="uploadModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Tạo bài viết mới</h5>
                    <button class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                <!-- Nút chọn file -->
                <label class="btn btn-outline-primary">
                    Chọn ảnh/video
                    <input type="file" hidden @change="handleFileUpload" accept="image/*,video/*" />
                </label>
                <!-- Preview -->
                <div v-if="previewUrl" class="mt-3">
                    <img
                    v-if="isImage"
                    :src="previewUrl"
                    class="img-fluid rounded"
                    />
                    <video
                    v-if="isVideo"
                    :src="previewUrl"
                    class="img-fluid rounded"
                    controls
                    ></video>
                </div>
                <!-- Caption -->
                <div v-if="previewUrl" class="mt-3">
                    <textarea
                    class="form-control"
                    rows="3"
                    placeholder="Viết chú thích..."
                    v-model="caption"
                    ></textarea>
                </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button class="btn btn-primary" @click="submitPost">Đăng</button>
                </div>
            </div>
            </div>
        </div>
        <!-- Chat Widget -->
         <ChatWidget />
    </div>
</template>

<script>
import SidebarComponent from '@/components/SidebarComponent.vue';
import axios from "axios";
import api from "../api/client";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as bootstrap from "bootstrap";
import ChatWidget from '@/components/ChatWidget.vue';
import "bootstrap-icons/font/bootstrap-icons.css";

export default {
    components: { 
        SidebarComponent,
        ChatWidget 
    },

    data() {
        return {
            // thông tin user
            currentUser: null,
            
            list_posts: [],
            suggest_friends: [],
            loading: false,
            error: null,

            storyPreview: null,
            isStoryImg: false,
            isStoryVideo: false,

            previewUrl: null,
            caption: "",
            isImage: false,
            isVideo: false,
            uploadFile: null,

            // list comment
            currentPost: null,
            comments: [],
            loadingComment: false,

            // nội dung comment mới
            commentText: "",
        };
    },

    mounted() {
        const user = JSON.parse(sessionStorage.getItem('user_info'));
        
        if (!user) {
            this.$router.push('/login');
            return;
        }

        this.currentUser = user;

        this.listPost();
        this.suggestFriend();
    },

    methods: {
        async likePost(post) {
            const user = JSON.parse(sessionStorage.getItem('user_info'));

            const res = await api.post('/api/post/like-post', {
                post_id: post.id,
                user_id: user.id
            });

            if (res.status === 200) {
                post.total_like = res.data.data.total_like;
                post.isLiked = !post.isLiked;
            }
        },
        async savePost(post) {
            const user = JSON.parse(sessionStorage.getItem('user_info'));

            try {
                const res = await api.post('/api/post/save-post', {
                    post_id: post.id,
                    user_id: user.id
                });

                if (res.status === 200) {
                    post.isSaved = res.data.data.saved;
                }
            } catch (err) {
                console.error("Lỗi save bài viết:", err);
            }
        },
        listPost() {
            const user_info = JSON.parse(sessionStorage.getItem("user_info"));
            const userId = user_info?.id;

            api.get('/api/post/list-post', {
                params: {
                    user_id: userId
                }
            })
            .then(res => {
                console.log("API trả về:", res.data);
                this.list_posts = res.data.data.map(post => ({
                    ...post,
                    isLiked: !!post.isLiked
                }));
            })
            .catch(err => console.error(err));
        },
        async openComment(post) {
            this.currentPost = post;
            this.comments = [];
            this.loadingComment = true;

            try {
                const res = await api.get("/api/post/list-comment", {
                    params: { post_id: post.id }
                });

                if (res.status === 200) {
                    // console.log('aaaa', res.data.data.comments);
                    
                    this.comments = res.data.data.comments;
                    console.log('aaa',this.comments);
                    console.log("heheh", this.comments[0].user.full_name);
                }
            } catch (err) {
                console.error("Lỗi tải comment:", err);
            } finally {
                this.loadingComment = false;
            }
        },
        async sendComment() {
            if (!this.commentText.trim()) return;

            const user = JSON.parse(sessionStorage.getItem("user_info"));

            try {
                const res = await api.post("/api/post/comment", {
                    post_id: this.currentPost.id,
                    user_id: user.id,
                    comment: this.commentText
                });

                if (res.status === 200) {
                    const newComment = res.data.data.comment;

                    // append vào danh sách comment cha
                    this.comments.unshift(newComment);

                    // tăng số bình luận
                    this.currentPost.total_comment++;

                    // clear input
                    this.commentText = "";
                }
            } catch (error) {
                console.error("Lỗi gửi comment:", error);
            }
        },
        async suggestFriend() {
            this.loading = true;
            this.error = null;

            try {
                const res = await api.get('/api/post/suggest-friend');
                if (res.status === 200) {
                    this.suggest_friends = res.data.data.users;
                }
            } catch (err) {
                console.error(err);
                this.error = "Lỗi khi tải danh sách gợi ý";
            } finally {
                this.loading = false;
            }
        },
        logout() {
            sessionStorage.removeItem("user_info");
            this.$router.push("/login");
        },
        formatTime(time) {
            const date = new Date(time);
            const now = new Date();
            const diff = (now - date) / 1000;

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
    width: 40px; 
    height: 40px; 
    border-radius: 50%; 
    border: 3px solid #f06292; 
}
/* Ô tạo story */
.add-story-box {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Ô tạo Story */
.add-story {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 3px dashed #ccc;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: 0.25s ease;
    cursor: pointer;
}

/* Hover để có hiệu ứng */
.add-story:hover {
    /* transform: scale(1.12); */
    border-color: #f06292 !important;
    box-shadow: 0 0 10px rgba(255, 127, 200, 0.5);
}

.add-story i {
    font-size: 32px;
    color: #f06292;
}

/* Wrapper để không bị tràn */
.story-wrapper {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 10px;
}

/* Thanh scroll ngang ẩn đi cho đẹp */
.story-wrapper::-webkit-scrollbar {
    height: 0px;
}
.story-wrapper::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
}

.story {
    display: flex;
    gap: 15px;
    padding: 15px 0;
    background: #fff;
    border-bottom: 1px solid #ddd;
    border-radius: 10px;
}

.story-item {
    width: 90px;
    height: 90px;
    flex: 0 0 auto;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.story-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Style story tạo mới */
.add-story {
    border: 3px dashed #ccc !important;
    flex-direction: column;
}

.add-story i {
    font-size: 32px;
    color: #ff7fc8;
}

.add-story small {
    font-size: 12px;
    margin-top: 4px;
    color: #555;
}

.add-story:hover {
    border-color: #ff90c2;
}

.avatar-box {
    width: 45px;
    height: 45px;
    flex: 0 0 auto;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Avatar trong comment (nhỏ hơn) */
.avatar-box.small {
    width: 35px;
    height: 35px;
    border-width: 2px;
}

/* Avatar image */
.avatar-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    padding: 6px 0;
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

/* Offcanvas */
.offcanvas-comment {
    max-width: calc(100% - 20rem); 
    width: 100%; 
    margin-left: auto;
    margin-right: auto;
    left: 15rem !important;
    right: 15rem !important; 
    bottom: 2rem !important;
    width: auto !important;
    height: 90vh !important;
}

/* Layout chia đôi */
.comment-wrapper {
    display: flex;
    height: 100%;
}

/* BÊN TRÁI – ẢNH */
.comment-left {
    width: 55%;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.comment-left img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

/* BÊN PHẢI – COMMENT */
.comment-right {
    width: 45%;
    display: flex;
    flex-direction: column;
    background: #fff;
}

/* List comment cuộn */
.comment-list {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
}

/* Box thông tin cuối cùng */
.comment-info {
    border-top: 1px solid #ddd;
    padding: 1rem;
}

.comment-input {
    border-top: 1px solid #ddd;
    padding: .7rem;
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