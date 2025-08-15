import { TPost } from "@/types/Tpost";
import { create } from "zustand";

interface PostStore {
  posts: TPost[];
  setPosts: (value: TPost[]) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: (value) => set({ posts: value }),
}));
