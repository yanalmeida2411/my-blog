import { userLogin, userLogout } from "@/services/userServices";
import { useLoadingStore } from "@/store/loadingStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { isMobile } from "react-device-detect";

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await userLogout();
      router.push("/login");
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { handleLogout };
};

export const useLogin = () => {
  const { setLoading } = useLoadingStore();
  const router = useRouter();

  const handleLogin = async (
    data: { email: string; password: string },
    reset: () => void
  ) => {
    setLoading(true);
    try {
      const response = await userLogin(data, isMobile);
      const { userId, token } = response;

      if (isMobile && token) {
        localStorage.setItem("token", token);
        // set Authorization default
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      router.push(`blog/${userId}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      reset();
    }
  };
  return { handleLogin };
};
