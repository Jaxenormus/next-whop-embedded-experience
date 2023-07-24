import { createWhopInstance } from "@/utils/createWhopInstance";
import { initTRPC, TRPCError } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { AxiosInstance } from "axios";

import superjson from "superjson";
import { ZodError } from "zod";

export type WhopSession = {
  userId: string;
  accessToken: string;
  experienceId: string;
};

interface CreateContextOptions {
  session: WhopSession | null;
  whopApi: AxiosInstance | null;
}

export type WhopOAuthResponse =
  | {
      user: {
        id: string;
        username: string;
        email: string;
        profile_pic_url: string;
        social_accounts: {
          service: string;
          username: string;
          id: string;
        }[];
        authorized_user: {
          role: "owner" | "admin" | "moderator";
        };
      };
      experiences: [{ id: string }];
    }
  | { error: { status: number; message: string } };

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return { session: opts.session, whopApi: opts.whopApi };
};

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  let session = null;
  const cookies = opts.req.cookies;

  const experienceId = cookies["whop_eid"];
  const accessToken = cookies["whop_at"];
  const userId = cookies["whop_uid"];

  if (experienceId && accessToken && userId) {
    session = {
      experienceId,
      accessToken,
      userId,
    };
  }

  return createInnerTRPCContext({
    session,
    whopApi: session ? createWhopInstance(session) : null,
  });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

const enforceIsExperienceCustomer = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.accessToken || !ctx.session?.experienceId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const res = await fetch(`${process.env.WHOP_API_URL}/api/v2/oauth/info`, {
    headers: {
      Authorization: `Bearer ${ctx.session.accessToken}`,
    },
  });

  const data = (await res.json()) as WhopOAuthResponse;

  if ("error" in data) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "An error occurred while checking if you are a customer.",
    });
  }

  const isCustomer = data.experiences.some(
    (experience) => experience.id === ctx.session?.experienceId
  );

  if (isCustomer) {
    return next({
      ctx: {
        session: { ...ctx.session },
        whopApi: ctx.whopApi as AxiosInstance,
      },
    });
  }

  throw new TRPCError({ code: "UNAUTHORIZED" });
});

const enforceIsExperienceAdmin = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.accessToken) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const res = await fetch(`${process.env.WHOP_API_URL}/api/v2/oauth/info`, {
    headers: { Authorization: `Bearer ${ctx.session.accessToken}` },
  });

  const data = (await res.json()) as WhopOAuthResponse;

  if ("error" in data) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "An error occurred while checking if you are an admin.",
    });
  }

  const isAdmin = ["owner", "admin", "moderator"].includes(
    data.user.authorized_user.role
  );

  if (isAdmin) {
    return next({
      ctx: {
        session: { ...ctx.session },
        whopApi: ctx.whopApi as AxiosInstance,
      },
    });
  }

  throw new TRPCError({ code: "UNAUTHORIZED" });
});

export const publicProcedure = t.procedure;
export const adminProcedure = t.procedure.use(enforceIsExperienceAdmin);
export const customerProcedure = t.procedure.use(enforceIsExperienceCustomer);
