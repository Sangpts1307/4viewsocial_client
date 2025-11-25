<template>
    
</template>

<script setup>
import {
    ref,
    reactive,
    watch,
    watchEffect,
    onMounted,
    onUnmounted,
    onUpdated,
} from "vue";
import api from "../api/client";

// --- Nhận props ---
const props = defineProps({
    title: { type: String, default: "Demo component" }
});

// --- Emit ---
const emit = defineEmits([
    
]);

// --- State ---
const count = ref(0);
const loading = ref(false);
const error = ref(null);
const user = ref(null);

const state = reactive({
    message: "Hello",
    version: 1
});

// --- Hàm ---
async function fetchUser() {
    loading.value = true;
    error.value = null;

    try {
        const res = await api.get("/api/ten_service_goi_den/hehe");
        user.value = res.data;

        emit("loaded", user.value);  // Thông báo cho cha
    } catch (err) {
        error.value = "Lỗi khi tải dữ liệu";
    } finally {
        loading.value = false;
    }
}

// --- Watch ---
watch(count, (newVal, oldVal) => {
    console.log("count:", oldVal, "→", newVal);
});

watch(() => state.version, (v) => {
    console.log("Version changed:", v);
});

watchEffect(() => {
    console.log("watchEffect chạy:", count.value, state.version);
});

// --- Life cycle ---
onMounted(() => {
    console.log("Mounted");
    fetchUser();
});

onUpdated(() => console.log("Updated"));
onUnmounted(() => console.log("Unmounted"));
</script>

<style scoped>
</style>
