"use client";

import { getUsers } from "@/services/users/api";
import {
  Container,
  SimpleGrid,
  Title,
  Text,
  Code,
  Paper,
  Stack,
  Loader,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { User } from "@/types";
import UserCard from "@/components/molecules/UserCard";

// TODO: Document this component properly
export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container py="xl">
      <Stack gap="md">
        <Title ta="center" c="dark">
          Login to your account
        </Title>

        {users ? (
          <>
            <SimpleGrid cols={3}>
              {users.map((user) => (
                <UserCard key={user.id} user={user} bg={user.color} c="white" />
              ))}
            </SimpleGrid>

            <Text ta="center" c="dimmed">
              This is a fake login page for demonstration purposes only. No
              actual authentication is performed.
            </Text>
          </>
        ) : (
          <Paper withBorder shadow="sm" p="lg">
            <Stack align="center" gap="sm">
              <Loader color="red" />
              <Text c="red">
                Unable to load users. Did you forget to run the mock API server?
              </Text>
              <Code color="gray">npm run api</Code>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
