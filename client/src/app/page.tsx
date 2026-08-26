import "server-only";
import Link from "next/link";
import axios from "axios";
import { serverApiClient } from "../libs/server-api";
import HeaderComp from "@/components/header";

interface CurrentUserResponse {
  currentUser: {
    id: string;
    email: string;
  } | null;
}

async function getCurrentUser(): Promise<CurrentUserResponse> {
  try {
    const client = await serverApiClient();
    const response = await client.get<CurrentUserResponse>(
      "/api/users/currentUser"
    );

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("getCurrentUser request failed", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
    } else {
      console.error("getCurrentUser failed", err);
    }
    return { currentUser: null };
  }
}

export default async function Home() {
  const { currentUser } = await getCurrentUser();

  console.log('currentUser ', currentUser);

  return (
    currentUser ? 
    <div>
      <h1>You are already signed in</h1>
    </div>
    :
    <div>
      <HeaderComp></HeaderComp>
      <h1>You are not signed in</h1>
    </div>
  );
}