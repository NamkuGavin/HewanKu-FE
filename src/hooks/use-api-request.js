"use client";

import { useCallback } from "react";
import { useAuth } from "@/contexts/auth-context";

export function useApiRequest() {
  const { handleApiError } = useAuth();

  const run = useCallback(
    async (request, options = {}) => {
      const response = await request();

      await handleApiError(
        response,
        options.errorMessage || "Request API gagal."
      );

      return response;
    },
    [handleApiError]
  );

  return { run };
}
