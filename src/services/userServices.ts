import { TLoginSchema } from "@/types/auth";
import { LoginResponse } from "@/types/Tlogin";
import axios from "axios";

export const userLogout = async () => {
  await axios.post(
    "https://my-blog-back-dzcr.onrender.com/logout",
    {},
    { withCredentials: true }
  );
};

export const userLogin = async (data: TLoginSchema, isMobile: boolean):Promise<LoginResponse> => {
  const response = await axios.post(
    "https://my-blog-back-dzcr.onrender.com/login",
    {
      email: data.email,
      password: data.password,
    },
    { withCredentials: !isMobile }
  );

  return response.data;
};
