import { UserCardProps } from "@/components/molecules/UserCard/types";
import { Card, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

/**
 * TODO: Document properly, using JSDoc.
 *
 * @see {@link https://jsdoc.app/ } for more information on how to document your code.
 */
export default function UserCard({ user, ...rest }: UserCardProps) {
  const router = useRouter();

  const { name } = user;

  const handleClick = () => {
    router.push(`/${user.id}/welcome`);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ cursor: "pointer" }}
      {...rest}
      onClick={handleClick}
    >
      <Text ta="center" style={{ fontWeight: "bold" }}>
        {name}
      </Text>
    </Card>
  );
}
