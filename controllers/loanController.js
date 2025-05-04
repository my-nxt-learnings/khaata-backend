const Loan = require('../models/Loan');
const Customer = require('../models/Customer');


const createLoan = async (req, res) => {
  try {
    const { customerId, amount, dueDate } = req.body;

    const customer = await Customer.findOne({
      _id: customerId,
      user: req.user._id,
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const loan = await Loan.create({
      customer: customerId,
      user: req.user._id,
      amount,
      dueDate,
    });

    res.status(201).json({ message: 'Loan created successfully', loan });
  } catch (error) {
    res.status(500).json({ message: 'Loan creation failed', error: error.message });
  }
};

const getLoans = async (req, res) => {
  try {
    const { status } = req.query;

    const loans = await Loan.find({ user: req.user._id }).populate('customer');

    
    const filtered = status
      ? loans.filter((loan) => loan.status === status)
      : loans;

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loans', error: error.message });
  }
};

module.exports = {
  createLoan,
  getLoans,
};
