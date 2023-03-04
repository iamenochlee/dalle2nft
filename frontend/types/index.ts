import { BigNumber } from "ethers";
import { Interface } from "ethers/lib/utils.js";
import { RefObject } from "react";

export interface Log {
  blockNumber: number;
  blockHash: string;
  transactionIndex: number;

  removed: boolean;

  address: string;
  data: string;

  topics: Array<string>;

  transactionHash: string;
  logIndex: number;
}
export interface TransactionReceipt {
  to: string;
  from: string;
  contractAddress: string;
  transactionIndex: number;
  root?: string;
  gasUsed: BigNumber;
  logsBloom: string;
  blockHash: string;
  transactionHash: string;
  logs: Array<Log>;
  blockNumber: number;
  confirmations: number;
  cumulativeGasUsed: BigNumber;
  effectiveGasPrice: BigNumber;
  byzantium: boolean;
  type: number;
  status?: number;
}
export type StateDispatch<T> = React.Dispatch<React.SetStateAction<T>>;

export type PromptProps = {
  prompt: string;
  number: number;
  setPrompt: StateDispatch<string>;
  setNumber: StateDispatch<number>;
};

export type InputProps = {
  className?: string;
  type: "text" | "number";
  value: string | number;
  readOnly?: boolean;
  placeholder: string;
  handleChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export type MintProps = {
  address: `0x${string}`;
  contractAddress: string | null;
  abi: Interface;
  metadataURIs: string[];
  safeMint: boolean;
  closeDrawer: () => void;
  setSelectedImages: StateDispatch<string[]>;
  setMetadataURIs: StateDispatch<string[]>;
  setHasMinted: StateDispatch<boolean>;
  setStage: StateDispatch<number>;
  setArgs: StateDispatch<{
    name: string;
    symbol: string;
  }>;
};

export type HostProps = {
  setMetadataURIs: StateDispatch<string[]>;
  setStage: StateDispatch<number>;
  urls: string[];
  args: {
    name: string;
    symbol: string;
  };
  prompt: string;
};

export interface DeployProps {
  abi: Interface;
  args: { name: string; symbol: string };
  setContractAddress: StateDispatch<string | null>;
  setStage: StateDispatch<number>;
  setArgs: StateDispatch<{
    name: string;
    symbol: string;
  }>;
}
export interface GenerateProps {
  setUrls: StateDispatch<string[]>;
  setSelectedImages: StateDispatch<string[]>;
  setPrompt: StateDispatch<string>;
  isLoading: boolean;
  setIsLoading: StateDispatch<boolean>;
  prompt: string;
  setNumber: StateDispatch<number>;
  number: number;
  setContractAddress: StateDispatch<string | null>;
  setHasMinted: StateDispatch<boolean>;
}
export type NextProps = {
  isOpen: boolean;
  onClose: () => void;
  metadataURIs: string[];
  setArgs: StateDispatch<{
    name: string;
    symbol: string;
  }>;
  setMetadataURIs: StateDispatch<string[]>;
  setSelectedImages: StateDispatch<string[]>;
  contractAddress: string | null;
  setContractAddress: StateDispatch<string | null>;
  selectedImages: string[];
  prompt: string;
  btnRef: RefObject<HTMLButtonElement> | null;
  args: { name: string; symbol: string };
  setHasMinted: StateDispatch<boolean>;
};

export type GeneratedProps = {
  isLoading: boolean;
  selectedImages: string[];
  urls: string[];
  count: number;
  prompt: string;
  setSelectedImages: StateDispatch<string[]>;
};

export type SelectedProps = {
  selectedImages: string[];
  prompt: string;
};

export type WarningDialogProps = {
  cancelFunction: () => void;
  onWarningClose: () => void;
  isWarningOpen: boolean;
};

export type CompleteDialogProps = {
  contractAddress: string;
  isOpen: boolean;
  onClose: () => void;
  hash: string;
  handleCompletion: () => void;
};
