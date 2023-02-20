import { Button } from "@chakra-ui/react";
import { IoCaretBack } from "react-icons/io5";
export const BackButton = () => {
  return (
    <Button
      leftIcon={<IoCaretBack />}
      variant="link"
      sx={{ color: "white", fontWeight: "semiBold" }}
    >
      Main Menu
    </Button>
  );
};
