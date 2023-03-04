import { Alchemy, Network } from "alchemy-sdk";
import { StateDispatch } from "../types";

export async function fetchNFTS(
  address: string,
  setIsLoading: StateDispatch<boolean>
) {
  const alchemy = new Alchemy({
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
    network: Network.MATIC_MAINNET,
  });

  const nfts = await alchemy.nft.getNftsForContract(address);

  setIsLoading(false);
  console.log(nfts);
  return nfts;
}
