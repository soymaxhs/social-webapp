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
import PostForm from "@/components/molecules/PostForm.tsx";

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
      <PostForm
        userId={user.id}
        onSuccess={(payload) => {
          const data = JSON.parse(payload);
          setPosts([...posts, { ...data, id: new Date().getTime() }]);
        }}
      />

      <Stack gap="xs" my="lg">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Stack>
    </Container>
  );
}
