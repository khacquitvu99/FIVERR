import axios from "axios";

const api = axios.create({
  baseURL: "https://fiverrnew.cybersoft.edu.vn/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho Request: Tự động gắn TokenCybersoft và AccessToken (nếu người dùng đã đăng nhập)
api.interceptors.request.use(
  (config) => {
    // 1. Token Cybersoft
    config.headers["TokenCybersoft"] =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5NCIsIkhldEhhblN0cmluZyI6IjEzLzAxLzIwMjciLCJIZXRIYW5UaW1lIjoiMTc5OTc5ODQwMDAwMCIsIm5iZiI6MTc3MjY0MzYwMCwiZXhwIjoxNzk5OTQ2MDAwfQ.fXnFWdTzELVYga9S7pakEljJsvLiA3qz1XvvVCzlxkI";

    // 2. Token người dùng đăng nhập (lấy từ localStorage nếu có)
    if (typeof window !== "undefined") {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        config.headers["token"] = userToken;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho Response: Xử lý tập trung các lỗi từ API (401, 403, 500)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Chưa xác thực hoặc Token hết hạn.");
          break;
        case 403:
          console.error("Bạn không có quyền truy cập tài nguyên này.");
          break;
        case 500:
          console.error("Lỗi hệ thống máy chủ Server.");
          break;
        default:
          console.error("Lỗi API:", error.response.data?.message || error.message);
      }
    }
    return Promise.reject(error);
  }
);

export default api;