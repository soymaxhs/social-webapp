import { UserCardProps } from "@/components/molecules/UserCard/types";
import { Card, Text } from "@mantine/core";

// TODO: Document properly.
export default function UserCard({ user, ...rest }: UserCardProps) {
  const { name } = user;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ cursor: "pointer" }}
      {...rest}
    >
      <Text mt="md" ta="center" style={{ fontWeight: "bold" }}>
        {name}
      </Text>
    </Card>
  );
}
