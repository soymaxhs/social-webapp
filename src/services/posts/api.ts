import { Post } from "@/types";
import { BASE_URL } from "@/services/settings/constants";

/**
 * Fetches all posts from the mock API.
 * @returns {Promise<Post[]>} All posts
 */
export const getAllPosts = async (
  allowedUserIds: number[]
): Promise<Post[]> => {
  const res = await fetch(`${BASE_URL}/posts`);
  const data: Post[] = await res.json();

  const availablePosts = data.filter((post) =>
    allowedUserIds.includes(Number(post.userId))
  );

  return availablePosts;
};
