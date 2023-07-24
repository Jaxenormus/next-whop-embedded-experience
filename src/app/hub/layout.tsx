"use client";

import { SessionBoundary } from "@/components/sessionBoundary";
import type { ReactNode } from "react";

interface CustomerLayoutProps {
  children: ReactNode;
}

const CustomerLayout = (props: CustomerLayoutProps) => {
  return <SessionBoundary type="customer">{props.children}</SessionBoundary>;
};

export default CustomerLayout;
