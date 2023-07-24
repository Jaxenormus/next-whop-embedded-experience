"use client";

import { Form } from "@/components/ui/form";
import { baseExperienceSchema } from "@/server/schemas";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/ui/formInput";
import { Button, toast } from "@whop/frosted-ui";
import { FormTextArea } from "@/components/ui/formTextArea";
import { api } from "@/server/api";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/navigation";

export const CreateExperienceForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof baseExperienceSchema>>({
    resolver: zodResolver(baseExperienceSchema),
  });
  const createExperience = api.admin.createExperience.useMutation();
  return (
    <Form {...form}>
      <form
        className="space-y-5"
        onSubmit={form.handleSubmit(async (values) => {
          try {
            await createExperience.mutateAsync(values);
            toast.success('Experience "created"');
            router.push("/admin");
          } catch (e) {
            if (e instanceof TRPCClientError) {
              toast.error(e.message);
            } else {
              toast.error("An unknown error occurred");
            }
          }
        })}
      >
        <FormInput
          control={form.control}
          name="name"
          size="md"
          label={{ children: "Name" }}
          placeholder="Bungee Jumping"
        />
        <FormTextArea
          control={form.control}
          name="description"
          size="md"
          label={{ children: "Description" }}
          placeholder="Jump off a bridge with a rope tied to your feet ofc :)"
        />
        <Button
          type="submit"
          colorScheme="brand"
          size="sm"
          variant="primary"
          isLoading={form.formState.isSubmitting}
          isDisabled={form.formState.isSubmitting}
        >
          Create
        </Button>
      </form>
    </Form>
  );
};
