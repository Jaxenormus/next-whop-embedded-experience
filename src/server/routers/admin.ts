import type { UserExperiencesResponse, WhopErrorResponse } from "@/server";
import { createExperienceSchema } from "@/server/schemas";
import { adminProcedure, createTRPCRouter } from "@/server/trpc";
import { TRPCError } from "@trpc/server";

export const adminRouter = createTRPCRouter({
  listExperiences: adminProcedure.query(async ({ ctx }) => {
    const { data } = await ctx.whopApi.get<
      UserExperiencesResponse | WhopErrorResponse
    >("/v2/oauth/user/experiences");

    if ("error" in data) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: data.error.message,
      });
    }

    return data.data;
  }),
  createExperience: adminProcedure
    .input(createExperienceSchema)
    .mutation(async ({ input }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return input;
    }),
});
