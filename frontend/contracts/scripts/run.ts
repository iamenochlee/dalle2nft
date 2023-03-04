import { NFT__factory } from "../typechain-types";
import fs from "fs";

function main() {
  const abi = NFT__factory.abi;
  let abiBuffer = Buffer.from(JSON.stringify(abi));
  fs.writeFileSync("../../frontend/constants/abi.ts", abiBuffer);
}

main();
