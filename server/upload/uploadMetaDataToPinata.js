import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

export const uploadMetaDataToPinata = async (
  imageHash,
  name,
  imageUrls,
  prompt
) => {
  console.log("composing metadata");
  let metadatas = [];
  for (let i = 0; i < imageUrls.length; i++) {
    const metadata = {
      path: "/",
      content: JSON.stringify({
        name,
        image: `https://gateway.pinata.cloud/ipfs/${imageHash}/${name}-${i}`,
        description: prompt,
        attributes: [
          {
            trait_type: "DALL-E GENERATED",
            value: true,
          },
        ],
      }),
    };
    metadatas.push(metadata);
  }
  let requests = [];
  for (let i = 0; i < metadatas.length; i++) {
    requests.push(pinMetaData(name, i, metadatas[i]));
  }
  let results = axios.all(requests);
  console.log("All files pinned successfully.");
  return results;
};

const pinMetaData = async (name, i, metadata) => {
  console.log("appending metadata");
  var config = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    headers: {
      "Content-Type": "application/json",
      pinata_api_key: process.env.PINATA_API_KEY || "",
      pinata_secret_api_key: process.env.PINATA_SECRET_KEY || "",
    },
    data: {
      pinataContent: metadata,
      pinataMetadata: {
        name: `METADATA: ${name}-${i}`,
      },
    },
  };
  const res = await axios(config);
  return res.data;
};
