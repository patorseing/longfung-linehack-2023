import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Image,
  FormErrorMessage,
  InputProps,
} from "@chakra-ui/react"
import { UseFormRegisterReturn } from "react-hook-form"

type FormInputProps = InputProps & {
  label?: string
  errorMessage?: string
  filedLogo?: string
  register?: UseFormRegisterReturn
}

export const FormInput = (props: FormInputProps) => {
  const { label, errorMessage, filedLogo, register, ...rest } = props
  return (
    <FormControl isInvalid={!!errorMessage}>
      {label && <FormLabel>{label}</FormLabel>}
      <HStack>
        {filedLogo && <Image src={filedLogo} />}
        <Input {...rest} {...register} />
      </HStack>
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  )
}
