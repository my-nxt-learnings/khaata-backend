const Loan = require('../models/Loan');

// Record a repayment
const recordRepayment = async (req, res) => {
  try {
    const { id: loanId } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Enter a valid repayment amount' });
    }

    const loan = await Loan.findOne({ _id: loanId, user: req.user._id });

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found or unauthorized' });
    }

    // Optional: Prevent overpayment
    const totalPaid = loan.repayments.reduce((sum, r) => sum + r.amount, 0);
    const remaining = loan.amount - totalPaid;

    if (amount > remaining) {
      return res.status(400).json({ message: `Repayment exceeds remaining amount. Remaining: ₹${remaining}` });
    }

    loan.repayments.push({ amount });
    await loan.save();

    res.status(200).json({ message: 'Repayment recorded', loan });
  } catch (error) {
    res.status(500).json({ message: 'Repayment failed', error: error.message });
  }
};

module.exports = { recordRepayment };
