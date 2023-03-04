import { Contract, ContractTransaction } from "ethers";

export default async function mint(
  contract: Contract,
  to: string,
  uris: string[]
) {
  const txReceipt: ContractTransaction = await contract.bulkMint(to, uris);
  await txReceipt.wait(1);
}

module.exports = mint;
