import { Configuration, OpenAIApi } from "openai";
import { StateDispatch } from "../types";

export default async function generate(
  prompt: string,
  n?: number,
  setloading?: StateDispatch<boolean>,
  setError?: StateDispatch<string | null>
) {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  let response;
  if (setError) {
    setError(null);
  }
  try {
    response = await openai.createImage({
      prompt,
      n: n || 4,
      size: "512x512",
    });
  } catch (e) {
    if (e instanceof Error) {
      if (setloading) {
        setloading(false);
      }
      if (setError) {
        setError(e.message);
      }
    }
    throw new Error((e as Error).message);
  }

  const result = response?.data.data.map((res) => res.url);
  if (setloading) {
    setloading(false);
  }
  if (setError) {
    setError(null);
  }
  return result as string[];
}
