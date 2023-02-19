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
import { SongListType } from "..";
import { Fragment } from "react";

type Props = {
  data: SongListType;
  action?: boolean;
};
export const SongCard = ({ data, action = true }: Props) => {
  const onReject = (id: string) => {};
  const onAccept = (id: string) => {};
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
          md: action ? "repeat(4,1fr)" : "1fr 1fr 1fr 2fr",
        },
      }}
    >
      <VStack layerStyle="songLayout" sx={{ alignItems: "baseline" }}>
        <Text layerStyle="textDescription">Song Name</Text>
        <Text layerStyle="textValue">{data.song_name}</Text>

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
            color: `${
              data.request_by === "Anonymous" ? "placeholder" : "black"
            }`,
          }}
          layerStyle="textValue"
        >
          {data.request_by}
        </Text>
      </VStack>
      {action ? (
        <HStack
          sx={{ pl: { base: "10px", md: "16px" }, justifyContent: "end" }}
        >
          <Flex sx={{ display: { base: "flex", md: "none" }, gap: "8px" }}>
            <IconButton
              aria-label="reject"
              icon={<IoMdClose color="white" size="26px" />}
              sx={{
                bg: "error",
                minW: "32px",
                h: "32px",
                _hover: { bg: "errorHover" },
              }}
              onClick={() => onReject(data.id)}
            />
            <IconButton
              aria-label="accept "
              icon={<FiCheck color="white" size="26px" />}
              sx={{
                bg: "success",
                minW: "32px",
                h: "32px",
                _hover: { bg: "successHover" },
              }}
              onClick={() => onAccept(data.id)}
            />
          </Flex>

          <Flex sx={{ display: { base: "none", md: "flex" }, gap: "16px" }}>
            <Button
              onClick={() => onReject(data.id)}
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
              onClick={() => onAccept(data.id)}
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
