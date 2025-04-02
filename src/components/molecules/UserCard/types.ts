import { User } from "@/types";
import { CardProps } from "@mantine/core";

// TODO: Document properly.
export type UserCardProps = CardProps & {
  user: User;
};
