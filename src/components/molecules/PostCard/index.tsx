import { PostCardProps } from "@/components/molecules/PostCard/type";
import { getUser } from "@/services/users/api";
import { User } from "@/types";
import { Button, Card, Group, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { patchLikesPost } from "@/services/posts/api";

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User>();
  const [likes, setLikes] = useState(post.likes);

  const userId = Number(params.userId);
  const hasLiked = likes.some((like) => like.userId === userId);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(post.userId);
        setUser(user);
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

    const payload = {
      ...post,
      likes: updatedLikes,
    };

    try {
      await patchLikesPost(payload);
      setLikes(updatedLikes);
    } catch (error) {
      console.log("Error updating likes", error);
    }
  };

  const handlePostDetailRedirect = () => {
    router.push(`/${userId}/posts/${post.id}`);
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
          <Button color="cyan" onClick={handlePostDetailRedirect}>
            Details
          </Button>
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
