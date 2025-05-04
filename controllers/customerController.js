const Customer = require('../models/Customer');

// @desc Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, phone, trustScore } = req.body;

    const customer = new Customer({
      user: req.user._id,
      name,
      phone,
      trustScore,
    });

    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ message: 'Error creating customer', error: err.message });
  }
};

// @desc Get all customers of logged-in user
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ user: req.user._id });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching customers', error: err.message });
  }
};

// @desc Get single customer
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id, user: req.user._id });

    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching customer', error: err.message });
  }
};

// @desc Update a customer
exports.updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Customer not found' });

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating customer', error: err.message });
  }
};

// @desc Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!deleted) return res.status(404).json({ message: 'Customer not found' });

    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting customer', error: err.message });
  }
};
