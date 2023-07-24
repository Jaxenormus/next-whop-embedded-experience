"use client";

import { ErrorMessage } from "@/components/errorMessage";
import { Loading } from "@/components/loading";
import { api } from "@/server/api";
import { AsyncBoundary } from "@suspensive/react";
import type { ReactNode } from "react";

interface ComponentSuspenseProps {
  children: ReactNode;
}

export const ComponentSuspense = (props: ComponentSuspenseProps) => {
  return (
    <AsyncBoundary.CSROnly
      pendingFallback={<Loading />}
      rejectedFallback={({ reset, error }) => (
        <ErrorMessage error={error} reset={reset} />
      )}
      onReset={() => api.useContext().invalidate()}
      onError={(error) => console.error(error)}
    >
      {props.children}
    </AsyncBoundary.CSROnly>
  );
};
