import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(4),
  resume: z.string().min(4),
  content: z.string().min(4),
});

export type TPostSchema = z.infer<typeof postSchema>;

export type TPosts = {
  post_id?: number;
  post_title: string;
  post_resume: string;
  post_date: Date;
  post_content: string;
  post_authorId: number;
  post_authorName?: string | null;
};