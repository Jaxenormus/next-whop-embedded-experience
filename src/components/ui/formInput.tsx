"use client";

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import type { InputProps } from "@whop/frosted-ui";
import { Input } from "@whop/frosted-ui";
import type { Control, FieldValues, Path } from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & InputProps;

export const FormInput = <T extends Record<string, unknown>>({
  control,
  name,
  ...props
}: FormInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => (
        <FormItem>
          <FormControl>
            <Input
              {...(props as InputProps)}
              {...(field as React.RefAttributes<HTMLInputElement>)}
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
