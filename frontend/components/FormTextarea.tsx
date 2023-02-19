import { Stack, Text, Textarea, TextareaProps } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

type FormTextareaProps = TextareaProps & {
  label?: string;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
};

export const FormTextarea = (props: FormTextareaProps) => {
  const { label, errorMessage, register, ...rest } = props;
  return (
    <Stack>
      {label && (
        <Text sx={{ fontSize: { base: "14px", md: "16px" } }}>{label}</Text>
      )}
      <Textarea
        sx={{ fontSize: { base: "14px", md: "16px" } }}
        minH="116px"
        isInvalid={!!errorMessage}
        {...rest}
        {...register}
      />
      {errorMessage && <Text color="red">{errorMessage}</Text>}
    </Stack>
  );
};
