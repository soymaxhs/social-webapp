import { Post } from "@/types";
import { BASE_URL } from "@/services/settings/constants";

/**
 * Fetches all posts from the mock API, filters them by allowed user IDs,
 * and returns them sorted by number of likes (descending).
 *
 * @param allowedUserIds - List of user IDs to include in the result.
 * @returns {Promise<Post[]>} Sorted and filtered posts
 */
export const getAllPosts = async (
  allowedUserIds: number[]
): Promise<Post[]> => {
  const res = await fetch(`${BASE_URL}/posts`);
  const data: Post[] = await res.json();

  const availablePosts = data
    .filter((post) => allowedUserIds.includes(post.userId))
    .sort((a, b) => b.likes.length - a.likes.length);

  return availablePosts;
};
