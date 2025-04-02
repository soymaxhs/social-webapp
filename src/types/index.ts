/**
 * Represents a user profile in the system.
 */
export interface User {
  /** Unique identifier for the user */
  id: number;
  /** Full name of the user */
  name: string;
  /** Unique username/handle (e.g. johndoe) */
  username: string;
  /** Short bio or description of the user */
  bio: string;
  /** Geographical location of the user */
  location: string;
  /** Emoji icon representing the user (used as avatar) */
  emoji: string;
  /** List of user interests or hobbies */
  interests: string[];
  // TODO: Document properly.
  friends: number[];
}

// TODO: Document properly.
export interface Post {
  id: string;
  userId: number;
  title: string;
  content: string;
  likes: {
    userId: number;
  }[];
}
