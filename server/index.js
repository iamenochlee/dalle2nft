import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { uploadImageToPinata } from "./upload/uploadImageToPinata.js";
import { uploadMetaDataToPinata } from "./upload/uploadMetaDataToPinata.js";

async function handleRequest(name, urls, prompt) {
  const result = await uploadImageToPinata(urls, name);
  const metadataResult = await uploadMetaDataToPinata(
    result.IpfsHash,
    name,
    urls,
    prompt
  );
  console.log(result);
  console.log(metadataResult);
  let response = metadataResult.map((data) => {
    return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
  });
  console.log("executed");
  return response;
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.status(200);
  res.send("Hi from AI Generated-NFT to IPFS Host Server");
});

app.post("/pin", async function (req, res, next) {
  console.log("connection received...");
  async function run() {
    const {
      data: { name, urls, prompt },
    } = req.body;
    let result = await handleRequest(name, urls, prompt);
    res.status(200);
    return res.send(result);
  }
  if (req.headers.key !== process.env.SERVER_KEY) {
    res.status(500);
    res.statusMessage = "Invalid Server Key";
    res.send();
  } else {
    run().catch(next);
  }
});

console.log("listening...");
app.listen(8080);

module.exports = app;
