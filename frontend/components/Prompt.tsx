import React from "react";
import { Button, Flex, Grid, Text, Textarea } from "@chakra-ui/react";
import { PromptProps } from "../types";

const Prompt = ({ prompt, number, setPrompt, setNumber }: PromptProps) => {
  return (
    <>
      <Textarea
        placeholder="let's be descriptive... ✌"
        value={prompt}
        aria-label="Enter a Desciption"
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
        resize="none"
        autoFocus={true}
        h="300px"
        fontSize="1rem"
        bgColor="#1a1a1a"
      />
      <Text as="h3" mt={4} fontSize="lg" mb={4}>
        no. of images
      </Text>
      <Flex justifyContent="space-around" gap="1.3em">
        <Button
          isDisabled={number === 1}
          onClick={() => {
            setNumber(number - 1);
          }}>
          -
        </Button>
        <Grid fontSize="xl" fontWeight="semibold" placeItems="center">
          {number}
        </Grid>
        <Button
          isDisabled={number === 8}
          onClick={() => {
            setNumber(number + 1);
          }}>
          +
        </Button>
      </Flex>
    </>
  );
};

export default Prompt;
