import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Grid,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { NftContractNftsResponse } from "alchemy-sdk";
import React, { useEffect, useState } from "react";
import { fetchNFTS } from "../helpers/FetchNFTs";
import { motion } from "framer-motion";
import { useNetwork } from "wagmi";
import { resolveExplorer } from "../utils/resolvedExplorer";

const Minted = ({ contractAddress }: { contractAddress: string | null }) => {
  const [nfts, setNFTS] = useState<NftContractNftsResponse>();
  const [isloading, setIsLoading] = useState(true);
  const { chain } = useNetwork();

  useEffect(() => {
    fetchNFTS(
      contractAddress as string,
      setIsLoading,
      chain?.name as string
    ).then((res) => {
      setNFTS(res);
    });
  }, []);

  return (
    <Box>
      <Center>
        <Flex alignItems="center" gap={2} mb={4} mt={3}>
          <CheckCircleIcon w={8} h={8} color="blue.400" />
          <Text fontSize="2xl" fontWeight="bold" pr={6}>
            Minted
          </Text>
        </Flex>
      </Center>
      <Grid
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        placeItems="center"
        gap={5}>
        {isloading
          ? new Array(3).fill(2).map((box, i) => {
              return (
                <Skeleton
                  h="400px"
                  width="100%"
                  startColor="#242420"
                  endColor="#1a1a1a"
                  key={box + i}
                  borderRadius="lg"
                />
              );
            })
          : nfts?.nfts.map((nft) => {
              const content = JSON.parse(nft.rawMetadata?.content);
              return (
                <Box
                  target="_blank"
                  as={motion.a}
                  cursor="pointer"
                  href={`${resolveExplorer(chain?.name as string)}address/${
                    nft.contract.address
                  }`}
                  display="block"
                  bgColor="#1a1a1a"
                  borderRadius="xl"
                  minW="350px"
                  key={nft.tokenId}
                  whileHover={{ scale: 1.08 }}
                  overflow="hidden">
                  <Image
                    mb={3}
                    maxW="100%"
                    minH="300px"
                    src={content.image}
                    alt={`${content.name}-${nft.tokenId}`}
                  />
                  <Box p={3}>
                    <Flex alignItems="center" gap={5} mb={2}>
                      <Text color="blue.400" fontWeight="semibold">
                        {content.name}
                      </Text>
                      <Text mr="auto">{"ERC721"}</Text>
                      <Text>#{nft.tokenId}</Text>
                    </Flex>
                    <Text fontSize="sm">Description:</Text>
                    <Text>{content.description}</Text>
                  </Box>
                </Box>
              );
            })}
      </Grid>
    </Box>
  );
};

export default React.memo(Minted);
