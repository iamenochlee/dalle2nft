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
        pr={{ base: "0.6rem", md: "4em" }}
        alignItems="center"
        minH="75px">
        <ConnectKitButton mode="dark" showBalance={true} />
      </Flex>
      <main>{children}</main>
    </>
  );
};

export default Layout;
