import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react"
import { MdArrowForward, MdArrowBack } from "react-icons/md"
import { yupResolver } from "@hookform/resolvers/yup"

import { BandFormValue } from "../../types"
import { bandSchema } from "../../schema"

import { Step } from "@/components/Step"
import { PictureContextProvider } from "../../context/previewImage"
import { FormStep1, FormStep2, FormStep3 } from "../../components/band"

const BandRegisterPage = () => {
  const [step, setStep] = useState<number>(1)

  const methods = useForm<BandFormValue>({ resolver: yupResolver(bandSchema) })

  const onNextStep = async () => {
    switch (step) {
      case 1:
        const result = await methods.trigger(["name", "first_song"])

        if (!result) return

        setStep((prev) => prev + 1)

        break
      case 2:
        setStep((prev) => prev + 1)
        break
      default:
        return
    }
  }

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data)
  })

  const renderForm = () => {
    switch (step) {
      case 1:
        return <FormStep1 />
      case 2:
        return <FormStep2 />
      case 3:
        return <FormStep3 />
      default:
        return
    }
  }

  return (
    <PictureContextProvider>
      <FormProvider {...methods}>
        <form style={{ width: "100%" }} onSubmit={onSubmit}>
          <Flex
            sx={{
              w: "full",
              flexDirection: "column",
              alignItems: "center",
              pt: 9,
              px: { base: 6 },
            }}
          >
            <Text
              sx={{
                color: "white",
                textAlign: "center",
                fontSize: { base: "24px", md: "32px", xl: "56px" },
                fontWeight: { base: 600, xl: 700 },
                mb: { base: 2, xl: 4 },
              }}
            >
              Band Information
            </Text>
            <Step currentStep={step} totalStep={3} />
            <Box
              sx={{
                w: { base: "full", lg: "900px" },
                p: { base: 4, xl: 6 },
                mt: { base: 6, xl: 8 },
                borderRadius: "10px",
                bgColor: "#FDFCFB",
                boxShadow:
                  "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
              }}
            >
              {renderForm()}
            </Box>

            <Flex
              sx={{
                w: { base: "full", lg: "900px" },
                mt: 6,
              }}
            >
              {step > 1 && (
                <Button
                  variant="outline"
                  sx={{
                    w: "155px",
                    bg: "white",
                    borderColor: "primary.800",
                    color: "primary.800",
                    _hover: {
                      bg: "white",
                    },
                  }}
                  leftIcon={<Icon as={MdArrowBack} fontSize="20px" />}
                  onClick={() => {
                    setStep((prev) => prev - 1)
                  }}
                >
                  Back
                </Button>
              )}
              {step === 3 ? (
                <Button
                  type="submit"
                  sx={{
                    bg: "primary.800",
                    _hover: { bg: "primary.500" },
                    color: "white",
                    w: "155px",
                    ml: "auto",
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  sx={{
                    bg: "primary.800",
                    _hover: { bg: "primary.500" },
                    color: "white",
                    w: "155px",
                    ml: "auto",
                  }}
                  rightIcon={<Icon as={MdArrowForward} fontSize="20px" />}
                  onClick={onNextStep}
                >
                  Next
                </Button>
              )}
            </Flex>
          </Flex>
        </form>
      </FormProvider>
    </PictureContextProvider>
  )
}

export default BandRegisterPage
