import { uploadImageToPinata } from "./uploadImageToPinata.js";
import { uploadMetaDataToPinata } from "./uploadMetaDataToPinata.js";

export async function handleRequest(name, urls, prompt) {
  const result = await uploadImageToPinata(urls, name);
  const metadataResult = await uploadMetaDataToPinata(
    result.IpfsHash,
    name,
    urls,
    prompt
  );
  console.log(result);
  console.log(metadataResult);
  return ["cool", "sup"];
}
