import dotenv from "dotenv";
dotenv.config();
import axiosRetry from "axios-retry";
import FormData from "form-data";
import axios from "axios";

export const uploadImageToPinata = async (sourceUrls, name) => {
  const axiosInstance = axios.create();
  axiosRetry(axiosInstance, { retries: 5 });

  console.log("streaming...");
  const streams = [];
  for (const source of sourceUrls) {
    const response = await axiosInstance(source, {
      method: "GET",
      responseType: "stream",
    });
    streams.push(response.data);
  }

  console.log("appending streaming...");
  //appending streams
  const data = new FormData();
  for (let i = 0; i < streams.length; i++) {
    data.append(`file`, streams[i], {
      filepath: `/DALL-E-${name}-IMAGE/${name}-${i}`,
    });
  }

  console.log("posting...");
  //posting
  let result;
  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: process.env.PINATA_API_KEY || "",
          pinata_secret_api_key: process.env.PINATA_SECRET_KEY || "",
        },
      }
    );
    result = res.data;
  } catch (error) {
    console.log(error);
  }

  return result;
};
