import { BigNumber } from "ethers";
import { Interface, concat, hexlify } from "ethers/lib/utils";
import { fetchSigner } from "@wagmi/core";
import { encodeConstructorData } from "../utils/encodeConstructorData";
import { useReducer } from "react";
import { StateDispatch, TransactionReceipt } from "../types";

export type DeployState = {
  data: null | TransactionReceipt;
  status: "idle" | "error" | "loading" | "success";
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  contractAddress: string | undefined;
  error: null | string;
};

interface ContractDeployArgs {
  abi: Interface;
  bytecode: string;
  args?: Array<string | number>;
  libraries?: Array<string>;
  value?: BigNumber;
  setContractAddress?: StateDispatch<string | null>;
  setStage?: StateDispatch<number>;
}
export function useContractDeploy(params: ContractDeployArgs) {
  const {
    abi,
    bytecode,
    args,
    libraries,
    value,
    setContractAddress,
    setStage,
  } = params;
  const [values, updateValues] = useReducer(
    (current: DeployState, update: Partial<DeployState>): DeployState => ({
      ...current,
      ...update,
    }),
    {
      data: null,
      status: "idle",
      isLoading: false,
      isSuccess: false,
      isError: false,
      contractAddress: undefined,
      error: null,
    }
  );

  const constructorData = encodeConstructorData(abi, args, libraries);
  let txData;
  if (constructorData) {
    txData = hexlify(concat([bytecode, constructorData]));
  } else {
    txData = hexlify(concat([bytecode]));
  }

  const rawTx = {
    data: txData,
    value,
  };

  async function handleContractDeployment() {
    const signer = await fetchSigner();
    if (signer) {
      updateValues({ isLoading: true });
      updateValues({ status: "loading" });
      const response = await signer.sendTransaction(rawTx);
      const tx = await response.wait();
      updateValues({ isLoading: false });
      return tx;
    }
  }

  function deployContract() {
    updateValues({ isError: false });
    handleContractDeployment()
      .then((tx) => {
        updateValues({ data: tx });
        updateValues({ contractAddress: tx?.contractAddress });
        if (setContractAddress && tx?.contractAddress) {
          setContractAddress(tx.contractAddress);
        }
        updateValues({ isSuccess: true });
        updateValues({ status: "success" });
        if (setStage) {
          setStage(1);
        }
      })
      .catch((e) => {
        updateValues({ isLoading: false });
        updateValues({ isError: true });
        updateValues({ status: "error" });
        updateValues({ error: e.message });
        if (e instanceof Error) {
          throw new Error(e.message);
        }
        console.error(e);
      });
  }

  return { deployContract, values };
}
