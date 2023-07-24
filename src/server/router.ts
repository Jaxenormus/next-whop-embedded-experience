import { adminRouter } from "@/server/routers/admin";
import { customerRouter } from "@/server/routers/customer";
import { sessionRouter } from "@/server/routers/session";
import { createTRPCRouter } from "@/server/trpc";

export const appRouter = createTRPCRouter({
  session: sessionRouter,
  customer: customerRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
