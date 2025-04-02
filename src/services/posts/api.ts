import { Post } from "@/types";
import { BASE_URL } from "@/services/settings/constants";

/**
 * Fetches all posts from the mock API, filters them by allowed user IDs,
 * and returns them sorted by number of likes (descending).
 *
 * @param allowedUserIds - List of user IDs to include in the result.
 * @returns {Promise<Post[]>} Sorted and filtered posts
 */
export const getPosts = async (friendsIds: number[]): Promise<Post[]> => {
  const res = await fetch(`${BASE_URL}/posts`);
  const data: Post[] = await res.json();

  const sortedPosts = data
    // This filter is supposed to be done in the backend, but we are doing it here for simplicity.
    .filter((post) => friendsIds.includes(post.userId))
    .sort((a, b) => b.likes.length - a.likes.length);

  return sortedPosts;
};

// TODO: Document properly
export const postPost = async (payload: Post): Promise<Post> => {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res.json();
};

// TODO: Document properly
export const patchLikesPost = async (payload: Post): Promise<Post> => {
  const res = await fetch(`${BASE_URL}/posts/${payload.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: payload.likes }),
  });

  return res.json();
};

// TODO: Document properly
export const getPost = async (id: string): Promise<Post> => {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  return res.json();
};
