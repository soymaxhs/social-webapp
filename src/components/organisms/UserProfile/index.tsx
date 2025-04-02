"use client";

import { UserProfileProps } from "@/components/organisms/UserProfile/types";
import { Card, Text, Group, Title, Badge, Stack, Divider } from "@mantine/core";

export default function UserProfile({ user }: UserProfileProps) {
  const { name, username, bio, location, emoji, interests } = user;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack align="center" gap="xs">
        <Text style={{ fontSize: 48 }}>{emoji}</Text>

        <Title order={2} ta="center">
          {name}
        </Title>

        <Text c="dimmed" size="sm">
          @{username}
        </Text>

        <Text mt="sm" ta="center">
          {bio}
        </Text>

        <Text size="sm" c="gray">
          📍 {location}
        </Text>

        <Divider my="sm" />

        <Group align="center" gap="xs">
          {interests?.map((interest: string, index) => (
            <Badge key={index} variant="light" size="sm">
              {interest}
            </Badge>
          ))}
        </Group>
      </Stack>
    </Card>
  );
}
