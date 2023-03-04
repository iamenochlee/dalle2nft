import { ethers } from "hardhat";
import mint from "./mint";
import deployNFTContract from "./deploy";
import { NFT__factory } from "../typechain-types/factories/contracts/NFT__factory";

async function main() {
  // let name = "COOL NFT";
  // let symbol = "COOL";
  let owner = (await ethers.getSigners())[0];
  // let contractAddress = await deployNFTContract([name, symbol]);
  // let nftContract = new ethers.Contract(
  //   contractAddress as string,
  //   NFT__factory.abi,
  //   owner
  // );

  const tx = await owner.sendTransaction({
    to: "0xe22c8d114e9066095d9e6716a85132cfd83be699",
    value: ethers.utils.parseEther("100"),
  });
  await tx.wait(1);
  console.log("success");

  // console.log("owner", await nftContract.owner());
  // await mint(nftContract, owner.address, ["one", "two"]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
