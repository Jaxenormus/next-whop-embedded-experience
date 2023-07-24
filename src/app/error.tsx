"use client";

import { ErrorMessage } from "@/components/errorMessage";

interface GlobalErrorPageProps {
  error: unknown;
  reset: () => void;
}

const GlobalErrorPage = (props: GlobalErrorPageProps) => {
  return <ErrorMessage error={props.error} reset={props.reset} />;
};

export default GlobalErrorPage;
