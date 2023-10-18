import { z, defineCollection } from 'astro:content';

const blog = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),

    categories: z.array(z.string()).optional(),

    // Image to show in blog list and intro image in blog post
    coverImage: image().optional(),
    coverAlt: z.string().optional(),
    socialImage: image().optional(), // If not provided, will use coverImage or default
  }),
})

export const collections = { blog }

