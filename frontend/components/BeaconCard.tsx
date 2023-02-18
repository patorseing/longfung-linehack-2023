import {
  Flex,
  Grid,
  IconButton,
  Input,
  Stack,
  HStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react"
import { MdAdd } from "react-icons/md"
import { IoTrashOutline } from "react-icons/io5"

type BeaconCardProps = {
  name: string
  onAdd: () => void
  onDelete: () => void
}

export const BeaconCard = (props: BeaconCardProps) => {
  const { name } = props
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  })

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
          <Text py="2">{name}</Text>
          <HStack spacing={3}>
            <IconButton
              size="sm"
              aria-label="add-beacon"
              as={MdAdd}
              sx={{
                borderRadius: "full",
                p: 1,
                bg: "primary.800",
                color: "white",
                cursor: "pointer",
                _hover: { bg: "primary.500" },
              }}
            />
            <IconButton
              size="sm"
              aria-label="delete-beacon"
              as={IoTrashOutline}
              sx={{
                borderRadius: "full",
                p: 1,
                bg: "primary.800",
                color: "white",
                cursor: "pointer",
                _hover: { bg: "primary.500" },
              }}
            />
          </HStack>
        </Flex>

        <Input placeholder="Hardware ID" />
        <Input placeholder="Passcode" />
      </Stack>
    )
  }

  return (
    <Stack>
      <Text>{name}</Text>
      <Grid gridTemplateColumns="repeat(2, 1fr) 80px" gap={4}>
        <Input placeholder="Hardware ID" />
        <Input placeholder="Passcode" />
        <Flex justifyContent="space-between">
          <IconButton
            size="sm"
            aria-label="add-beacon"
            as={MdAdd}
            sx={{
              borderRadius: "full",
              p: 1,
              bg: "primary.800",
              color: "white",
              cursor: "pointer",
              _hover: { bg: "primary.500" },
            }}
          />
          <IconButton
            size="sm"
            aria-label="delete-beacon"
            as={IoTrashOutline}
            sx={{
              borderRadius: "full",
              p: 1,
              bg: "primary.800",
              color: "white",
              cursor: "pointer",
              _hover: { bg: "primary.500" },
            }}
          />
        </Flex>
      </Grid>
    </Stack>
  )
}
