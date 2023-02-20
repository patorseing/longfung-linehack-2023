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
import { useFormContext, UseFormRegisterReturn } from "react-hook-form";

import { FormInput } from "../../../../components/FormInput";
import { EventFormValue } from "@/features/registration/types";
import { TimePicker } from "../../../../components/TimePicker";

type Props = {
  name?: string;
  onAdd: () => void;
  onDelete: () => void;
  idx: number;
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
    idx,
    bandRegister,
    startTimeError,
    endTimeError,
    bandNameError,
  } = props;
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<EventFormValue>();

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
          <TimePicker
            label="Start time"
            time={getValues(`lineup.${idx}.startTime`)}
            onChange={(value) => {
              setValue(`lineup.${idx}.startTime`, value as string);
            }}
            errorMessage={startTimeError}
          />
          <TimePicker
            label="End time"
            time={getValues(`lineup.${idx}.endTime`)}
            onChange={(value) => {
              setValue(`lineup.${idx}.endTime`, value as string);
            }}
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
        sx={{ alignItems: "end", pb: "3px" }}
      >
        <HStack sx={{ alignItems: "end" }}>
          <TimePicker
            time={getValues(`lineup.${idx}.startTime`)}
            onChange={(value) => {
              setValue(`lineup.${idx}.startTime`, value as string);
            }}
            errorMessage={startTimeError}
          />
          <TimePicker
            time={getValues(`lineup.${idx}.endTime`)}
            onChange={(value) => {
              setValue(`lineup.${idx}.endTime`, value as string);
            }}
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
