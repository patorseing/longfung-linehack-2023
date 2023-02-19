import {
  Flex,
  Grid,
  IconButton,
  Stack,
  HStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { UseFormRegisterReturn } from "react-hook-form";

import { FormInput } from "./FormInput";

type BeaconCardProps = {
  name?: string;
  onAdd: () => void;
  onDelete: () => void;
  hardwareRegister?: UseFormRegisterReturn;
  passcodeRegister?: UseFormRegisterReturn;
  hardwareError?: string;
  passcodeError?: string;
};

export const BeaconCard = (props: BeaconCardProps) => {
  const {
    name,
    onAdd,
    onDelete,
    hardwareRegister,
    passcodeRegister,
    hardwareError,
    passcodeError,
  } = props;
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  if (isMobile) {
    return (
      <Stack
        spacing={2}
        sx={{
          p: 2,
          boxShadow:
            "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
          borderRadius: "8px",
        }}
      >
        <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Text sx={{ fontSize: "14px", py: "2" }}>{name}</Text>
          <HStack spacing={3}>
            <IconButton
              size="sm"
              aria-label="add-beacon"
              icon={<MdAdd />}
              sx={{
                borderRadius: "full",
                fontSize: "20px",
                bg: "primary.800",
                color: "white",
                cursor: "pointer",
                _hover: { bg: "primary.500" },
              }}
              onClick={onAdd}
            />
            <IconButton
              size="sm"
              aria-label="delete-beacon"
              icon={<IoTrashOutline />}
              sx={{
                borderRadius: "full",
                fontSize: "20px",
                bg: "primary.800",
                color: "white",
                cursor: "pointer",
                _hover: { bg: "primary.500" },
              }}
              onClick={onDelete}
            />
          </HStack>
        </Flex>

        <FormInput
          placeholder="Hardware ID"
          register={hardwareRegister}
          errorMessage={hardwareError}
        />
        <FormInput
          placeholder="Passcode"
          register={passcodeRegister}
          errorMessage={passcodeError}
        />
      </Stack>
    );
  }

  return (
    <Stack>
      <Text sx={{ fontSize: "14px" }}>{name}</Text>
      <Grid gridTemplateColumns="repeat(2, 1fr) 80px" gap={4}>
        <FormInput
          placeholder="Hardware ID"
          register={hardwareRegister}
          errorMessage={hardwareError}
        />
        <FormInput
          placeholder="Passcode"
          register={passcodeRegister}
          errorMessage={passcodeError}
        />
        <Flex justifyContent="space-between">
          <IconButton
            size="sm"
            aria-label="add-beacon"
            icon={<MdAdd />}
            sx={{
              borderRadius: "full",
              fontSize: "20px",
              bg: "primary.800",
              color: "white",
              cursor: "pointer",
              _hover: { bg: "primary.500" },
            }}
            onClick={onAdd}
          />
          <IconButton
            size="sm"
            aria-label="delete-beacon"
            icon={<IoTrashOutline />}
            sx={{
              borderRadius: "full",
              fontSize: "20px",
              bg: "primary.800",
              color: "white",
              cursor: "pointer",
              _hover: { bg: "primary.500" },
            }}
            onClick={onDelete}
          />
        </Flex>
      </Grid>
    </Stack>
  );
};
