"use client";

import { useEffect, useState } from "react";
import { User } from "@/types";
import { getUser } from "@/services/users/api";
import {
  Container,
  Title,
  Text,
  Loader,
  Group,
  Button,
  Stack,
} from "@mantine/core";
import { useParams, useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User>();

  const { userId } = params;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(Number(userId));
        setUser(user);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleProfileRedirect = () => {
    router.push(`/${user?.id}/profile`);
  };

  const handleFeedRedirect = () => {
    router.push(`/${user?.id}/posts`);
  };

  if (!user) {
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
      <Stack>
        <Group my="lg" justify="space-between" align="center">
          <Title>Welcome, {user.name}!</Title>
          <Button bg={"cyan"} onClick={handleProfileRedirect}>
            <Text>⚙️ Profile Settings</Text>
          </Button>
        </Group>
        <Button
          variant="default"
          onClick={handleFeedRedirect}
          style={{ width: "100%" }}
        >
          <Text>📜 Go to Feed</Text>
        </Button>

        <Text ta="center" c="dimmed">
          A mock social platform. The app simulates a user feed, profile view,
          and post interactions using mocked APIs and follows modern UI
          architecture and component design best practices.
        </Text>
      </Stack>
    </Container>
  );
}
