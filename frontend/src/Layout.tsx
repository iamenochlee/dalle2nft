import { ConnectKitButton } from "connectkit";
import React from "react";
import { Flex } from "@chakra-ui/react";

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <>
      <Flex
        as="header"
        mb={5}
        pt={6}
        justifyContent="end"
        pr="4em"
        alignItems="center"
        minH="50px">
        <ConnectKitButton />
      </Flex>
      <main>{children}</main>
    </>
  );
};

export default Layout;
