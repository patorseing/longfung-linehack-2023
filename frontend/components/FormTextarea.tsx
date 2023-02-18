import { Stack, Text, Textarea, TextareaProps } from "@chakra-ui/react"

type FormTextareaProps = TextareaProps & {
  label?: string
  errorMessage?: string
}

export const FormTextarea = (props: FormTextareaProps) => {
  const { label, errorMessage, ...rest } = props
  return (
    <Stack>
      {label && <Text>{label}</Text>}
      <Textarea minH="116px" isInvalid={!!errorMessage} {...rest} />
      {errorMessage && <Text color="red">{errorMessage}</Text>}
    </Stack>
  )
}
