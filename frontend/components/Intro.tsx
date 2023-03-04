import React from "react";
import { Flex, Heading, List, ListItem } from "@chakra-ui/react";

const Intro = () => {
  return (
    <Flex pt={10} pl={32} fontSize="2xl" flexDir="column">
      <Heading
        as="h1"
        mb={7}
        color="blue.400"
        fontWeight="semibold"
        fontSize="3xl">
        Steps to Your NFTS
      </Heading>
      <List listStyleType="circle" pl={8}>
        <ListItem textStyle="round">Enter a Prompt</ListItem>
        <ListItem textStyle="round">Select the Number</ListItem>
        <ListItem textStyle="round">Click Generate</ListItem>
        <ListItem textStyle="round">Deploy</ListItem>
        <ListItem textStyle="round">Host </ListItem>
        <ListItem textStyle="round">Mint Your NFT!</ListItem>
      </List>
    </Flex>
  );
};

export default Intro;
