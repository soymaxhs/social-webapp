"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container, Loader, Text, Button, Group } from "@mantine/core";
import { User } from "@/types";
import { getUser } from "@/services/users/api";
import UserProfile from "@/components/molecules/organisms/UserProfile";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
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
      <Group align="left" mb="md">
        <Button variant="default" onClick={() => router.back()}>
          ← Go Back
        </Button>
      </Group>

      <UserProfile user={user} />
    </Container>
  );
}
