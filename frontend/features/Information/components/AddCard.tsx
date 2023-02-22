import colors from "@/lib/theme/color";
import { Box, IconButton, Link } from "@chakra-ui/react";
import { RiAddCircleFill } from "react-icons/ri";

type Props = {
  path: string;
};
export const AddCard = ({ path }: Props) => {
  return (
    <Link
      href={`/registration/${path}`}
      sx={{ w: { base: "full", sm: "250px", md: "220px" } }}
    >
      <IconButton
        aria-label={"add card"}
        icon={<RiAddCircleFill size="80" color={colors.primary[800]} />}
        sx={{
          w: { base: "full", sm: "250px", md: "220px" },
          h: "250px",
          bg: "primary.100",
          boxShadow:
            "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
          _hover: {
            bg: "rgba(255, 152, 1, 0.4)",
          },
        }}
      />
    </Link>
  );
};
