import { useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { Button, Flex, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { useDropzone, FileWithPath } from "react-dropzone";

type UploadPictureProps = {
  fileSrc: string;
  onDropFile: (files: FileWithPath[]) => void;
  onDeleteFile: () => void;
};

export const UploadPicture = (props: UploadPictureProps) => {
  const { fileSrc, onDeleteFile, onDropFile } = props;

  const onDrop = (files: FileWithPath[]) => {
    onDropFile(files);
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/avif": [".avif"],
      "image/bmp": [".bmp"],
      "image/vnd.microsoft.icon": [".ico"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/tiff": [".tif", ".tiff"],
      "image/webp": [".webp"],
    },
    onDrop,
  });

  if (fileSrc) {
    return (
      <Stack spacing={2} alignItems="center">
        <Flex
          sx={{
            position: "relative",
            h: { base: "145px", xl: "150px" },
            justifyContent: "center",
          }}
        >
          <Image src={fileSrc} sx={{ h: "full" }} />
        </Flex>
        <Button
          size="sm"
          sx={{
            w: "100px",
            bg: "red.400",
            color: "white",
            _hover: { bg: "red.300" },
          }}
          onClick={() => {
            onDeleteFile();
          }}
        >
          Remove
        </Button>
      </Stack>
    );
  }

  return (
    <Flex
      {...getRootProps()}
      sx={{
        cursor: "pointer",
        flexDirection: "column",
        alignItems: "center",
        border: "2px dashed",
        borderColor: "customGray.400",
        borderRadius: "8px",
        py: 8,
        mt: 6,
      }}
    >
      <input {...getInputProps()} />
      <Icon
        as={MdAddPhotoAlternate}
        sx={{ boxSize: "70px", color: "customGray.100" }}
      />
      <Text sx={{ fontSize: "14px", color: "customGray.200" }}>
        Browse to choose a file
      </Text>
    </Flex>
  );
};
