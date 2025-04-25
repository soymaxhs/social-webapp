"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Loader,
  Text,
  Title,
  Stack,
  Group,
  Button,
} from "@mantine/core";
import { User, Post } from "@/types";
import { getUser } from "@/services/users/api";
import PostCard from "@/components/molecules/PostCard";
import { getPosts } from "@/services/posts/api";

/**
 * TODO: Document properly, using JSDoc.
 *
 * @see {@link https://jsdoc.app/ } for more information on how to document your code.
 */
export default function PostPage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>();

  const { userId } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser(Number(userId));
        const friendsIds = [Number(user.id), ...user.friends];
        setUser(user);

        const posts = await getPosts(friendsIds);
        setPosts(posts);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchData();
  }, [userId]);

  if (!user || !posts) {
    // TODO: Create a common loading component.
    return (
      <Container py="xl">
        <Loader />
        <Text>Loading user data...</Text>
      </Container>
    );
  }

  return (
    <Container py="xl">
      <Group align="left" mb="md" justify="space-between">
        <Button variant="default" onClick={() => router.back()}>
          ← Go Back
        </Button>

        {/* TODO: Create a new post redirect button */}
        <Button bg="green" onClick={() => router.push(`/${user.id}/posts/new`)}>
          + New Post
        </Button>
      </Group>

      <Title mb="md">{`${user.name}'s Feed`}</Title>

      <Stack gap="xs" my="lg">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Stack>
    </Container>
  );
}
