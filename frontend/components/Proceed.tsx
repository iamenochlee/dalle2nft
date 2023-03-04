import React, { RefObject, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { NextProps } from "../types";
import Host from "./Host";
import Deploy from "./Deploy";
import WarningDialog from "./WarningDialog";
import SelectedImages from "./SelectedImages";
import { NFT__factory } from "../contracts/typechain-types";
import { useAccount } from "wagmi";
import Mint from "./Mint";
const abi = NFT__factory.getInterface(NFT__factory.abi);

const Proceed = ({
  metadataURIs,
  isOpen,
  selectedImages,
  setMetadataURIs,
  prompt,
  onClose,
  btnRef,
  args,
  setArgs,
  setSelectedImages,
  contractAddress,
  setContractAddress,
  setHasMinted,
}: NextProps) => {
  const { address } = useAccount();
  const [stage, setStage] = useState(0);
  const {
    isOpen: isWarningOpen,
    onOpen: onWarningOpen,
    onClose: onWarningClose,
  } = useDisclosure();

  function handleCancel() {
    setSelectedImages([]);
    setMetadataURIs([]);
    setStage(0);
    setContractAddress(null);
    setArgs({
      name: "",
      symbol: "",
    });
    onClose();
    onWarningClose();
  }

  return (
    <>
      <Drawer
        size="sm"
        closeOnOverlayClick={false}
        isOpen={isOpen}
        placement="right"
        onClose={onWarningOpen}
        finalFocusRef={btnRef as RefObject<HTMLButtonElement>}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={onWarningOpen} />
          <DrawerHeader>
            {(stage === 0 && "Deploy") ||
              (stage === 1 && "Host") ||
              (stage === 2 && "Mint")}
          </DrawerHeader>
          <DrawerBody px={{ base: 2.5, lg: 3.5 }} pt={4}>
            <SelectedImages prompt={prompt} selectedImages={selectedImages} />
            {stage === 0 && (
              <Deploy
                abi={abi}
                args={args}
                setArgs={setArgs}
                setContractAddress={setContractAddress}
                setStage={setStage}
              />
            )}
            {stage === 1 && (
              <Host
                args={args}
                setMetadataURIs={setMetadataURIs}
                urls={selectedImages}
                prompt={prompt}
                setStage={setStage}
              />
            )}
            {stage === 2 && (
              <Mint
                closeDrawer={onClose}
                setStage={setStage}
                address={address as `0x${string}`}
                contractAddress={contractAddress}
                setSelectedImages={setSelectedImages}
                abi={abi}
                setArgs={setArgs}
                metadataURIs={metadataURIs}
                safeMint={metadataURIs?.length === 1}
                setMetadataURIs={setMetadataURIs}
                setHasMinted={setHasMinted}
              />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <WarningDialog
        isWarningOpen={isWarningOpen}
        onWarningClose={onWarningClose}
        cancelFunction={handleCancel}
      />
    </>
  );
};

export default Proceed;
