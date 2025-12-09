<template>
    <div class="col-md-12">
        <div class="row">

            <!-- Sidebar trái  -->
            <SidebarComponent />

            <!-- EXPLORE CONTENT -->
            <div class="col-md-10 pt-4 explore-container">

                <div class="container">
                    <div class="row g-3">

                        <!-- 1 ảnh = 1 ô -->
                        <div class="col-md-3 col-sm-4 col-6" v-for="item in exploreList" :key="item.id">
                            <div class="explore-item">
                                <img :src="item.thumbnail" class="explore-img" alt="explore">
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    </div>
</template>
<script setup>
import SidebarComponent from "@/components/SidebarComponent.vue";
</script>

<script>
export default {
    data() {
        return {
            exploreList: [
                { id: 1, thumbnail: "../assets/post1.jpg" },
                { id: 2, thumbnail: "../assets/svt5.jpg" },
                { id: 3, thumbnail: "../assets/avtgd2.jpg" },
                { id: 4, thumbnail: "../assets/logo.png" },
                { id: 5, thumbnail: "../assets/post1.jpg" },
                { id: 6, thumbnail: "../assets/avtgd2.jpg" },
                { id: 7, thumbnail: "../assets/svt5.jpg" },
                { id: 8, thumbnail: "../assets/logo.png" },
                // lấy từ API sau
            ]
        };
    }
};
</script>
<style scoped>
.explore-container {
    background: #fafafa;
}

.explore-item {
    width: 100%;
    height: 250px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
}

.explore-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.3s;
}

.explore-img:hover {
    filter: brightness(0.8);
    transform: scale(1.03);
}
</style>
