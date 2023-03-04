import React from "react";
import { MintProps } from "../types";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import CompleteDialog from "./CompleteDialog";
import { WarningIcon, CheckCircleIcon } from "@chakra-ui/icons";

const Mint = ({
  address,
  contractAddress,
  abi,
  metadataURIs,
  safeMint,
  setSelectedImages,
  setMetadataURIs,
  closeDrawer,
  setHasMinted,
  setStage,
  setArgs,
}: MintProps) => {
  const { config } = usePrepareContractWrite({
    address: contractAddress as `0x${string}`,
    abi: abi as any,
    functionName: safeMint ? "safeMint" : "bulkMint",
    args: [address, safeMint ? metadataURIs[0] : metadataURIs],
  });

  const { data, writeAsync, isError, error, isLoading } =
    useContractWrite(config);
  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  console.log({ metadataURIs });

  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleCompletion() {
    closeDrawer();
    setMetadataURIs([]);
    setSelectedImages([]);
    onClose();
    setHasMinted(true);
    setStage(0);
    setArgs({
      name: "",
      symbol: "",
    });
  }
  return (
    <>
      <Box mt={24}>
        <Center>
          {!isSuccess ? (
            <Button
              loadingText="minting"
              disabled={isLoading || metadataURIs.length === 0}
              isLoading={isLoading}
              onClick={() => {
                writeAsync?.().then(() => {
                  onOpen();
                });
              }}>
              Mint NFTS
            </Button>
          ) : (
            <Flex alignItems="center" gap={2}>
              <CheckCircleIcon w={4} h={4} color="green.500" />
              <Text fontSize="md">
                Successfully Minted {metadataURIs.length} NFTs
              </Text>
            </Flex>
          )}
        </Center>
        <Center mt={3} visibility={isError ? "visible" : "hidden"}>
          <Flex gap={3} alignItems="center">
            <WarningIcon w={4} h={4} color="red.500" />
            <Text>{error?.message}</Text>
          </Flex>
        </Center>
      </Box>
      <CompleteDialog
        hash={data?.hash as string}
        isOpen={isOpen}
        onClose={onClose}
        contractAddress={contractAddress as string}
        handleCompletion={handleCompletion}
      />
    </>
  );
};

export default React.memo(Mint);
