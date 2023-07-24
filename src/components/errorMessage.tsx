import { TRPCClientError } from "@trpc/client";

interface ErrorMessageProps {
  error: unknown;
  reset: () => void;
}

const DefaultErrorMessage = () => {
  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center space-y-6 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          An unexpected error occurred
        </h1>
        <p className="text-md text-muted-foreground">
          An unexpected error has occurred while executing your request. Please
          try again later.
        </p>
      </div>
    </div>
  );
};

export const ErrorMessage = (props: ErrorMessageProps) => {
  if (props.error instanceof TRPCClientError) {
    if (props.error.data.code !== "UNAUTHORIZED") {
      return <DefaultErrorMessage />;
    } else {
      return (
        <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              You do not have access to this resource
            </h1>
            <p className="text-md text-muted-foreground">
              You do not have access to this resource. This could be due to an
              outdated session, which can be resolved by refreshing the page.
            </p>
          </div>
        </div>
      );
    }
  } else {
    return <DefaultErrorMessage />;
  }
};
