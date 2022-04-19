import { prepareServerlessUrl } from "next/dist/server/base-server";
import React, { useState } from "react";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(url: string): UseMutationResult<T> {
  const [state, set_state] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  })

  function mutation(data: any) {
    set_state((prev) => ({ ...prev, loading: true }))

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json().catch(() => { }))
      .then((data) => set_state((prev) => ({ ...prev, data })))
      .catch((error) => set_state((prev) => ({ ...prev, error })))
      .finally(() => set_state((prev) => ({ ...prev, loading: false })))
  }
  return [mutation, { ...state }];
}
