"use client";

import { useEffect, useState } from "react";
import { User } from "@/types";
import { getUser } from "@/services/users/api";
import { Container, Title, Text, Loader, Group, Button } from "@mantine/core";
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
      <Title>Welcome, {user.name}!</Title>
      <Group grow my="lg">
        <Button onClick={handleProfileRedirect}>Go to profile</Button>
        <Button onClick={handleFeedRedirect} color="orange">
          Go to feed
        </Button>
      </Group>
    </Container>
  );
}
