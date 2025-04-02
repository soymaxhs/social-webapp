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
import { getAllPosts } from "@/services/posts/api";

export default function PostPage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const { userId } = params;

    const loadData = async () => {
      const userData = await getUser(Number(userId));

      const allowedUserIds = [Number(userData.id), ...(userData.friends || [])];

      const allPosts = await getAllPosts(allowedUserIds);

      setUser(userData);
      setPosts(allPosts);
    };

    try {
      loadData();
    } catch (error) {
      console.log("Error", error);
    }
  }, [params]);

  if (!user || !posts) {
    return (
      <Container>
        <Loader />
        <Text>Loading posts...</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Group align="left" mb="md">
        <Button variant="default" onClick={() => router.back()}>
          ← Go Back
        </Button>
      </Group>

      <Title mb="md">{`${user.name}'s Feed`}</Title>
      <Stack gap="xs">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Stack>
    </Container>
  );
}
