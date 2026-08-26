import express from 'express';

import {
  createTransaction,
  getTransactions,
  getMonthlySummary,
  updateTransaction,
  deleteTransaction
} from '../Controllers/transactionController.js';

import { protect } from '../Middleware/protect.js';

import { validate } from '../Middleware/validateZod.js';

import { transactionValidationSchema } from '../Schema/transactionSchema.js';

const router = express.Router();


// 🔐 All transaction routes require authentication
router.use(protect);


/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management
 */


/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - amount
 *               - category
 *             properties:
 *               type:
 *                 type: string
 *                 enum:
 *                   - income
 *                   - expense
 *                 example: expense
 *               amount:
 *                 type: number
 *                 example: 50
 *               category:
 *                 type: string
 *                 example: Food
 *               description:
 *                 type: string
 *                 example: Lunch
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-08-26
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/',
  validate(transactionValidationSchema),
  createTransaction
);


/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions for the logged-in user
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/',
  getTransactions
);


/**
 * @swagger
 * /transactions/monthly-summary:
 *   get:
 *     summary: Get transaction summary by category
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total income and expenses grouped by category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: expense
 *                       category:
 *                         type: string
 *                         example: Food
 *                   total:
 *                     type: number
 *                     example: 150
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/monthly-summary',
  getMonthlySummary
);


/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update a transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: string
 *           example: 66c123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum:
 *                   - income
 *                   - expense
 *                 example: expense
 *               amount:
 *                 type: number
 *                 example: 75
 *               category:
 *                 type: string
 *                 example: Transport
 *               description:
 *                 type: string
 *                 example: Taxi
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-08-26
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 */
router.put(
  '/:id',
  validate(transactionValidationSchema),
  updateTransaction
);


/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: string
 *           example: 66c123456789abcdef123456
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 */
router.delete(
  '/:id',
  deleteTransaction
);


/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 66c123456789abcdef123456
 *         type:
 *           type: string
 *           enum:
 *             - income
 *             - expense
 *           example: expense
 *         amount:
 *           type: number
 *           example: 50
 *         category:
 *           type: string
 *           example: Food
 *         description:
 *           type: string
 *           example: Lunch
 *         date:
 *           type: string
 *           format: date-time
 *           example: 2026-08-26T10:00:00.000Z
 *         createdBy:
 *           type: string
 *           example: 66c987654321abcdef654321
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */


export default router;