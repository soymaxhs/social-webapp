import { PostCardProps } from "@/components/molecules/PostCard/type";
import { getUser } from "@/services/users/api";
import { User } from "@/types";
import { Button, Card, Group, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/services/settings/constants";
import { useParams } from "next/navigation";

export default function PostCard({ post }: PostCardProps) {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [likes, setLikes] = useState(post.likes);

  const userId = Number(params.userId);

  const hasLiked = likes.some((like) => like.userId === userId);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(post.userId);
        setUser(userData);
      } catch (error) {
        console.log("User not found", error);
      }
    };

    fetchUser();
  }, [post.userId]);

  const toggleLike = async () => {
    const updatedLikes = hasLiked
      ? likes.filter((like) => like.userId !== userId)
      : [...likes, { userId }];

    setLikes(updatedLikes);

    await fetch(`${BASE_URL}/posts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: updatedLikes }),
    });
  };

  return (
    <Card withBorder radius="md" padding="md" shadow="xs">
      <Stack gap="xs">
        <Group justify="space-between">
          <Text fw={600}>{post.title}</Text>
          <Text size="sm" c="grape">
            {user?.name}
          </Text>
        </Group>

        <Group justify="space-between" grow>
          <Button color="cyan">Details</Button>
          <Button
            variant={hasLiked ? "light" : "outline"}
            size="xs"
            color="gray"
            onClick={toggleLike}
          >
            👍 {likes.length} {likes.length === 1 ? "Like" : "Likes"}
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
