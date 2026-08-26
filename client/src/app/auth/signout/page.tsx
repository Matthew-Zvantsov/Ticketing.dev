'use client';

import useRequest from "@/hooks/use-request";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignOut() {

  const { doRequest } = useRequest();
  const router = useRouter();

  useEffect(() => {
    doRequest({
      url: '/users/signout',
      method: 'post',
      onSuccess: () => {
        router.replace('/');
      }
    });
  }, [doRequest, router]);

  return(<div>Signed out....</div>)
}