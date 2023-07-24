import type { WhopSession } from "@/server/trpc";
import axios from "axios";

export const createWhopInstance = (session: WhopSession) => {
  return axios.create({
    baseURL: `${process.env.WHOP_API_URL}/api`,
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
};
