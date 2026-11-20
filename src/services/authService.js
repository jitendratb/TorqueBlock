import TorqueBlockApi from "@/lib/api";

class AuthService {
  async kwikpassLogin(kpToken) {
    try {
      const res = await TorqueBlockApi.post("/gokwik/kwikpass/login", { kpToken });
      return res;
    } catch (error) {
      console.error("Failed to login with KwikPass:", error);
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
