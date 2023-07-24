import { appRouter } from "@/server/router";
import { createTRPCContext } from "@/server/trpc";
import { createNextApiHandler } from "@trpc/server/adapters/next";

const handler = createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});

export default handler;
