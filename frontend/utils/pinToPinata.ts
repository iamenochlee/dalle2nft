import { StateDispatch } from "../types";
import server from "./server";

export async function pinImage(
  name: string,
  urls: string[],
  prompt: string,
  setloading: StateDispatch<boolean>,
  setError: StateDispatch<string | null>,
  setStage: StateDispatch<number>
) {
  let result;
  setError(null);
  const data = {
    name,
    urls,
    prompt,
  };
  try {
    const res = await server.post(
      "/pin",
      { data },
      {
        headers: {
          key: import.meta.env.VITE_SERVER_KEY,
        },
      }
    );
    result = res.data;
    setloading(false);
    setStage(2);
  } catch (error) {
    setloading(false);
    setError((error as Error)?.message);
    throw new Error((error as Error).message);
  }

  return result;
}
