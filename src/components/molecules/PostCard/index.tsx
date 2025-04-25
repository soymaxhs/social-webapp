import { PostCardProps } from "@/components/molecules/PostCard/type";
import { getUser } from "@/services/users/api";
import { User } from "@/types";
import { Button, Grid, Group, Stack, Text } from "@mantine/core";
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
    <Grid
      align="stretch"
      bd={"1px solid #ccc"}
      mb="md"
      style={{ borderRadius: "8px" }}
    >
      <Grid.Col span="auto">
        <Stack gap="xs" p="xs">
          <Group justify="space-between">
            <Text fw={600}>{post.title}</Text>
            <Text size="sm" c="grape">
              {String(user?.id) === String(userId)
                ? `${user?.name} (You ⭐)`
                : user?.name}
            </Text>
          </Group>
          <Button
            variant={hasLiked ? "filled" : "outline"}
            size="xs"
            color="gray"
            onClick={toggleLike}
          >
            👍 {likes.length} {likes.length === 1 ? "Like" : "Likes"}
          </Button>
        </Stack>
      </Grid.Col>
      <Grid.Col span="content">
        <Button
          color="cyan"
          onClick={handlePostDetailRedirect}
          style={{ height: "100%" }}
        >
          Details
        </Button>
      </Grid.Col>
    </Grid>
  );
}
