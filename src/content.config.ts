import { defineCollection } from "astro:content";
import { z } from "zod";

const items = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { items };