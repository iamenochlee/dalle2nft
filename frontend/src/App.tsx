import React from "react";
import { useAccount } from "wagmi";
import HomePage from "./HomePage";
import { Box, Center, Flex, Heading, Image } from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";

function App() {
  const { isConnected } = useAccount();

  return (
    <Box className="App" p="2rem" pb={20}>
      {isConnected ? (
        <HomePage />
      ) : (
        <Center>
          <Flex flexDir="column" alignItems="center" gap={3}>
            <Image
              src="/nfts.jpeg"
              alt="nfts"
              mb={4}
              minH="450px"
              maxW="100%"
            />
            <Heading as="h1" fontSize="2xl" fontWeight="bold" mb={6}>
              Easily Generate and Mint NFTs from text prompt with DALL-E
            </Heading>
            <ConnectKitButton label="Click to connect your Wallet" />
          </Flex>
        </Center>
      )}
    </Box>
  );
}

export default App;
