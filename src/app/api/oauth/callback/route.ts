import { sessionRouter } from "@/server/routers/session";
import { TRPCClientError } from "@trpc/client";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const sessionRouterCaller = sessionRouter.createCaller({
    session: null,
    whopApi: null,
  });

  const code = req.nextUrl.searchParams.get("code");
  const redirectUri = req.nextUrl.searchParams.get("redirectUri");
  const experienceId = req.nextUrl.searchParams.get("experienceId");

  if (!code || !experienceId || !redirectUri) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const data = await sessionRouterCaller.init({
      code,
      redirectUri,
      experienceId,
    });

    const url = new URL(redirectUri);
    const res = NextResponse.redirect(url);

    const cookieOptions: Partial<ResponseCookie> = {
      secure: true,
      sameSite: "none",
      httpOnly: true,
    };

    res.cookies.set("whop_uid", data.userId, cookieOptions);
    res.cookies.set("whop_eid", data.experienceId, cookieOptions);
    res.cookies.set("whop_at", data.accessToken, cookieOptions);

    return res;
  } catch (e) {
    if (e instanceof TRPCClientError || e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: "An unexpected error has occurred" },
        { status: 500 }
      );
    }
  }
};
