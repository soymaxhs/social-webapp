"use client";

import { getUsers } from "@/services/users/api";
import { Container, SimpleGrid, Title, Text, Code } from "@mantine/core";
import { useEffect, useState } from "react";
import { User } from "@/types";
import UserCard from "@/components/molecules/UserCard";

const COLORS = ["red", "green", "blue"];

export default function Dashboard() {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
    };

    try {
      fetchUsers();
    } catch (error) {
      console.log("Not users found", error);
    }
  }, []);

  return (
    <Container>
      <Title mb="xl" c="dark">
        Select Your User
      </Title>
      <SimpleGrid cols={3} spacing="lg">
        {users?.map((user, index) => (
          <UserCard key={user.id} user={user} bg={COLORS[index]} />
        ))}
      </SimpleGrid>
      {/* TODO: Remove this. Only for reviewers */}
      {!users && (
        <>
          <Text>
            Did you forget to run the API server? Please run the following
            command in a terminal:
          </Text>
          <Code>npm run api</Code>
        </>
      )}
    </Container>
  );
}
