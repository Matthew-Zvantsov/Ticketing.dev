import "server-only";
import Link from "next/link";
import axios from "axios";
import { cookies } from "next/headers";

interface CurrentUserResponse {
  currentUser: {
    id: string;
    email: string;
  } | null;
}

async function getCurrentUser(): Promise<CurrentUserResponse> {
  const cookieStore = await cookies();

  const allCookies = cookieStore.getAll();
  const cookieHeader = allCookies
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  try {
    const response = await axios.get<CurrentUserResponse>(
      `http://${process.env.INTERNAL_API_URL}/api/users/currentuser`,
      {
        headers: {
          Cookie: cookieHeader,
          Host: "ticketing.test",
        },
      }
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
      <h1>Landing Page</h1>
      <Link href="auth/signup">Sign Up!</Link>
    </div>
  );
}