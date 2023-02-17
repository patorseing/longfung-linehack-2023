import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Image,
  FormErrorMessage,
  InputProps,
} from "@chakra-ui/react"

type FormInputProps = InputProps & {
  label?: string
  errorMessage?: string
  filedLogo?: string
}

export const FormInput = (props: FormInputProps) => {
  const { label, errorMessage, filedLogo, ...rest } = props
  return (
    <FormControl isInvalid={!!errorMessage}>
      {label && <FormLabel>{label}</FormLabel>}
      <HStack>
        {filedLogo && <Image src={filedLogo} />}
        <Input {...rest} />
      </HStack>
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  )
}
