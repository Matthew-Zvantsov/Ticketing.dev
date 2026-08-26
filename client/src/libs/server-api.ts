import "server-only";
import axios from "axios";
import { headers } from "next/headers";

export async function serverApiClient() {
  const requestHeaders = await headers();

  return axios.create({
    baseURL: `http://${process.env.INTERNAL_API_URL}`,
    headers: {
      Cookie: requestHeaders.get("cookie") ?? "",
      Host: "ticketing.test",
    },
  });
}