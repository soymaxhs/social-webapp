"use client";

import { useForm } from "react-hook-form";
import { Textarea, Button, Stack, TextInput } from "@mantine/core";
import { Post } from "@/types";
import { useParams } from "next/navigation";
import { postPost } from "@/services/posts/api";

// TODO: Relocate this
type Props = {
  onSuccess: () => void;
};

/**
 * TODO: Document properly, using JSDoc.
 *
 * @see {@link https://jsdoc.app/ } for more information on how to document your code.
 */
export default function PostForm({ onSuccess }: Props) {
  const params = useParams();
  const { register, handleSubmit, reset, formState } = useForm<Post>();

  const { userId } = params;
  const { isSubmitting } = formState;

  const onSubmit = async (data: Post) => {
    const payload: Post = {
      ...data,
      userId: Number(userId),
      likes: [],
    };

    try {
      await postPost(payload);
      reset();
      onSuccess();
    } catch (error) {
      // TODO: Notify the user about the error.
      console.log("Error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isSubmitting}>
        <Stack>
          <TextInput {...register("title")} placeholder="Title" />
          <Textarea
            {...register("content")}
            placeholder="What's on your mind?"
            minRows={2}
            autosize
          />
          <Button type="submit" loading={isSubmitting}>
            Post
          </Button>
        </Stack>
      </fieldset>
    </form>
  );
}
