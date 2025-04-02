"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container, Loader, Text, Button, Group } from "@mantine/core";
import { User } from "@/types";
import { getUser } from "@/services/users/api";
import UserProfile from "@/components/organisms/UserProfile";

// TODO: Document properly.
export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
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
      <Group align="left" mb="md">
        <Button variant="default" onClick={() => router.back()}>
          ← Go Back
        </Button>
      </Group>

      <UserProfile user={user} />
    </Container>
  );
}
