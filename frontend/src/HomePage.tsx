import React, { useState } from "react";
import Generate from "../components/Generate";
import { Box, Button, Center, Grid, useDisclosure } from "@chakra-ui/react";
import GeneratedImages from "../components/GeneratedImages";
import Proceed from "../components/Proceed";
import Minted from "../components/Minted";
import Intro from "../components/Intro";

const HomePage = () => {
  const [args, setArgs] = useState({ name: "", symbol: "" });
  const [prompt, setPrompt] = useState("");
  const [urls, setUrls] = useState<Array<string>>([]);
  const [metadataURIs, setMetadataURIs] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState(4);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [hasMinted, setHasMinted] = useState(false);

  return (
    <>
      <Grid
        as="section"
        gap="2em"
        templateColumns={{ lg: "1fr minmax(200px, 2fr)" }}>
        <Generate
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setUrls={setUrls}
          setPrompt={setPrompt}
          setNumber={setNumber}
          number={number}
          prompt={prompt}
          setHasMinted={setHasMinted}
          setContractAddress={setContractAddress}
        />
        {!hasMinted && !urls.length && !isLoading && <Intro />}
        {!hasMinted ? (
          <Box>
            <GeneratedImages
              prompt={prompt}
              selectedImages={selectedImages}
              urls={urls}
              isLoading={isLoading}
              count={number}
              setSelectedImages={setSelectedImages}
            />
            <Center>
              <Button
                w="50%"
                mt={9}
                ref={btnRef}
                onClick={onOpen}
                visibility={
                  selectedImages.length >= 1 && !isLoading
                    ? "visible"
                    : "hidden"
                }>
                Proceed
              </Button>
            </Center>
          </Box>
        ) : (
          <Minted contractAddress={contractAddress} />
        )}
      </Grid>
      <Proceed
        setArgs={setArgs}
        metadataURIs={metadataURIs}
        args={args}
        btnRef={btnRef}
        selectedImages={selectedImages}
        prompt={prompt}
        onClose={onClose}
        isOpen={isOpen}
        setMetadataURIs={setMetadataURIs}
        setSelectedImages={setSelectedImages}
        contractAddress={contractAddress}
        setContractAddress={setContractAddress}
        setHasMinted={setHasMinted}
      />
    </>
  );
};

export default HomePage;
