"use client";

import { ErrorMessage } from "@/components/errorMessage";
import { Loading } from "@/components/loading";
import { api } from "@/server/api";
import { AsyncBoundary } from "@suspensive/react";

interface ClientBoundaryProps {
  children: React.ReactNode;
  type: "admin" | "customer";
}

const SessionBoundaryContent = (props: ClientBoundaryProps) => {
  props.type === "admin"
    ? api.session.isAdmin.useSuspenseQuery()
    : api.session.isCustomer.useSuspenseQuery();
  return props.children;
};

export const SessionBoundary = (props: ClientBoundaryProps) => {
  return (
    <AsyncBoundary.CSROnly
      pendingFallback={<Loading />}
      rejectedFallback={({ reset, error }) => (
        <ErrorMessage error={error} reset={reset} />
      )}
      onReset={() => api.useContext().invalidate()}
      onError={(error) => console.error(error)}
    >
      <SessionBoundaryContent type={props.type}>
        {props.children}
      </SessionBoundaryContent>
    </AsyncBoundary.CSROnly>
  );
};
