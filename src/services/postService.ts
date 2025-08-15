import { TPost } from "@/types/Tpost";
import axios from "axios";

export const useGetPost = async () => {
  const response = await axios.get<TPost[]>(
    `https://my-blog-back-dzcr.onrender.com/posts/`,
    { withCredentials: true }
  );

  return response.data;
};
