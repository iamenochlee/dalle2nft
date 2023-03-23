import { Alchemy, Network } from "alchemy-sdk";
import { StateDispatch } from "../types";

const networks = {
  Polygon: Network.MATIC_MAINNET,
  "Polygon Mumbai": Network.MATIC_MUMBAI,
  Ethereum: Network.ETH_MAINNET,
};

export async function fetchNFTS(
  address: string,
  setIsLoading: StateDispatch<boolean>,
  name: string
) {
  const alchemy = new Alchemy({
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
    network: networks[name as keyof typeof networks],
  });

  const nfts = await alchemy.nft.getNftsForContract(address);
  setIsLoading(false);
  console.log(nfts);
  return nfts;
}
