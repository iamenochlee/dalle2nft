import React from "react";
import {
  Button,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogHeader,
  ButtonGroup,
} from "@chakra-ui/react";
import { WarningDialogProps } from "../types";

const WarningDialog = ({
  onWarningClose,
  cancelFunction,
  isWarningOpen,
}: WarningDialogProps) => {
  const ref = React.useRef(null);

  return (
    <AlertDialog
      size="xl"
      motionPreset="slideInBottom"
      leastDestructiveRef={ref}
      onClose={onWarningClose}
      isOpen={isWarningOpen}
      closeOnOverlayClick={false}
      isCentered>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Text>CANCEL?</Text>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text>NOTE: You are about to cancel all previous process.</Text>
          <Text mb={4}>Are you sure?</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <ButtonGroup>
            <Button colorScheme="blue" ref={ref} onClick={onWarningClose}>
              NO
            </Button>
            <Button colorScheme="red" ref={ref} onClick={cancelFunction}>
              YES
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default React.memo(WarningDialog);
