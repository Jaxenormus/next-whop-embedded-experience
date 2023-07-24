import type { WhopOAuthResponse } from "@/server/trpc";
import {
  adminProcedure,
  createTRPCRouter,
  customerProcedure,
  publicProcedure,
} from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

type OAuthRequest =
  | {
      access_token: string;
      token_type: string;
      expires_in: number;
      refresh_token: string;
      scope: string;
      created_at: number;
    }
  | { error: { status: number; message: string } };

export const sessionRouter = createTRPCRouter({
  init: publicProcedure
    .input(
      z.object({
        code: z.string(),
        redirectUri: z.string(),
        experienceId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const oauth = await fetch(
        `${process.env.WHOP_API_URL}/api/v3/oauth/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            grant_type: "authorization_code",
            code: input.code,
            redirect_uri: input.redirectUri,
            client_id: process.env.WHOP_CLIENT_ID,
            client_secret: process.env.WHOP_CLIENT_SECRET,
          }),
        }
      );

      const oauthData = (await oauth.json()) as OAuthRequest;
      if ("error" in oauthData) {
        console.error(oauthData);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: oauthData.error.message,
        });
      }

      const me = await fetch(`${process.env.WHOP_API_URL}/api/v2/oauth/info`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${oauthData.access_token}`,
        },
      });

      const meData = (await me.json()) as WhopOAuthResponse;
      if ("error" in meData) {
        console.error(meData);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: meData.error.message,
        });
      }

      return {
        accessToken: oauthData.access_token,
        experienceId: input.experienceId,
        userId: meData.user.id,
      };
    }),
  isCustomer: customerProcedure.query(() => {
    return true;
  }),
  isAdmin: adminProcedure.query(() => {
    return true;
  }),
});
