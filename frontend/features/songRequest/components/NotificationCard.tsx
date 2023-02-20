import { useMemo } from "react"
import { Button, Image, VStack, Text } from "@chakra-ui/react"

type NotificationCardProps = {
  type: "thanks" | "timeout"
}

export const NotificationCard = (props: NotificationCardProps) => {
  const { type } = props

  const picture = useMemo(() => {
    switch (type) {
      case "thanks":
        return "/images/thankyou-icon.svg"
      default:
        return "/images/sorry-icon.svg"
    }
  }, [type])

  const title = useMemo(() => {
    switch (type) {
      case "thanks":
        return "Thank you!"
      default:
        return "Opps! Request time is end"
    }
  }, [type])

  const description = useMemo(() => {
    switch (type) {
      case "thanks":
        return "We’ve received your requested song! Please wait until your queue is coming."
      default:
        return "The song request time is end. We are really sorry. You can request next time."
    }
  }, [type])

  return (
    <VStack
      spacing={{ base: 2, md: 4 }}
      sx={{
        w: { base: "full", md: "600px", lg: "900px" },
        p: { base: 6, md: 12 },
        color: "white",
        bg: "rgba(0, 0, 0, 0.5)",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <Image src={picture} sx={{ boxSize: { base: "120px", md: "140px" } }} />
      <Text
        sx={{
          fontSize: { base: "24px", md: "32px" },
          fontWeight: 700,
        }}
      >
        {title}
      </Text>
      <Text sx={{ fontSize: { base: "14px", md: "16px" } }}>{description}</Text>
      <Button sx={{ w: "full", mt: "24px !important" }}>
        Back to main menu
      </Button>
    </VStack>
  )
}
