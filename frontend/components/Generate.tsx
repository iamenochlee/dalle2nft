import React, { useState } from "react";
import generate from "../utils/generateImagesFromDall-e";
import { GenerateProps } from "../types";
import Prompt from "./Prompt";
import { Button, Flex, Text } from "@chakra-ui/react";

const Generate = ({
  setUrls,
  setPrompt,
  prompt,
  setNumber,
  number,
  isLoading,
  setIsLoading,
  setContractAddress,
  setHasMinted,
}: GenerateProps) => {
  const [error, setError] = useState<string | null>(null);
  function handleGenerate() {
    generate(prompt, number, setIsLoading, setError).then((data) => {
      console.log({ data: data });
      setUrls(data);
    });
  }

  return (
    <Flex flexDirection="column" alignItems="center" pt="2em">
      <Prompt
        prompt={prompt}
        setPrompt={setPrompt}
        setNumber={setNumber}
        number={number}
      />
      <Button
        isLoading={isLoading}
        isDisabled={isLoading || !prompt}
        loadingText="Generating"
        colorScheme="blue"
        mt={{ base: "1.5em", md: "5em" }}
        w={40}
        variant="outline"
        onClick={() => {
          if (prompt) {
            setIsLoading(true);
            handleGenerate();
            setContractAddress(null);
            setHasMinted(false);
          }
        }}>
        Generate
      </Button>
      {error && <Text mt={3}>Failed to Generate: {error}</Text>}
    </Flex>
  );
};

export default React.memo(Generate);
