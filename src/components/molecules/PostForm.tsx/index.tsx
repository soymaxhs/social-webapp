"use client";

import { useForm } from "react-hook-form";
import { Textarea, Button, Stack } from "@mantine/core";
import { BASE_URL } from "@/services/settings/constants";

// TODO: Relocate this
type PostFormData = {
  content: string;
};

// TODO: Relocate this
type Props = {
  userId: number;
  onSuccess: (data: string) => void;
};

// TODO: Document properly
export default function PostForm({ userId, onSuccess }: Props) {
  const { register, handleSubmit, reset, formState } = useForm<PostFormData>();
  const { isSubmitting } = formState;

  const onSubmit = async (data: PostFormData) => {
    const payload = JSON.stringify({
      userId,
      content: data.content,
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
