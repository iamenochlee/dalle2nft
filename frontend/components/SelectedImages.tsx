import React, { useState } from "react";
import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { SelectedProps } from "../types";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";

const SelectedImages = ({ selectedImages, prompt }: SelectedProps) => {
  const [currIndex, setCurrIndex] = useState(0);

  function handleClick(type: "prev" | "next") {
    switch (type) {
      case "next":
        if (selectedImages.length - 1 > currIndex) {
          setCurrIndex(currIndex + 1);
        }
        break;
      case "prev":
        if (currIndex > 0) {
          setCurrIndex(currIndex - 1);
        }
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Flex gap={2} flexWrap="wrap" overflow="hidden">
        {selectedImages.map((img, i) => {
          return (
            <Box
              key={prompt + i}
              maxH="370px"
              objectFit="cover"
              display={currIndex === i ? "block" : "none"}>
              <Image src={img} alt={prompt} maxW="100%" />
            </Box>
          );
        })}
      </Flex>
      <Center mt={3}>
        <Text>
          {selectedImages.length} selected image
          {selectedImages.length > 1 ? "s" : ""}
        </Text>
      </Center>
      <Center mt={4} mb={selectedImages.length > 1 ? 12 : 28}>
        {selectedImages.length > 1 && (
          <ButtonGroup gap={6} display="block">
            <IconButton
              isDisabled={currIndex === 0}
              aria-label="See previous"
              icon={<ChevronLeftIcon />}
              onClick={() => handleClick("prev")}
            />
            <IconButton
              isDisabled={currIndex === selectedImages.length - 1}
              aria-label="See next"
              icon={<ChevronRightIcon />}
              onClick={() => handleClick("next")}
            />
          </ButtonGroup>
        )}
      </Center>
    </>
  );
};

export default React.memo(SelectedImages);
