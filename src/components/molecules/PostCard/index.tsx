import { PostCardProps } from "@/components/molecules/PostCard/type";
import { Card, Text } from "@mantine/core";

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card withBorder radius="md" padding="md" shadow="xs">
      <Text>{post.content}</Text>
    </Card>
  );
}
