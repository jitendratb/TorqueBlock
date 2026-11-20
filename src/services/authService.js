import TorqueBlockApi from "@/lib/api";

class AuthService {
  async login(phone) {
    try {
      const res = await TorqueBlockApi.post("/auth/login", { phone });
      return res; 
    } catch (error) {
      console.error("Failed to login (send OTP):", error);
      throw error;
    }
  }

  async verifyOtp(otp, otpVerifyToken) {
    try {
      const res = await TorqueBlockApi.post("/auth/verify-otp", { otp, otpVerifyToken });
      return res; // contains success, message, token, user
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      throw error;
    }
  }

  async resendOtp(phone) {
    try {
      const res = await TorqueBlockApi.post("/auth/resend-otp", { phone });
      return res; // contains success, message, otpVerifyToken
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      throw error;
    }
  }

  async refreshToken() {
    try {
      const res = await TorqueBlockApi.post("/auth/refresh-token");
      return res; // contains success, message, token
    } catch (error) {
      console.error("Failed to refresh token:", error);
      throw error;
    }
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
