"use client";

import { useEffect, useState } from "react";
import { User } from "@/types";
import { getUser } from "@/services/users/api";
import { Container, Title, Text, Loader, Group, Button } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { userId } = params;

    const fetchUser = async () => {
      const userData = await getUser(Number(userId));
      setUser(userData);
    };

    try {
      fetchUser();
    } catch (error) {
      console.log("Not user found", error);
    }
  }, [params]);

  const handleProfileRedirect = () => {
    router.push(`/${user?.id}/profile`);
  };

  const handleFeedRedirect = () => {
    router.push(`/${user?.id}/posts`);
  };

  if (!user) {
    return (
      <Container>
        <Loader />
        <Text>Loading user data...</Text>
      </Container>
    );
  }

  return (
    <Container>
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
