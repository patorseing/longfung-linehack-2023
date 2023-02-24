import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Image,
  FormErrorMessage,
  InputProps,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = InputProps & {
  label?: string;
  errorMessage?: string;
  filedLogo?: string;
  register?: UseFormRegisterReturn;
  disable?: boolean;
  fontSize?: number;
  type?: string;
};

export const FormInput = (props: FormInputProps) => {
  const {
    label,
    errorMessage,
    filedLogo,
    register,
    disable,
    fontSize = 16,
    type,
    ...rest
  } = props;

  return (
    <FormControl isInvalid={!!errorMessage}>
      {label && (
        <FormLabel sx={{ fontSize: { base: "14px", md: `${fontSize}px` } }}>
          {label}
        </FormLabel>
      )}
      <HStack>
        {filedLogo && <Image src={filedLogo} />}
        <Input
          type={type ?? "string"}
          {...rest}
          {...register}
          disabled={disable}
          sx={{ fontSize: { base: "14px", md: "16px" }, bg: "white" }}
        />
      </HStack>
      {errorMessage && (
        <FormErrorMessage
          sx={{
            fontSize: { base: "10px", md: "10px" },
            mt: "4px",
            position: "absolute",
          }}
        >
          {errorMessage}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
