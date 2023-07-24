"use client";

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import type { InputProps, TextAreaProps } from "@whop/frosted-ui";
import { TextArea } from "@whop/frosted-ui";
import type { Control, FieldValues, Path } from "react-hook-form";

type FormTextAreaProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & InputProps;

export const FormTextArea = <T extends Record<string, unknown>>({
  control,
  name,
  ...props
}: FormTextAreaProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => (
        <FormItem>
          <FormControl>
            <TextArea
              {...(props as TextAreaProps)}
              {...(field as React.RefAttributes<HTMLTextAreaElement>)}
              errorMessage={
                fieldState.error ? fieldState.error.message : undefined
              }
              isDisabled={formState.isSubmitting ?? props.isDisabled}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
