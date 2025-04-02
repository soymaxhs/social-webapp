"use client";

import { useEffect, useMemo, useState } from "react";
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
import PostForm from "@/components/organisms/PostForm.tsx";

// TODO: Document properly.
export default function PostPage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>();

  const { userId } = params;

  const friendsIds = useMemo(
    () => (user ? [Number(user.id), ...user.friends] : []),
    [user]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser(Number(userId));
        setUser(user);

        const posts = await getPosts(friendsIds);
        setPosts(posts);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchData();
  }, [friendsIds, userId]);

  if (!user || !posts) {
    // TODO: Create a common component.
    return (
      <Container py="xl">
        <Loader />
        <Text>Loading user data...</Text>
      </Container>
    );
  }

  return (
    <Container py="xl">
      <Group align="left" mb="md">
        <Button variant="default" onClick={() => router.back()}>
          ← Go Back
        </Button>
      </Group>

      <Title mb="md">{`${user.name}'s Feed`}</Title>
      <PostForm
        onSuccess={async () => {
          try {
            const posts = await getPosts(friendsIds);

            setPosts(posts);
          } catch (error) {
            console.log("Error", error);
          }
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
