import { z } from 'zod';

export const transactionValidationSchema = z.object({
  type: z.enum(['income', 'expense']),

  amount: z.number().positive('Amount must be greater than 0'),

  category: z.string().min(1, 'Category is required'),

  description: z.string().optional(),

  date: z.string().optional()
});