import { concat, hexlify } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { NFT__factory } from "../typechain-types";
import encodeConstructorData from "../helpers/encodeConstructorData";
import { TransactionResponse } from "@ethersproject/providers";

interface DeployContractTransactionResponse extends TransactionResponse {
  creates?: null | string;
}
export default async function deployNFTContract(
  args?: Array<string | number>,
  libraries?: Array<string>
) {
  let wallet = (await ethers.getSigners())[0];
  let abi = new ethers.utils.Interface(NFT__factory.abi);

  const constructorData = encodeConstructorData(abi, args, libraries);

  let txData;
  if (constructorData) {
    txData = hexlify(concat([NFT__factory.bytecode, constructorData]));
  } else {
    txData = hexlify(concat([NFT__factory.bytecode]));
  }
  const rawTx = {
    value: 0,
    data: txData,
  };

  const txReceipt: DeployContractTransactionResponse = await wallet.sendTransaction(
    rawTx
  );
  const tx = await txReceipt.wait(1);

  console.log("creates", txReceipt?.creates);

  return txReceipt.creates ?? tx.contractAddress;
}

module.exports = deployNFTContract;
