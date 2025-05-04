const mongoose = require('mongoose');
const moment = require('moment');

const loanSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  user: { // Redundant but helps with quick queries
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: [true, 'Loan amount is required'],
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required'],
  },
  repayments: [
    {
      amount: Number,
      date: {
        type: Date,
        default: Date.now,
      },
    }
  ],
}, { timestamps: true });

// Virtual property: status
loanSchema.virtual('status').get(function () {
  const totalRepaid = this.repayments.reduce((sum, r) => sum + r.amount, 0);
  if (totalRepaid >= this.amount) return 'paid';
  if (moment().isAfter(this.dueDate)) return 'overdue';
  return 'pending';
});

loanSchema.set('toJSON', { virtuals: true });
loanSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Loan', loanSchema);
