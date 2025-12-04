<template>
    <div class="col-md-2 sidebar" style="padding: 50px;">
        <h3 class="mb-4">4ViewsSocial</h3>
        <div class="nav flex-column gap-3 sidebar-menu">
            <a href="#" class="text-dark"><i class="bi bi-house-door"></i> Trang chủ</a>
            <a href="#" class="text-dark"><i class="bi bi-search"></i> Tìm kiếm</a>
            <a href="#" class="text-dark"><i class="bi bi-compass"></i> Khám phá</a>
            <a href="#" class="text-dark"><i class="bi bi-chat-dots"></i> Tin nhắn</a>
            <a href="#" class="text-dark"><i class="bi bi-bell"></i> Thông báo</a>
            <a href="#" class="text-dark"><i class="bi bi-plus-circle"></i> Tạo</a>
            <a href="#" class="text-dark"><i class="bi bi-person-circle"></i> Trang cá nhân</a>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.sidebar {
    border-right: 1px solid #ddd;
    background: #fff;
}

/* Sidebar giống Instagram */
.sidebar-menu a {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 16px;
    padding: 10px 14px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 500;
    transition: 0.2s;
    color: #222 !important;
}

.sidebar-menu a i {
    font-size: 20px;
}

.sidebar-menu a:hover {
    background: #ffebf4;
    color: #e91e63 !important;
}
</style>
