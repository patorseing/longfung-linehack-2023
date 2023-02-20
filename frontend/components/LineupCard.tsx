import {
  Flex,
  Grid,
  IconButton,
  Stack,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { UseFormRegisterReturn } from "react-hook-form";

import { FormInput } from "./FormInput";

type Props = {
  name?: string;
  onAdd: () => void;
  onDelete: () => void;
  startTimeRegister?: UseFormRegisterReturn;
  endTimeRegister?: UseFormRegisterReturn;
  bandRegister?: UseFormRegisterReturn;
  startTimeError?: string;
  endTimeError?: string;
  bandNameError?: string;
};

export const LineupCard = (props: Props) => {
  const {
    name,
    onAdd,
    onDelete,
    startTimeRegister,
    endTimeRegister,
    bandRegister,
    startTimeError,
    endTimeError,
    bandNameError,
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
        <HStack
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text py="2" sx={{ fontSize: "14px" }}>
            {name}
          </Text>
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
        </HStack>

        <VStack sx={{ gap: 3, pb: 5 }}>
          <FormInput
            fontSize={14}
            label="Start Time"
            placeholder="HH:MM"
            register={startTimeRegister}
            errorMessage={startTimeError}
          />
          <FormInput
            fontSize={14}
            label="End Time"
            placeholder="HH:MM"
            register={endTimeRegister}
            errorMessage={endTimeError}
          />
          <FormInput
            fontSize={14}
            label="Music band"
            placeholder="Music band"
            register={bandRegister}
            errorMessage={bandNameError}
          />
        </VStack>
      </Stack>
    );
  }

  return (
    <Stack>
      <Grid
        gridTemplateColumns="repeat(2, 1fr) 80px"
        gap={4}
        sx={{ alignItems: "end" }}
      >
        <HStack sx={{ alignItems: "end" }}>
          <FormInput
            fontSize={14}
            placeholder="HH:MM"
            register={startTimeRegister}
            errorMessage={startTimeError}
          />
          <FormInput
            fontSize={14}
            placeholder="HH:MM"
            register={endTimeRegister}
            errorMessage={endTimeError}
          />
        </HStack>

        <FormInput
          fontSize={14}
          placeholder="Music band"
          register={bandRegister}
          errorMessage={bandNameError}
        />
        <Flex sx={{ justifyContent: "space-between", pb: "6px" }}>
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
