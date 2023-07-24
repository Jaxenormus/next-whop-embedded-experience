import type { UserMembershipResponse, WhopErrorResponse } from "@/server";
import { createTRPCRouter, customerProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";

export const customerRouter = createTRPCRouter({
  listMemberships: customerProcedure.query(async ({ ctx }) => {
    const { data } = await ctx.whopApi.get<
      UserMembershipResponse | WhopErrorResponse
    >("/v2/oauth/user/memberships");

    if ("error" in data) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: data.error.message,
      });
    }

    return data.data;
  }),
});
