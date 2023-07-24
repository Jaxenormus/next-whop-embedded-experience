import { SessionBoundary } from "@/components/sessionBoundary";
import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = (props: AdminLayoutProps) => {
  return <SessionBoundary type="admin">{props.children}</SessionBoundary>;
};

export default AdminLayout;
