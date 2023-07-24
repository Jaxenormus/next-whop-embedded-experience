import type { AppRouter } from "@/server/router";
import { createTRPCReact } from "@trpc/react-query";

export const api = createTRPCReact<AppRouter>({
  unstable_overrides: {
    useMutation: {
      async onSuccess(opts) {
        await opts.originalFn();
        await opts.queryClient.invalidateQueries();
      },
    },
  },
});
