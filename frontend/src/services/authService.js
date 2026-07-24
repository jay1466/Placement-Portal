import api from "./api";

const authService = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },
  registerStudent: async (data) => {
    const response = await api.post("/auth/register/student", data);
    return response.data;
  },
  verifyOtp: async (data) => {
    const response = await api.post("/auth/verify-otp", data);
    return response.data;
  },
  forcePasswordReset: async (data) => {
    const response = await api.post("/auth/force-password-reset", data);
    return response.data;
  },
};

export default authService;
