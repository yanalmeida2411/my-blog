import { TPost } from "@/types/Tpost";
import { create } from "zustand";

interface PostStore {
  posts: TPost[];
  setPosts: (value: TPost[]) => void;
  removePost: (id: number) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: (value) => set({ posts: value }),
  removePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.post_id !== id),
    })),
}));
