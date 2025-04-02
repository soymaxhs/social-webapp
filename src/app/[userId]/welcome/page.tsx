"use client";

import { useEffect, useState } from "react";
import { User } from "@/types";
import { getUser } from "@/services/users/api";
import { Container, Title, Text, Loader } from "@mantine/core";
import { useParams } from "next/navigation";

export default function WelcomePage() {
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
      console.log("Not users found", error);
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
      <Title>Welcome, {user.name}!</Title>
    </Container>
  );
}
