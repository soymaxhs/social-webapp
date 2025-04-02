"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, Stack, Text, Button, Group, Container } from "@mantine/core";
import { getPost, patchLikesPost } from "@/services/posts/api";
import { getUser } from "@/services/users/api";
import { Post, User } from "@/types";

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState<Post>();
  const [user, setUser] = useState<User>();
  const [likes, setLikes] = useState<{ userId: number }[]>([]);

  const userId = Number(params.userId);
  const postId = String(params.postId);

  const hasLiked = likes.some((like) => like.userId === userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPost = await getPost(postId);
        setPost(fetchedPost);
        setLikes(fetchedPost.likes);

        const postAuthor = await getUser(fetchedPost.userId);
        setUser(postAuthor);
      } catch (error) {
        console.error("Error loading post details", error);
      }
    };

    fetchData();
  }, [postId]);

  /**
   * TODO:
   * This function could be extracted as common functionality
   * because it is used in the PostCard component as well.
   */
  const toggleLike = async () => {
    if (!post) return;

    const updatedLikes = hasLiked
      ? likes.filter((like) => like.userId !== userId)
      : [...likes, { userId }];

    const updatedPost = {
      ...post,
      likes: updatedLikes,
    };

    try {
      await patchLikesPost(updatedPost);
      setLikes(updatedLikes);
    } catch (error) {
      console.error("Error updating likes", error);
    }
  };

  if (!post || !user) return <Text>Loading...</Text>;

  return (
    <Container py="xl">
      <Group align="left" mb="md">
        <Button variant="default" onClick={() => router.back()}>
          ← Go Back
        </Button>
      </Group>
      <Card withBorder shadow="sm" padding="lg" radius="md">
        <Stack gap="md">
          <Text fw={700} size="xl">
            {post.title}
          </Text>
          <Text size="sm" c="gray">
            Posted by {user.name}
          </Text>
          <Text>{post.content}</Text>

          <Group justify="flex-start">
            <Button
              variant={hasLiked ? "light" : "outline"}
              size="sm"
              color="gray"
              onClick={toggleLike}
            >
              👍 {likes.length} {likes.length === 1 ? "Like" : "Likes"}
            </Button>
          </Group>
        </Stack>
      </Card>
    </Container>
  );
}
