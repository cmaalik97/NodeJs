import Transaction from '../Model/Transaction.js';

// POST /transactions
export const createTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
};


// GET /transactions
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({
      createdBy: req.user._id
    }).sort({ date: -1 });

    res.json(transactions);
  } catch (err) {
    next(err);
  }
};


// GET /transactions/monthly-summary
export const getMonthlySummary = async (req, res, next) => {
  try {
    const summary = await Transaction.aggregate([
      {
        $match: {
          createdBy: req.user._id
        }
      },

      {
        $group: {
          _id: {
            type: '$type',
            category: '$category'
          },
          total: {
            $sum: '$amount'
          }
        }
      },

      {
        $sort: {
          '_id.type': 1,
          total: -1
        }
      }
    ]);

    res.json(summary);
  } catch (err) {
    next(err);
  }
};


// PUT /transactions/:id
export const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user._id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found'
      });
    }

    res.json(transaction);
  } catch (err) {
    next(err);
  }
};


// DELETE /transactions/:id
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found'
      });
    }

    res.json({
      message: 'Transaction deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};