"use client";

import { api } from "@/server/api";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TRPCClientError, httpBatchLink, loggerLink } from "@trpc/client";
import { useState } from "react";
import superjson from "superjson";

const modifiedClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: typeof window !== "undefined",
      suspense: true,
      retry(failureCount, error) {
        if (error instanceof TRPCClientError) {
          const statusCode = (error.data?.httpStatus ?? 500) as number;
          if (statusCode >= 400 && statusCode < 500) {
            return false;
          }
        }
        return failureCount < 3;
      },
    },
  },
});

export function ApiProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => modifiedClient);
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({ enabled: () => true }),
        httpBatchLink({ url: `${getBaseUrl()}/api/trpc` }),
      ],
      transformer: superjson,
    })
  );
  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </api.Provider>
  );
}
