const networks = {
  Polygon: "https://polygonscan.com/",
  "Polygon Mumbai": "https://mumbai.polygonscan.com/",
  Ethereum: "https://etherscan.io/",
};

export function resolveExplorer(name: string) {
  return networks[name as keyof typeof networks];
}
