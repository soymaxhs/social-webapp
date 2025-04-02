"use client";

import { useForm } from "react-hook-form";
import { Textarea, Button, Stack, TextInput } from "@mantine/core";
import { BASE_URL } from "@/services/settings/constants";
import { Post } from "@/types";

// TODO: Relocate this
type Props = {
  userId: number;
  onSuccess: (data: string) => void;
};

// TODO: Document properly
export default function PostForm({ userId, onSuccess }: Props) {
  const { register, handleSubmit, reset, formState } = useForm<Post>();
  const { isSubmitting } = formState;

  const onSubmit = async (data: Post) => {
    const payload = JSON.stringify({
      ...data,
      userId: userId,
    });

    const res = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });

    if (res.ok) {
      reset();
      onSuccess(payload);
    } else {
      console.error("Failed to create post");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextInput placeholder="Title" {...register("title")} />
        <Textarea
          placeholder="What's on your mind?"
          autosize
          minRows={2}
          {...register("content", { required: true })}
        />
        <Button type="submit" loading={isSubmitting}>
          Post
        </Button>
      </Stack>
    </form>
  );
}
