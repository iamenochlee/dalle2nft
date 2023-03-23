import React from "react";
import {
  Button,
  Center,
  Flex,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  Link,
  useClipboard,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { CopyIcon, CheckCircleIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { CompleteDialogProps } from "../types";
import { resolveExplorer } from "../utils/resolvedExplorer";
import { useNetwork } from "wagmi";

const CompleteDialog = ({
  contractAddress,
  onClose,
  isOpen,
  hash,
  handleCompletion,
}: CompleteDialogProps) => {
  const { onCopy, hasCopied } = useClipboard(contractAddress);
  const cancelRef = React.useRef(null);
  const { chain } = useNetwork();

  return (
    <AlertDialog
      size="xl"
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      closeOnOverlayClick={false}
      isCentered>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogBody>
          <Flex flexDir="column" gap={3}>
            <Center mb={5} mt={3}>
              <CheckCircleIcon w={16} h={16} color="green.200" pr={2} />
              <Text mt={3} fontSize="xl" fontWeight="bold">
                Minted SuccessFully
              </Text>
            </Center>
            <Flex alignItems="center" gap={2}>
              <Text>Contract:</Text>
              <Flex alignItems="center">
                <Text mr={2}>{contractAddress}</Text>
                <IconButton
                  aria-label="Copy contract address"
                  icon={
                    hasCopied ? (
                      <CheckCircleIcon w={4} h={4} />
                    ) : (
                      <CopyIcon w={4} h={4} />
                    )
                  }
                  onClick={onCopy}
                />
              </Flex>
            </Flex>
          </Flex>
          <Box mb={9} mt={4} fontSize="12px">
            <Text display="inline" fontSize="md" mr={2}>
              Hash:
            </Text>
            {hash}
          </Box>
          <Link
            textDecoration="underline"
            color="green.200"
            target="_blank"
            href={`${resolveExplorer(chain?.name as string)}tx/${hash}`}>
            View on Etherscan
          </Link>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            colorScheme="green"
            ref={cancelRef}
            onClick={handleCompletion}>
            OK <ChevronRightIcon w={9} h={9} mr={-3} />
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default React.memo(CompleteDialog);
