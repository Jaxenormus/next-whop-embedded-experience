import { z } from "zod";

export const baseExperienceSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(10, "Description must be at least 10 characters long")
    .max(256, "Description must be less than 256 characters"),
});

export const createExperienceSchema = baseExperienceSchema;
