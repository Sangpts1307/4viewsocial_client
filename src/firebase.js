import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD2gbc_1Mpvyx18gjWB3USpn_37ZIENGsQ",
  authDomain: "viewsocial-f038a.firebaseapp.com",
  projectId: "viewsocial-f038a",
  storageBucket: "viewsocial-f038a.firebasestorage.app",
  messagingSenderId: "764424668528",
  appId: "1:764424668528:web:fa3fa2ad858d190fba3bb5",
  databaseURL: "https://viewsocial-f038a-default-rtdb.firebaseio.com",
  measurementId: "G-XDBL137ZSY"
};
// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

let messaging; // LƯU ý: chưa init ngay

export const initFirebaseMessaging = async () => {
  // Chỉ chạy trên browser
  if (typeof window === "undefined") return;

  // Check browser có hỗ trợ messaging không
  const supported = await isSupported();
  if (!supported) {
    console.warn("FCM không hỗ trợ trên trình duyệt này");
    return;
  }

  // Ok → init messaging
  messaging = getMessaging(app);
  return messaging;
};

// Request notification permission from user.
export const requestPermission = async () => {
    if (!messaging) return;
    try {
        const currentToken = await getToken(messaging, {
            vapidKey: "BOopdS8jwLe3ZSaDR3hiBvvzR3GXEfCxbIrfMqFKvLAAzu7ehxSrSdoY8p2I04brGLnhwKzRgllQJKX5VUdjB1A",
        });
        return currentToken;
    } catch (error) {
        console.error("Cannot get token: ", error);
    }
};

// Listen for messages from FCM while the page is open
export const onMessageListener = () =>
  new Promise((resolve) => {
    if (!messaging) return;
    onMessage(messaging, (payload) => {
      console.log("Message received:", payload);
      resolve(payload);
    });
  });

// Export auth & db
export const auth = getAuth(app);
export const db = getDatabase(app);
export { app, messaging };
