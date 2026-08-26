import "server-only";
import axios from "axios";
import { serverApiClient } from "../libs/server-api";
import HeaderComp from "@/components/header";

interface CurrentUserResponse {
  currentUser: CurrentUser | null;
}

export interface CurrentUser {
  id: string;
  email: string;
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
    <div>
      <HeaderComp currentUser={currentUser} />
      {currentUser ? (
        <h1>You are already signed in</h1>
      ) : (
        <h1>You are not signed in</h1>
      )}
    </div>
  );
}