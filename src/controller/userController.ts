import { userLogout } from "@/services/userServices";
import { usePathname, useRouter } from "next/navigation";

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
