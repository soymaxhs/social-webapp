"use client";

import { useParams, useRouter } from "next/navigation";
import { Container, Title, Group, Button } from "@mantine/core";
import PostForm from "@/components/organisms/PostForm.tsx";

/**
 * TODO: Document properly, using JSDoc.
 *
 * @see {@link https://jsdoc.app/ } for more information on how to document your code.
 */
export default function NewPostPage() {
  const router = useRouter();
  const params = useParams();

  const { userId } = params;

  return (
    <Container py="xl">
      <Group align="left" mb="md">
        <Button variant="default" onClick={() => router.back()}>
          ← Go Back
        </Button>
      </Group>

      <Title mb="md">Create a new post</Title>
      <PostForm
        onSuccess={async () => {
          router.push(`/${userId}/posts`);
        }}
      />
    </Container>
  );
}
