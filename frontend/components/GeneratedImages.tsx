import React from "react";
import { Box, Grid, Image, Skeleton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { GeneratedProps } from "../types";

const GeneratedImages = ({
  isLoading,
  selectedImages,
  urls,
  prompt,
  count,
  setSelectedImages,
}: GeneratedProps) => {
  function handleImageClick(image: string) {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(image)) {
        return prevSelectedImages.filter(
          (selectedImage) => selectedImage !== image
        );
      } else if (prevSelectedImages.length < 3) {
        return [...prevSelectedImages, image];
      } else {
        return prevSelectedImages;
      }
    });
  }
  return (
    <Grid gap="1em" templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
      {isLoading
        ? new Array(count).fill(2).map((box, i) => {
            return (
              <Skeleton
                h="350px"
                width="100%"
                startColor="#242420"
                endColor="#1a1a1a"
                key={box + i}
                borderRadius="lg"
              />
            );
          })
        : urls.map((url, i) => {
            return (
              <Box
                as={motion.div}
                whileHover={{ scale: 1.03 }}
                h="350px"
                overflow="hidden"
                bgColor="#1a1a1a"
                key={url}
                outline={selectedImages.includes(url) ? "4px solid" : "none"}
                outlineOffset={selectedImages.includes(url) ? "5px" : "none"}
                outlineColor={selectedImages.includes(url) ? "red.200" : "none"}
                onClick={() => handleImageClick(url)}
                borderRadius="lg">
                <Image
                  borderRadius="lg"
                  loading="lazy"
                  pointerEvents="none"
                  src={url}
                  alt={`${prompt}-${i + 1}`}
                  maxW="100%"
                  objectFit="cover"
                />
              </Box>
            );
          })}
    </Grid>
  );
};

export default GeneratedImages;
