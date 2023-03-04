import React, { useState } from "react";
import { pinImage } from "../utils/pinToPinata";
import { HostProps } from "../types";
import { Button, Box, Center, Text, Flex } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

const Host = ({ setMetadataURIs, urls, args, prompt, setStage }: HostProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  function handleImagePin() {
    setIsLoading(true);
    if (urls.length > 0) {
      pinImage(args.name, urls, prompt, setIsLoading, setError, setStage).then(
        (result) => {
          setMetadataURIs(result);
        }
      );
    }
  }
  return (
    <Box mt={24}>
      <Center>
        <Button
          onClick={handleImagePin}
          isLoading={isLoading}
          isDisabled={isLoading}
          mb={2}
          loadingText="Hosting">
          Host
        </Button>
      </Center>
      <Center visibility={error ? "visible" : "hidden"}>
        <Flex gap={3} alignItems="center">
          <WarningIcon w={4} h={4} color="red.500" />
          <Text>{error}</Text>
        </Flex>
      </Center>
    </Box>
  );
};

export default Host;
