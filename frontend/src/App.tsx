import React from "react";
import { useAccount } from "wagmi";
import HomePage from "./HomePage";
import { Box, Center, Flex, Heading, Image } from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";

function App() {
  const { isConnected } = useAccount();

  return (
    <Box
      className="App"
      p={{ base: "0.6rem", lg: "2rem" }}
      pb={{ base: 3, lg: 20 }}>
      {isConnected ? (
        <HomePage />
      ) : (
        <Center>
          <Flex
            flexDir="column"
            alignItems="center"
            gap={3}
            pt={{ base: "6em", md: "0.8em" }}>
            <Image
              src="/nfts.jpeg"
              alt="nfts"
              mb={4}
              minH={{ base: "230px", lg: "450px" }}
              maxW="100%"
            />
            <Heading
              as="h1"
              textAlign="center"
              fontSize={{ base: "13px", sm: "16px", md: "2xl" }}
              fontWeight="bold"
              mb={6}>
              Easily Generate and Mint NFTs from text prompt with DALL-E
            </Heading>
            <ConnectKitButton
              label="Click to connect your Wallet"
              mode="dark"
            />
          </Flex>
        </Center>
      )}
    </Box>
  );
}

export default App;
