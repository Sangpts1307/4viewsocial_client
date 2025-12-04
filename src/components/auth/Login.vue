<template>
  <div class="container d-flex justify-content-center align-items-center" style="min-height: 100vh;">
    <div class="row align-items-center">

      <!-- LEFT SIDE IMAGES (Chỉ hiển thị trên desktop) -->
      <div class="col-lg-6 d-none d-lg-flex justify-content-end">
        <div class="phone-mockup">
          <img src="/images/logo.png" alt="Logo">
        </div>
      </div>

      <!-- RIGHT SIDE LOGIN FORM -->
      <div class="col-lg-6 d-flex justify-content-center">
        <div>

          <!-- LOGIN BOX -->
          <div class="login-box text-center">
            <!-- LOGO -->
            <div class="instagram-logo mb-4">4ViewsSocial</div>

            <!-- FORM INPUTS -->
            <!-- Nhập username/email/phone và mật khẩu -->
            <input v-model="user.user_name" type="text" class="form-control input-instagram mb-2"
              placeholder="Số điện thoại, tên người dùng hoặc email">
            <input v-model="user.password" type="password" class="form-control input-instagram mb-3"
              placeholder="Mật khẩu">

            <!-- LOGIN BUTTON -->
            <button @click="login" class="btn btn-login w-100 py-1">Đăng nhập</button>

            <!-- DIVIDER -->
            <div class="divider">
              <span>HOẶC</span>
            </div>

            <!-- GOOGLE LOGIN BUTTON -->
            <button @click="loginWithGoogle" class="login-gg text-primary fw-bold d-block mb-3">
              <i class="bi bi-google"></i> Đăng nhập với Google
            </button>

            <!-- FORGOT PASSWORD LINK -->
            <a href="#" class="text-decoration-none" style="font-size: 12px;">Quên mật khẩu?</a>
          </div>

          <!-- SIGN UP BOX -->
          <div class="login-fb signup-box text-center">
            Bạn chưa có tài khoản?
            <a href="/signup" class="text-primary fw-bold">Đăng ký</a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import { googleTokenLogin } from 'vue3-google-login';
import api from "@/api/client";

/**
 * STATE
 */
const loading = ref(false); // trạng thái loading khi gọi API
const error = ref(null); // hiển thị lỗi
const user = reactive({
    user_name: '',
    password: ''
});

/**
 * FUNCTION: login
 * Gửi yêu cầu đăng nhập bằng username/email/phone + password
 */
async function login() {
    loading.value = true;
    error.value = null;

    try {
        const res = await api.post("/api/auth/login", {
            user_name: user.user_name,
            password: user.password
        });

        if (res.data.code === 200) {
            // Lưu thông tin user và token vào sessionStorage
            sessionStorage.setItem("access_token", res.data.data.accessToken);
            sessionStorage.setItem("user_info", JSON.stringify(res.data.data.user_info));
            alert("Đăng nhập thành công!");
            close(); // đóng popup nếu có

            const user_info = JSON.parse(sessionStorage.getItem('user_info'));
            if (user_info.role == 0) { // 0 = admin
                window.location.href = '/admin/index';
            } else {
                window.location.href = '/homepage';
            }

        } else {
            alert(res.data.message || "Đăng nhập thất bại");
        }

    } catch (err) {
        console.error(err);
        error.value = "Lỗi khi tải dữ liệu";
    } finally {
        loading.value = false;
    }
}

/**
 * FUNCTION: loginWithGoogle
 * Đăng nhập bằng Google
 */
async function loginWithGoogle() {
    try {
        const googleUser = await googleTokenLogin();
        const res = await api.post("/api/auth/loginwithgoogle", {
            access_token: googleUser.access_token,
        });

        if (res.data.code === 200) {
            // Lưu thông tin user và token
            sessionStorage.setItem("access_token", res.data.data.accessToken);
            sessionStorage.setItem("user_info", JSON.stringify(res.data.data.user_info));
            alert("Đăng nhập thành công!");
            close(); // đóng popup Google

            const user_info = JSON.parse(sessionStorage.getItem('user_info'));
            if (user_info.role == 0) { // admin
                window.location.href = '/admin/index';
            } else {
                window.location.href = '/homepage';
            }

        } else {
            alert(res.data.message || "Đăng nhập thất bại");
        }
    } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || err.message);
    }
}

/**
 * LIFECYCLE
 */
onMounted(() => {
    console.log("Login component mounted");
});
</script>

<style scoped>
body {
    background-color: #fafafa;
}

.phone-mockup img {
    width: 100%;
    max-width: 420px;
}

.login-box {
    border: 1px solid #ddd;
    padding: 40px;
    background: white;
    width: 100%;
    max-width: 360px;
}

.instagram-logo {
    font-family: 'Billabong', cursive;
    font-size: 48px;
}

.input-instagram {
    background: #fafafa;
    font-size: 14px;
    height: 36px;
}

.btn-login {
    background-color: #fb6f92;
    color: white;
    font-weight: 600;
    font-size: 13px;
}

.login-gg {
    font-size: 13px;
    font-weight: 500;
}

.divider {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 15px 0;
}

.divider::before,
.divider::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ccc;
}

.divider span {
    padding: 0 10px;
    font-size: 14px;
    color: #737373;
}

.signup-box {
    border: 1px solid #ddd;
    background: white;
    padding: 20px;
    margin-top: 10px;
    max-width: 360px;
}
</style>
