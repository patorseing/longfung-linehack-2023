import {
  HStack,
  VStack,
  Text,
  Button,
  Grid,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { FiCheck } from "react-icons/fi";

import { SongRequest } from "../types";
import { useUpdateSongRequest } from "../services";

type Props = {
  data: SongRequest;
  isRequestTab?: boolean;
};

export const SongCard = ({ data, isRequestTab = true }: Props) => {
  const { mutate, isLoading } = useUpdateSongRequest();

  return (
    <Grid
      sx={{
        w: "100%",
        p: "16px",
        justifyContent: "space-between",
        bg: "white",
        borderRadius: "8px",
        gridTemplateColumns: {
          base: "repeat(3,1fr)",
          md: isRequestTab ? "repeat(4,1fr)" : "1fr 1fr 1fr 2fr",
        },
      }}
    >
      <VStack layerStyle="songLayout" sx={{ alignItems: "baseline" }}>
        <Text layerStyle="textDescription">Song Name</Text>
        <Text layerStyle="textValue">{data.songName}</Text>

        <Text
          layerStyle="textDescription"
          sx={{ display: { base: "flex", md: "none" } }}
        >
          Note
        </Text>
        <Text
          layerStyle="textValue"
          sx={{ display: { base: "flex", md: "none" } }}
        >
          {data.note}
        </Text>
      </VStack>
      <VStack
        layerStyle="songLayout"
        sx={{
          alignItems: "baseline",
          pl: { base: "10px", md: "16px" },
          display: { base: "none", md: "flex" },
        }}
      >
        <Text layerStyle="textDescription">Note</Text>
        <Text layerStyle="textValue">{data.note}</Text>
      </VStack>
      <VStack
        layerStyle="songLayout"
        sx={{
          alignItems: "baseline",
          pl: { base: "10px", md: "16px" },
          borderRight: "none",
        }}
      >
        <Text layerStyle="textDescription">Request by</Text>
        <Text
          sx={{
            color: `${data.userId === null ? "placeholder" : "black"}`,
          }}
          layerStyle="textValue"
        >
          {data.userId || "Anonymous"}
        </Text>
      </VStack>
      {isRequestTab ? (
        <HStack
          sx={{ pl: { base: "10px", md: "16px" }, justifyContent: "end" }}
        >
          <Flex sx={{ display: { base: "flex", md: "none" }, gap: "8px" }}>
            <IconButton
              isLoading={isLoading}
              aria-label="reject"
              icon={<IoMdClose color="white" size="26px" />}
              sx={{
                bg: "error",
                minW: "32px",
                h: "32px",
                _hover: { bg: "errorHover" },
              }}
              onClick={() => {
                mutate({ data: { id: data.id, status: "reject" } });
              }}
            />
            <IconButton
              isLoading={isLoading}
              aria-label="accept "
              icon={<FiCheck color="white" size="26px" />}
              sx={{
                bg: "success",
                minW: "32px",
                h: "32px",
                _hover: { bg: "successHover" },
              }}
              onClick={() => {
                mutate({ data: { id: data.id, status: "accept" } });
              }}
            />
          </Flex>

          <Flex sx={{ display: { base: "none", md: "flex" }, gap: "16px" }}>
            <Button
              isLoading={isLoading}
              onClick={() => {
                mutate({ data: { id: data.id, status: "reject" } });
              }}
              leftIcon={<IoMdClose />}
              sx={{
                bg: "error",
                color: "white",
                fontWeight: "medium",
                _hover: { bg: "errorHover" },
              }}
            >
              Reject
            </Button>
            <Button
              isLoading={isLoading}
              onClick={() => {
                mutate({ data: { id: data.id, status: "accept" } });
              }}
              leftIcon={<FiCheck />}
              sx={{
                bg: "success",
                color: "white",
                fontWeight: "medium",
                _hover: { bg: "successHover" },
              }}
            >
              Accept
            </Button>
          </Flex>
        </HStack>
      ) : (
        <VStack
          layerStyle="songLayout"
          sx={{
            alignItems: "baseline",
            pl: { base: "10px", md: "16px" },
            borderRight: "none",
            borderLeft: {
              base: "none",
              md: "1px solid rgba(253, 132, 36, 0.5)",
            },
          }}
        >
          <Text layerStyle="textDescription">status</Text>
          <Text layerStyle="textValue" sx={{ textTransform: "capitalize" }}>
            {data.status}
          </Text>
        </VStack>
      )}
    </Grid>
  );
};
