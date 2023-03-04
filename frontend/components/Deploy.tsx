import React from "react";
import { useContractDeploy } from "../hooks/useContractDeploy";
import { DeployProps } from "../types";
import { NFT__factory } from "../contracts/typechain-types";
import { Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

const bytecode = NFT__factory.bytecode;
const Deploy = ({
  abi,
  args,
  setContractAddress,
  setArgs,
  setStage,
}: DeployProps) => {
  const { deployContract, values } = useContractDeploy({
    abi,
    bytecode,
    args: Object.values(args),
    setContractAddress,
    setStage,
  });

  return (
    <Flex gap={5} flexDir="column" mt={6}>
      <Input
        type="text"
        value={args.name}
        placeholder="name"
        onChange={(e) =>
          setArgs((prev) => {
            return { ...prev, name: e.target.value };
          })
        }
      />
      <Input
        type="text"
        value={args.symbol}
        placeholder="symbol"
        onChange={(e) =>
          setArgs((prev) => {
            return { ...prev, symbol: e.target.value };
          })
        }
      />
      <Button
        mt={8}
        isLoading={values.isLoading}
        isDisabled={!args.name || !args.symbol}
        loadingText="Deploying"
        onClick={deployContract}>
        Deploy
      </Button>
      <Center mt={1} visibility={values.isError ? "visible" : "hidden"}>
        <Flex gap={3} alignItems="center">
          <WarningIcon w={4} h={4} color="red.500" />
          <Text>Failed</Text>
        </Flex>
      </Center>
    </Flex>
  );
};

export default React.memo(Deploy);
