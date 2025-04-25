import { User } from "@/types";
import { CardProps } from "@mantine/core";

/**
 * TODO: Document properly, using JSDoc.
 *
 * @see {@link https://jsdoc.app/ } for more information on how to document your code.
 */
export type UserCardProps = CardProps & {
  user: User;
};
