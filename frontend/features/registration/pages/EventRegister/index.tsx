import { Step } from "@/components";
import { Flex, VStack, Text, Box, Button, Icon } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import {
  FormStep1,
  FormStep2,
  FormStep3,
  FormStep4,
} from "../../components/event";
import { PictureContextProvider } from "../../context/previewImage";
import { eventSchema } from "../../schema";
import { EventFormValue } from "../../types";

const EventRegisterPage = () => {
  const [step, setStep] = useState<number>(1);
  const methods = useForm<EventFormValue>({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      isTicket: false,
      alcoholPermission: false,
      songRequest: false,
    },
  });
  const onNextStep = async () => {
    switch (step) {
      case 1:
        let result1 = await methods.trigger([
          "eventDate",
          "location",
          "eventName",
          "startTime",
          "endTime",
        ]);
        console.log("re", result1);
        if (!result1) return;

        setStep((prev) => prev + 1);
        break;
      case 2:
        const result2 = await methods.trigger("ticketPrice");
        console.log("re", result2);
        if (!result2) return;
        setStep((prev) => prev + 1);
        break;
      case 3:
        const result3 = await methods.trigger("beacons");
        if (!result3) return;
        setStep((prev) => prev + 1);
        break;
      default:
        return;
    }
  };
  const onSubmit = methods.handleSubmit((data, e) => {
    console.log(data);
  });

  const renderForm = () => {
    switch (step) {
      case 1:
        return <FormStep1 />;
      case 2:
        return <FormStep2 />;
      case 3:
        return <FormStep3 />;
      case 4:
        return <FormStep4 />;
      default:
        return;
    }
  };
  return (
    <PictureContextProvider>
      <FormProvider {...methods}>
        <VStack
          sx={{
            w: "100%",
            alignItems: "center",
            pt: 9,
            px: { base: 6 },
          }}
        >
          <Text
            sx={{
              fontSize: { base: "24px", md: "40px" },
              fontWeight: "bold",
              color: "white",
              mb: { base: 2, xl: 4 },
            }}
          >
            Event Information
          </Text>
          <Step currentStep={step} totalStep={4} />
          <form
            style={{ width: "100%", display: "contents" }}
            onSubmit={onSubmit}
          >
            <Box layerStyle="formContainer">{renderForm()}</Box>
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
                    _hover: {
                      bg: "white",
                    },
                  }}
                  leftIcon={<Icon as={MdArrowBack} fontSize="20px" />}
                  onClick={() => {
                    setStep((prev) => prev - 1);
                  }}
                >
                  Back
                </Button>
              )}
              {step === 4 && (
                <Button
                  type="submit"
                  sx={{
                    w: "155px",
                    ml: "auto",
                  }}
                >
                  Submit
                </Button>
              )}
              {step !== 4 && (
                <Button
                  sx={{
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
          </form>
        </VStack>
      </FormProvider>
    </PictureContextProvider>
  );
};

export default EventRegisterPage;
