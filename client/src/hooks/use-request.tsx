import axios from 'axios';
import { useState } from 'react';

interface useRequestInterface{
  url: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  body?: Record<string, string>,
  onSuccess?: () => void
}

type ApiError = {
  message: string
  field?: string
}

type ApiErrorResponse = {
  errors: ApiError[]
}

export default function useRequest() {
  
  const [errors, setErrors] = useState<ApiError[]>([]);

  const doRequest = async ({url, method, body, onSuccess}: useRequestInterface) => {
    try{
      setErrors([]);
      const response = await axios[method](url, body, { withCredentials: true });

      if(onSuccess){
        onSuccess();
      }
      return response.data;
    }
    catch (error: unknown) {

      const responseErrors = axios.isAxiosError<ApiErrorResponse>(error)
        ? error.response?.data.errors
        : undefined

      setErrors(
        responseErrors?.length
          ? responseErrors
          : [{ message: 'Sign up failed. Please try again.' }]
      )
    }
  };

  return { doRequest, errors };
}