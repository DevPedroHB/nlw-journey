import { z } from "zod";

export const createActivityValidation = z.object({
  title: z.string().min(4, "Title must be at least 4 characters long"),
  occursAt: z.coerce.date(),
});

export type CreateActivityValidation = z.infer<typeof createActivityValidation>;
